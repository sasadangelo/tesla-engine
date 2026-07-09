/**
 * Physical Quantities Simulation — Velocity Measurement
 *
 * Models a car driving a known distance in a known time.
 * Two instruments (ruler + stopwatch) with configurable resolutions
 * read the quantities, producing absolute and relative errors.
 */

export class VelocityMeasurementSimulation {
    /**
     * @param {HTMLCanvasElement} canvas
     * @param {object} opts
     * @param {number} opts.trueDistance   metres
     * @param {number} opts.trueTime       seconds
     * @param {number} opts.rulerRes       ruler resolution in metres
     * @param {number} opts.stopwatchRes   stopwatch resolution in seconds
     */
    constructor(canvas, opts) {
        this.canvas  = canvas;
        this.ctx     = canvas.getContext('2d');

        this.trueDistance   = opts.trueDistance;
        this.trueTime       = opts.trueTime;
        this.rulerRes       = opts.rulerRes;
        this.stopwatchRes   = opts.stopwatchRes;

        // Animation state
        this.animationId  = null;
        this.startWallTime = null;   // performance.now() at animation start
        this.phase        = 'idle';  // 'idle' | 'running' | 'done'

        // Results (filled once 'done')
        this.results = null;

        // Canvas dimensions
        this.canvas.width  = 900;
        this.canvas.height = 320;

        this.drawScene(0);
    }

    // ── Public API ─────────────────────────────────────────────────────────

    start() {
        if (this.phase === 'running') return;
        this.phase        = 'running';
        this.startWallTime = performance.now();
        this.results      = null;
        this._animate();
    }

    reset() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.phase   = 'idle';
        this.results = null;
        this.drawScene(0);
    }

    // ── Measurement maths ──────────────────────────────────────────────────

    /**
     * Round a true value to the nearest instrument resolution,
     * then compute the absolute error (half resolution).
     */
    _readInstrument(trueValue, resolution) {
        const reading  = Math.round(trueValue / resolution) * resolution;
        const absError = resolution / 2;
        return { reading, absError };
    }

    _computeResults() {
        const dist = this._readInstrument(this.trueDistance, this.rulerRes);
        const time = this._readInstrument(this.trueTime,     this.stopwatchRes);

        const v         = dist.reading / time.reading;
        const relErrDist = dist.absError / dist.reading;
        const relErrTime = time.absError / time.reading;
        const relErrV    = relErrDist + relErrTime;
        const absErrV    = relErrV * v;
        const trueV      = this.trueDistance / this.trueTime;

        return {
            measuredDist : dist.reading,
            absDist      : dist.absError,
            measuredTime : time.reading,
            absTime      : time.absError,
            velocity     : v,
            absErrV,
            relErrV,
            trueV
        };
    }

    // ── Animation loop ────────────────────────────────────────────────────

    _animate() {
        const elapsed    = (performance.now() - this.startWallTime) / 1000; // seconds of wall time
        // Map wall-time to physics time: animate over 3 seconds of wall time
        const ANIM_SECS  = 3.0;
        const progress   = Math.min(elapsed / ANIM_SECS, 1.0); // 0 → 1

        this.drawScene(progress);

        if (progress < 1.0) {
            this.animationId = requestAnimationFrame(() => this._animate());
        } else {
            this.phase   = 'done';
            this.results = this._computeResults();
            this.drawScene(1.0);
            if (this.onDone) this.onDone(this.results);
        }
    }

    // ── Drawing ───────────────────────────────────────────────────────────

    drawScene(progress) {
        const ctx    = this.ctx;
        const W      = this.canvas.width;
        const H      = this.canvas.height;
        const MARGIN = 60;  // pixels for start/finish labels
        const TRACK_Y = 160;
        const TRACK_H = 60;

        ctx.clearRect(0, 0, W, H);

        // Sky gradient background
        const sky = ctx.createLinearGradient(0, 0, 0, H);
        sky.addColorStop(0, '#dbeafe');
        sky.addColorStop(1, '#eff6ff');
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, W, H);

        // Ground
        ctx.fillStyle = '#6b7280';
        ctx.fillRect(0, TRACK_Y + TRACK_H, W, H - TRACK_Y - TRACK_H);

        // Road surface
        ctx.fillStyle = '#374151';
        ctx.fillRect(MARGIN, TRACK_Y, W - MARGIN * 2, TRACK_H);

        // Dashed centre line
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth   = 2;
        ctx.setLineDash([20, 15]);
        ctx.beginPath();
        ctx.moveTo(MARGIN, TRACK_Y + TRACK_H / 2);
        ctx.lineTo(W - MARGIN, TRACK_Y + TRACK_H / 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Start line
        this._drawCheckeredPost(ctx, MARGIN, TRACK_Y, TRACK_H, '#22c55e', 'START');

        // Finish line
        this._drawCheckeredPost(ctx, W - MARGIN, TRACK_Y, TRACK_H, '#ef4444', 'FINISH');

        // Distance arrow + label
        this._drawDistanceArrow(ctx, MARGIN, W - MARGIN, TRACK_Y - 28);

        // Car position
        const carX = MARGIN + progress * (W - MARGIN * 2);
        this._drawCar(ctx, carX, TRACK_Y + TRACK_H / 2 - 14);

        // Instruments overlay (bottom strip)
        this._drawInstruments(ctx, W, H, progress);

        // Time counter (top right)
        const shownTime = progress * this.trueTime;
        ctx.fillStyle = '#1e3a5f';
        ctx.font = 'bold 15px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`t = ${shownTime.toFixed(2)} s`, W - 12, 24);
        ctx.textAlign = 'left';
    }

    _drawCheckeredPost(ctx, x, trackY, trackH, color, label) {
        ctx.strokeStyle = color;
        ctx.lineWidth   = 4;
        ctx.beginPath();
        ctx.moveTo(x, trackY - 10);
        ctx.lineTo(x, trackY + trackH + 10);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.font      = 'bold 13px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(label, x, trackY - 16);
        ctx.textAlign = 'left';
    }

    _drawDistanceArrow(ctx, x1, x2, y) {
        const MID = (x1 + x2) / 2;
        ctx.strokeStyle = '#1e40af';
        ctx.lineWidth   = 1.5;
        // Line
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();
        // Left arrowhead
        ctx.beginPath();
        ctx.moveTo(x1, y); ctx.lineTo(x1 + 8, y - 4); ctx.moveTo(x1, y); ctx.lineTo(x1 + 8, y + 4);
        ctx.stroke();
        // Right arrowhead
        ctx.beginPath();
        ctx.moveTo(x2, y); ctx.lineTo(x2 - 8, y - 4); ctx.moveTo(x2, y); ctx.lineTo(x2 - 8, y + 4);
        ctx.stroke();
        // Label
        ctx.fillStyle  = '#1e40af';
        ctx.font       = '13px Arial';
        ctx.textAlign  = 'center';
        ctx.fillText(`Δx = ${this.trueDistance} m  (true)`, MID, y - 6);
        ctx.textAlign  = 'left';
    }

    _drawCar(ctx, x, y) {
        // Body
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.roundRect(x - 28, y, 56, 26, 6);
        ctx.fill();
        // Cabin
        ctx.fillStyle = '#fca5a5';
        ctx.beginPath();
        ctx.roundRect(x - 14, y - 14, 30, 16, 4);
        ctx.fill();
        // Wheels
        ctx.fillStyle = '#1f2937';
        for (const wx of [x - 18, x + 14]) {
            ctx.beginPath();
            ctx.arc(wx, y + 24, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#9ca3af';
            ctx.beginPath();
            ctx.arc(wx, y + 24, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#1f2937';
        }
    }

    _drawInstruments(ctx, W, H, progress) {
        const panelY = H - 80;
        const panelH = 72;

        // Background
        ctx.fillStyle = 'rgba(17,24,39,0.88)';
        ctx.beginPath();
        ctx.roundRect(8, panelY, W - 16, panelH, 8);
        ctx.fill();

        // Ruler reading
        const shownDist = progress * this.trueDistance;
        const rulerRead = (this.phase === 'done')
            ? this.results.measuredDist
            : Math.round(shownDist / this.rulerRes) * this.rulerRes;
        const halfRuler = this.rulerRes / 2;

        // Stopwatch reading
        const shownTime = progress * this.trueTime;
        const swRead = (this.phase === 'done')
            ? this.results.measuredTime
            : Math.round(shownTime / this.stopwatchRes) * this.stopwatchRes;
        const halfSW = this.stopwatchRes / 2;

        ctx.fillStyle  = '#f9fafb';
        ctx.font       = 'bold 13px monospace';
        ctx.fillText('📏 Ruler', 20, panelY + 22);
        ctx.font       = '13px monospace';
        ctx.fillStyle  = '#86efac';
        ctx.fillText(`${rulerRead.toFixed(this._decimals(this.rulerRes))} ± ${halfRuler.toFixed(this._decimals(this.rulerRes))} m`, 20, panelY + 44);

        ctx.fillStyle  = '#f9fafb';
        ctx.font       = 'bold 13px monospace';
        ctx.fillText('⏱️ Stopwatch', 220, panelY + 22);
        ctx.font       = '13px monospace';
        ctx.fillStyle  = '#86efac';
        ctx.fillText(`${swRead.toFixed(this._decimals(this.stopwatchRes))} ± ${halfSW.toFixed(this._decimals(this.stopwatchRes))} s`, 220, panelY + 44);

        if (this.phase === 'done' && this.results) {
            const r = this.results;
            const v   = r.velocity.toFixed(3);
            const dv  = r.absErrV.toFixed(3);
            const er  = (r.relErrV * 100).toFixed(2);

            ctx.fillStyle = '#f9fafb';
            ctx.font      = 'bold 13px monospace';
            ctx.fillText('🚗 Velocity', 460, panelY + 22);
            ctx.font      = '13px monospace';
            ctx.fillStyle = '#fde68a';
            ctx.fillText(`(${v} ± ${dv}) m/s   εᵣ = ${er}%`, 460, panelY + 44);

            // True velocity vs measured
            ctx.fillStyle = '#f9fafb';
            ctx.font      = '11px monospace';
            ctx.fillText(`True v = ${r.trueV.toFixed(3)} m/s`, W - 200, panelY + 30);

            // Error bar visualisation
            this._drawErrorBar(ctx, r, W);
        }
    }

    _drawErrorBar(ctx, r, W) {
        const barY   = 50;
        const barW   = 180;
        const barX   = W - barW - 20;
        const scale  = barW / (r.trueV * 2);  // centre the bar around trueV

        const centreX = barX + barW / 2;
        const measX   = centreX + (r.velocity - r.trueV) * scale;
        const errPx   = r.absErrV * scale;

        // Background
        ctx.fillStyle = 'rgba(17,24,39,0.80)';
        ctx.beginPath();
        ctx.roundRect(barX - 8, barY - 20, barW + 16, 44, 6);
        ctx.fill();

        // Label
        ctx.fillStyle = '#9ca3af';
        ctx.font      = '11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('velocity error bar', centreX, barY - 8);

        // Axis line
        ctx.strokeStyle = '#4b5563';
        ctx.lineWidth   = 1;
        ctx.beginPath();
        ctx.moveTo(barX, barY + 4);
        ctx.lineTo(barX + barW, barY + 4);
        ctx.stroke();

        // True value mark
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth   = 2;
        ctx.beginPath();
        ctx.moveTo(centreX, barY - 4);
        ctx.lineTo(centreX, barY + 12);
        ctx.stroke();

        // Error interval
        const lo = Math.max(barX, measX - errPx);
        const hi = Math.min(barX + barW, measX + errPx);
        ctx.fillStyle = 'rgba(251,191,36,0.35)';
        ctx.fillRect(lo, barY - 2, hi - lo, 12);

        // Measured value mark
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth   = 2;
        ctx.beginPath();
        ctx.moveTo(measX, barY - 6);
        ctx.lineTo(measX, barY + 14);
        ctx.stroke();

        ctx.textAlign = 'left';
    }

    /** Returns number of decimal places needed for a given resolution. */
    _decimals(res) {
        if (res >= 1)    return 0;
        if (res >= 0.1)  return 1;
        return 2;
    }
}
