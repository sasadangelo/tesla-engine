/**
 * Galilean Relativity Simulation — v3
 *
 * LEFT panel S′ (Train Frame):
 *   Camera rides with the train. Wagon always centred.
 *   Seated passenger (BLUE) on the LEFT of the wagon.
 *   Ball drops vertically in front of him — straight blue line.
 *
 * RIGHT panel S (Ground Frame):
 *   Camera fixed to ground. Wagon slides left → right.
 *   Transparent near wall so the interior is visible.
 *   BLUE seated figure inside the wagon: his view = straight drop (blue dotted).
 *   GREEN standing observer outside: his view = parabola (red trail).
 *   Color coding: blue figure → blue trail, green figure → red/parabola trail.
 */

const G         = 9.81;  // m/s²
const PANEL_GAP = 6;     // px between panels

const CAR_W_M    = 7;      // wagon interior width  (metres)
const CAR_H_M    = 3.2;    // wagon interior height (metres) — shorter wagon
const DROP_H_M   = 2.2;    // ball release height above floor (metres)
const BALL_R     = 7;      // ball radius (px)
const PASS_OFF_M = CAR_W_M * 0.14;  // passenger hip x offset from left wall (metres)
const BALL_OFF_M = CAR_W_M * 0.36;  // ball drop x offset from left wall — in FRONT of passenger
const V_MAX      = 20;     // max slider velocity (m/s) — used to size right panel

// Color palette — one color per observer
const C_PASS = '#2563eb';   // blue  — passenger (train frame) + ball
const C_OBS  = '#059669';   // green — ground observer + his trajectory
const C_PARA = C_OBS;       // ground observer sees the trajectory in his own color

export class GalileanRelativitySimulation {
    constructor(canvas) {
        this.canvas  = canvas;
        this.ctx     = canvas.getContext('2d');
        this.V       = 10;
        this.time    = 0;
        this.running = false;
        this.done    = false;
        this.animId  = null;
        this.lastTs  = null;
        this._draw();
    }

    // ── public API ─────────────────────────────────────────────────────────────

    setVelocity(v) {
        this.V = v;
        if (!this.running) this._draw();
    }

    start() {
        if (this.animId) cancelAnimationFrame(this.animId);
        this.time    = 0;
        this.lastTs  = null;
        this.done    = false;
        this.running = true;
        this.animId  = requestAnimationFrame(ts => this._tick(ts));
    }

    reset() {
        if (this.animId) cancelAnimationFrame(this.animId);
        this.animId  = null;
        this.time    = 0;
        this.lastTs  = null;
        this.done    = false;
        this.running = false;
        this._draw();
    }

    getStats() {
        return {
            time:    this.time,
            yPrime:  Math.max(0, DROP_H_M - 0.5 * G * this.time ** 2),
            xGround: this.V * this.time,
        };
    }

    // ── animation loop ─────────────────────────────────────────────────────────

    _tick(ts) {
        if (!this.lastTs) this.lastTs = ts;
        const dt = Math.min((ts - this.lastTs) / 1000, 0.033);
        this.lastTs = ts;
        this.time += dt;
        const fallTime = Math.sqrt(2 * DROP_H_M / G);
        if (this.time >= fallTime) { this.time = fallTime; this.done = true; }
        this._draw();
        if (!this.done) {
            this.animId = requestAnimationFrame(ts => this._tick(ts));
        } else {
            this.running = false;
        }
    }

    // ── master draw ────────────────────────────────────────────────────────────

    _draw() {
        const { canvas, ctx } = this;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const ph  = canvas.height;
        const pwL  = Math.floor(canvas.width * 0.30);  // 30% left, 70% right
        const pwR  = canvas.width - pwL - PANEL_GAP;
        this._drawPanelPrime(0,                pwL, ph);
        this._drawPanelGround(pwL + PANEL_GAP, pwR, ph);
        ctx.fillStyle = '#d1d5db';
        ctx.fillRect(pwL, 0, PANEL_GAP, ph);
    }

    // ── wagon metrics ──────────────────────────────────────────────────────────
    // Single shared scale — wagon is identical in both panels.

    _wagonMetrics(pw, ph) {
        const { canvas } = this;
        const pwL     = Math.floor(canvas.width * 0.30);  // same split as _draw
        const scale   = (pwL * 0.72) / CAR_W_M;
        const carPxW  = CAR_W_M * scale;
        const carPxH  = CAR_H_M * scale;
        const groundY = ph - 52;
        return { scale, carPxW, carPxH, groundY };
    }

    // ── LEFT panel: S′ ────────────────────────────────────────────────────────

    _drawPanelPrime(ox, pw, ph) {
        const ctx = this.ctx;
        const { scale, carPxW, carPxH, groundY } = this._wagonMetrics(pw, ph);

        // Background
        ctx.fillStyle = '#eef4ff';
        ctx.fillRect(ox, 0, pw, ph);
        this._drawGround(ox, pw, groundY);

        // Wagon centred (camera fixed to train)
        const carX  = ox + (pw - carPxW) / 2;
        const carY  = groundY - carPxH;
        this._drawWagon(carX, carY, carPxW, carPxH, groundY, false);

        // Passenger sits near the LEFT wall
        const seatX = carX + PASS_OFF_M * scale;
        this._drawSeatedFigure(seatX, groundY, scale, C_PASS);

        // Ball falls in FRONT of the passenger (further right inside wagon)
        const ballX  = carX + BALL_OFF_M * scale;
        const ballY  = Math.max(0, DROP_H_M - 0.5 * G * this.time ** 2);
        const ballPx = groundY - ballY * scale;

        // Blue vertical trail — drops at ballX, NOT above the passenger's head
        if (this.time > 0) {
            ctx.strokeStyle = C_PASS;
            ctx.lineWidth   = 2.5;
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.moveTo(ballX, groundY - DROP_H_M * scale);
            ctx.lineTo(ballX, ballPx);
            ctx.stroke();
        }

        // Ball (blue)
        this._drawBall(ballX, ballPx, C_PASS);

        // Equations at top
        this._panelLabel(ox, "S′ — Train Frame", C_PASS);
        this._drawLegend(ox, pw, ph, [
            { color: C_PASS, text: '● Passenger — sees straight vertical drop' },
        ]);
        this._drawEquationsPrime(ox, pw, ph);
    }

    // ── RIGHT panel: S ────────────────────────────────────────────────────────

    _drawPanelGround(ox, pw, ph) {
        const ctx = this.ctx;
        const { scale, carPxW, carPxH, groundY } = this._wagonMetrics(pw, ph);

        // Background
        ctx.fillStyle = '#fff8ee';
        ctx.fillRect(ox, 0, pw, ph);
        this._drawGround(ox, pw, groundY);

        // Green observer stands at LEFT edge of panel — FIXED, the train passes him
        const obsX = ox + 36;
        this._drawStandingFigure(obsX, groundY, C_OBS);

        const fallTime    = Math.sqrt(2 * DROP_H_M / G);
        const passPx      = PASS_OFF_M * scale;
        const ballOffPx   = BALL_OFF_M * scale;

        // trainStartX: just past the observer (fixed left margin).
        // The right panel is wide enough (canvas 1500 px, pwR≈960 px) that at V_MAX=18
        // the wagon end = trainStartX + V_MAX*fallTime*scale + carPxW stays inside pwR.
        const trainStartX = ox + 60;
        const carX        = trainStartX + this.V * this.time * scale;
        const carY        = groundY - carPxH;

        // ── Clip everything to this panel so fast trains never bleed into left panel ──
        ctx.save();
        ctx.beginPath();
        ctx.rect(ox, 0, pw, ph);
        ctx.clip();

        // ── BLUE vertical dashed line: plumb-line as seen by passenger (S′)
        if (this.time > 0) {
            const ballNowX = carX + ballOffPx;
            const topY     = groundY - DROP_H_M * scale;
            const nowY     = groundY - Math.max(0, DROP_H_M - 0.5 * G * this.time ** 2) * scale;
            ctx.strokeStyle = C_PASS;
            ctx.lineWidth   = 2;
            ctx.setLineDash([5, 4]);
            ctx.beginPath();
            ctx.moveTo(ballNowX, topY);
            ctx.lineTo(ballNowX, nowY);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // ── GREEN parabola: what the ground observer sees
        if (this.time > 0) {
            ctx.strokeStyle = C_PARA;
            ctx.lineWidth   = 2.5;
            ctx.setLineDash([]);
            ctx.beginPath();
            const steps = 60;
            for (let i = 0; i <= steps; i++) {
                const t  = (i / steps) * this.time;
                const bx = trainStartX + this.V * t * scale + ballOffPx;
                const by = groundY - Math.max(0, DROP_H_M - 0.5 * G * t ** 2) * scale;
                if (i === 0) ctx.moveTo(bx, by); else ctx.lineTo(bx, by);
            }
            ctx.stroke();
        }

        // Draw transparent wagon on top of trails
        this._drawWagon(carX, carY, carPxW, carPxH, groundY, true);

        // Blue seated figure inside wagon
        this._drawSeatedFigure(carX + passPx, groundY, scale, C_PASS);

        // Ball (blue)
        const ballY   = Math.max(0, DROP_H_M - 0.5 * G * this.time ** 2);
        const ballPxX = carX + ballOffPx;
        const ballPxY = groundY - ballY * scale;
        this._drawBall(ballPxX, ballPxY, C_PASS);

        ctx.restore(); // end clip

        // Velocity arrow and labels are drawn OUTSIDE the clip (always visible)
        this._drawVelocityArrow(ox + pw / 2, carY - 20, ox + pw / 2);
        this._panelLabel(ox, "S — Ground Frame", C_OBS);
        this._drawLegend(ox, pw, ph, [
            { color: C_PASS, text: '-- Passenger\'s path (S′ view, dashed)' },
            { color: C_OBS,  text: '── Ground observer\'s view: parabola' },
        ]);
        this._drawEquationsGround(ox, pw, ph);
    }

    // ── primitives ─────────────────────────────────────────────────────────────

    _drawGround(ox, pw, groundY) {
        const ctx = this.ctx;
        ctx.fillStyle = '#d1fae5';
        ctx.fillRect(ox, groundY, pw, 14);
        ctx.strokeStyle = '#6b7280';
        ctx.lineWidth   = 2;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(ox + 2, groundY);
        ctx.lineTo(ox + pw - 2, groundY);
        ctx.stroke();
        ctx.strokeStyle = '#9ca3af';
        ctx.lineWidth   = 2.5;
        for (let x = ox + 12; x < ox + pw - 8; x += 18) {
            ctx.beginPath();
            ctx.moveTo(x, groundY + 2);
            ctx.lineTo(x, groundY + 10);
            ctx.stroke();
        }
    }

    _drawWagon(carX, carY, carPxW, carPxH, groundY, transparent) {
        const ctx    = this.ctx;
        const wheelR = 11;

        // Body fill
        ctx.fillStyle = transparent ? 'rgba(253,230,138,0.18)' : 'rgba(253,230,138,0.88)';
        ctx.fillRect(carX, carY, carPxW, carPxH);

        // Roof
        ctx.fillStyle = '#92400e';
        ctx.fillRect(carX - 3, carY - 7, carPxW + 6, 9);

        // Left (back) wall — always solid
        ctx.fillStyle   = '#78350f';
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth   = 3;
        ctx.setLineDash([]);
        ctx.fillRect(carX, carY, 3, carPxH);

        // Right (near) wall — dashed when transparent
        if (transparent) {
            ctx.strokeStyle = 'rgba(120,53,15,0.3)';
            ctx.lineWidth   = 2;
            ctx.setLineDash([6, 5]);
        } else {
            ctx.strokeStyle = '#78350f';
            ctx.lineWidth   = 3;
            ctx.setLineDash([]);
        }
        ctx.beginPath();
        ctx.moveTo(carX + carPxW, carY);
        ctx.lineTo(carX + carPxW, carY + carPxH);
        ctx.stroke();
        ctx.setLineDash([]);

        // Floor
        ctx.strokeStyle = '#92400e';
        ctx.lineWidth   = 3;
        ctx.beginPath();
        ctx.moveTo(carX, carY + carPxH);
        ctx.lineTo(carX + carPxW, carY + carPxH);
        ctx.stroke();

        // Window
        const wW = carPxW * 0.20, wH = carPxH * 0.35;
        const wX = carX + carPxW * 0.68, wY = carY + carPxH * 0.10;
        ctx.fillStyle   = transparent ? 'rgba(147,197,253,0.3)' : '#bfdbfe';
        ctx.strokeStyle = '#93c5fd';
        ctx.lineWidth   = 1.5;
        ctx.fillRect(wX, wY, wW, wH);
        ctx.strokeRect(wX, wY, wW, wH);

        // Wheels
        ctx.fillStyle   = '#374151';
        ctx.strokeStyle = '#111827';
        ctx.lineWidth   = 2;
        [carX + carPxW * 0.2, carX + carPxW * 0.8].forEach(wx => {
            ctx.beginPath(); ctx.arc(wx, groundY + 4, wheelR, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
            ctx.fillStyle = '#9ca3af';
            ctx.beginPath(); ctx.arc(wx, groundY + 4, 4, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#374151';
        });
    }

    /** Seated stick figure. cx = hip/ball x, floorY = floor pixel y */
    _drawSeatedFigure(cx, floorY, scale, color) {
        const ctx  = this.ctx;
        const u    = Math.max(9, scale * 0.44);  // base unit

        ctx.strokeStyle = color;
        ctx.fillStyle   = color + '44';   // transparent fill for head
        ctx.lineWidth   = Math.max(1.5, u * 0.13);
        ctx.setLineDash([]);

        const legH     = u * 0.65;
        const torsoH   = u * 1.0;
        const headR    = u * 0.42;
        const seatY    = floorY - legH;
        const shoulderY = seatY - torsoH;

        // Bench
        ctx.strokeStyle = '#92400e';
        ctx.lineWidth   = 3;
        ctx.beginPath();
        ctx.moveTo(cx - u * 0.4, seatY + 2);
        ctx.lineTo(cx + u * 0.9, seatY + 2);
        ctx.stroke();

        ctx.strokeStyle = color;
        ctx.lineWidth   = Math.max(1.5, u * 0.13);

        // Thigh (horizontal to the right) + lower leg (vertical down)
        ctx.beginPath();
        ctx.moveTo(cx, seatY); ctx.lineTo(cx + u * 0.55, seatY);
        ctx.moveTo(cx + u * 0.55, seatY); ctx.lineTo(cx + u * 0.55, floorY);
        ctx.stroke();

        // Torso
        ctx.beginPath();
        ctx.moveTo(cx, seatY); ctx.lineTo(cx, shoulderY);
        ctx.stroke();

        // Arms raised upward (holding ball above)
        ctx.beginPath();
        ctx.moveTo(cx, shoulderY + u * 0.25);
        ctx.lineTo(cx - u * 0.05, shoulderY - u * 0.45);
        ctx.moveTo(cx, shoulderY + u * 0.25);
        ctx.lineTo(cx + u * 0.05, shoulderY - u * 0.45);
        ctx.stroke();

        // Head
        ctx.fillStyle = color + '55';
        ctx.beginPath();
        ctx.arc(cx, shoulderY - headR, headR, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.stroke();
    }

    /** Standing figure. Arm raised to watch the passing train. */
    _drawStandingFigure(cx, floorY, color) {
        const ctx  = this.ctx;
        const u    = 14;
        ctx.strokeStyle = color;
        ctx.fillStyle   = color + '44';
        ctx.lineWidth   = 2;
        ctx.setLineDash([]);

        // Head
        ctx.beginPath(); ctx.arc(cx, floorY - u * 3.3, u * 0.52, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
        // Torso
        ctx.beginPath();
        ctx.moveTo(cx, floorY - u * 2.75); ctx.lineTo(cx, floorY - u * 1.3); ctx.stroke();
        // Arm left (out), arm right (raised to watch)
        ctx.beginPath();
        ctx.moveTo(cx, floorY - u * 2.3); ctx.lineTo(cx - u * 0.85, floorY - u * 1.75);
        ctx.moveTo(cx, floorY - u * 2.3); ctx.lineTo(cx + u * 0.35, floorY - u * 2.9);
        ctx.stroke();
        // Legs
        ctx.beginPath();
        ctx.moveTo(cx, floorY - u * 1.3); ctx.lineTo(cx - u * 0.45, floorY);
        ctx.moveTo(cx, floorY - u * 1.3); ctx.lineTo(cx + u * 0.45, floorY);
        ctx.stroke();
    }

    _drawBall(cx, cy, color) {
        const ctx = this.ctx;
        ctx.fillStyle   = color;
        ctx.strokeStyle = color === C_PASS ? '#1d4ed8' : '#047857';
        ctx.lineWidth   = 1.5;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(cx, cy, BALL_R, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }

    // cx = arrow centre (follows train), labelCx = fixed label x (panel centre)
    _drawVelocityArrow(cx, y, labelCx) {
        const ctx = this.ctx;
        const len = 46;
        ctx.strokeStyle = C_OBS;
        ctx.fillStyle   = C_OBS;
        ctx.lineWidth   = 2;
        ctx.setLineDash([]);
        // Arrow shaft
        ctx.beginPath();
        ctx.moveTo(cx - len / 2, y); ctx.lineTo(cx + len / 2, y); ctx.stroke();
        // Arrowhead
        ctx.beginPath();
        ctx.moveTo(cx + len / 2, y);
        ctx.lineTo(cx + len / 2 - 9, y - 5);
        ctx.lineTo(cx + len / 2 - 9, y + 5);
        ctx.closePath(); ctx.fill();
        // Label fixed at panel centre, slightly above the arrow
        ctx.font      = 'bold 12px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`V = ${this.V} m/s`, labelCx, y - 10);
    }

    _panelLabel(ox, text, color) {
        const ctx = this.ctx;
        ctx.fillStyle  = color;
        ctx.font       = 'bold 13px system-ui, sans-serif';
        ctx.textAlign  = 'left';
        ctx.setLineDash([]);
        ctx.fillText(text, ox + 10, 20);
    }

    /** Small color-coded legend at bottom-right of panel */
    _drawLegend(ox, pw, ph, items) {
        const ctx  = this.ctx;
        const x0   = ox + pw - 10;
        const yBase = ph - 10 - items.length * 17;
        ctx.font      = '11px system-ui, sans-serif';
        ctx.textAlign = 'right';
        ctx.setLineDash([]);
        items.forEach((item, i) => {
            ctx.fillStyle = item.color;
            ctx.fillText(item.text, x0, yBase + i * 17);
        });
    }

    _drawEquationsPrime(ox, pw, ph) {
        const ctx = this.ctx;
        const x0  = ox + 10;
        const y0  = 36;   // top of panel, below title label
        ctx.setLineDash([]);
        ctx.font      = '12px monospace';
        ctx.textAlign = 'left';
        ctx.fillStyle = C_PASS;
        ctx.fillText("x′(t) = 0",           x0, y0);
        ctx.fillText("y′(t) = H − ½·g·t²",  x0, y0 + 17);
        ctx.fillStyle = '#374151';
        ctx.font      = 'italic 11px system-ui, sans-serif';
        ctx.fillText("→ straight vertical drop", x0, y0 + 33);
    }

    _drawEquationsGround(ox, pw, ph) {
        const ctx = this.ctx;
        const x0  = ox + 10;
        const y0  = 36;   // top of panel, below title label
        ctx.setLineDash([]);
        ctx.font      = '12px monospace';
        ctx.textAlign = 'left';
        ctx.fillStyle = C_PARA;
        ctx.fillText("x(t) = x′ + V·t = V·t",  x0, y0);
        ctx.fillText("y(t) = y′ = H − ½·g·t²", x0, y0 + 17);
        ctx.fillStyle = '#374151';
        ctx.font      = 'italic 11px system-ui, sans-serif';
        ctx.fillText("→ parabolic trajectory",   x0, y0 + 33);
    }
}
