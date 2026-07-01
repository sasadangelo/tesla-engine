/**
 * Free Fall Simulation
 *
 * Two objects — a lead ball and a feather — are dropped simultaneously from
 * the same height.  The user can choose:
 *
 *   - Gravity preset  (Earth, Mars, Jupiter, Deep Space = 0)
 *   - Air resistance  via world.linearDamping  (0 = vacuum → pure free fall)
 *
 * Key pedagogical message:
 *   In a vacuum ALL bodies fall at the same rate regardless of mass (Galileo).
 *   It is AIR RESISTANCE — not weight — that makes a feather fall slower.
 *
 * Physics:
 *   a = g  (same for both bodies, mass cancels out)
 *   F_drag = -world.linearDamping · body.dragCoefficient · v
 *   Terminal velocity: v_t = m·g / (world.linearDamping · dragCoefficient)
 */

import { World }    from '../tesla-engine/world.js';
import { Body }     from '../tesla-engine/body.js';
import { Vector3D } from '../tesla-engine/vector.js';

// ---------------------------------------------------------------------------
// Gravity presets  (m/s²)
// ---------------------------------------------------------------------------
export const GRAVITY_PRESETS = {
    earth:       9.81,
    mars:        3.72,
    jupiter:    24.79,
    deepspace:   0.00,
};

// ---------------------------------------------------------------------------
// Object configs
// ---------------------------------------------------------------------------
const LEAD_BALL = {
    label:           'Lead Ball',
    emoji:           '🔵',
    mass:            5.0,      // kg  — heavy dense sphere
    dragCoefficient: 0.05,     // Cd·A — small cross-section
    radius:          18,       // px for drawing
    color:           '#374151',
    trailColor:      'rgba(55,65,81,0.3)',
};

const FEATHER = {
    label:           'Feather',
    emoji:           '🪶',
    mass:            0.1,      // kg  — light
    dragCoefficient: 0.4,      // Cd·A — large irregular surface
    // With damping=1: v_terminal = 0.1*9.81/0.4 ≈ 2.45 m/s → lands ~42 s
    // With damping=0: same time as lead ball (Galileo result)
    radius:          14,
    color:           '#d97706',
    trailColor:      'rgba(217,119,6,0.3)',
};

// How many metres of real-world height the canvas represents
const WORLD_HEIGHT_M = 100; // metres

export class FreeFallSimulation {
    /**
     * @param {HTMLCanvasElement} canvas
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx    = canvas.getContext('2d');

        // Simulation state
        this.gravityMagnitude = GRAVITY_PRESETS.earth;
        this.airDamping       = 0;        // world.linearDamping
        this.isRunning        = false;
        this.animationId      = null;
        this.lastTime         = 0;

        this.setupCanvas();
        this._buildWorld();
        this.drawScene();
    }

    // -------------------------------------------------------------------------
    // Setup
    // -------------------------------------------------------------------------

    setupCanvas() {
        this.canvas.width  = 700;
        this.canvas.height = 520;
    }

    _buildWorld() {
        this.world = new World({
            gravity:       new Vector3D(0, -this.gravityMagnitude, 0),
            linearDamping: this.airDamping,
        });

        // Pixel-per-metre scale: canvas height / world height
        this.scale = this.canvas.height / WORLD_HEIGHT_M;

        // Pull start position down by the largest radius (18 px) + a small margin (4 px)
        // so the circles are fully visible at the top of the canvas.
        // pxToM converts canvas pixels to world metres using the same scale as _worldToCanvas.
        const H       = this.canvas.height;
        const pxToM   = WORLD_HEIGHT_M / (H * 0.88);
        const startY  = WORLD_HEIGHT_M - (LEAD_BALL.radius + 4) * pxToM;

        this.leadBody = new Body({
            mass:            LEAD_BALL.mass,
            position:        new Vector3D(0, startY, 0),
            velocity:        new Vector3D(0, 0, 0),
            dragCoefficient: LEAD_BALL.dragCoefficient,
        });

        this.featherBody = new Body({
            mass:            FEATHER.mass,
            position:        new Vector3D(0, startY, 0),
            velocity:        new Vector3D(0, 0, 0),
            dragCoefficient: FEATHER.dragCoefficient,
        });

        this.world.addBody(this.leadBody);
        this.world.addBody(this.featherBody);

        // Trail history  [ {y: worldY}, ... ]
        this.leadTrail    = [];
        this.featherTrail = [];

        this.leadLanded    = false;
        this.featherLanded = false;
        this.leadLandTime  = null;
        this.featherLandTime = null;
    }

    // -------------------------------------------------------------------------
    // Public API
    // -------------------------------------------------------------------------

    setGravity(presetKey) {
        this.gravityMagnitude = GRAVITY_PRESETS[presetKey] ?? GRAVITY_PRESETS.earth;
    }

    setAirDamping(value) {
        this.airDamping = value;
    }

    start() {
        if (this.isRunning) return;

        // Rebuild world with current settings
        this._buildWorld();
        this.world.gravity.y      = -this.gravityMagnitude;
        this.world.linearDamping  = this.airDamping;

        this.isRunning = true;
        this.lastTime  = performance.now();
        this._animate();
    }

    reset() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.isRunning = false;
        this._buildWorld();
        this.world.gravity.y     = -this.gravityMagnitude;
        this.world.linearDamping = this.airDamping;
        this.drawScene();
    }

    getStats() {
        return {
            time:           this.world.time,
            isRunning:      this.isRunning,
            leadLanded:     this.leadLanded,
            featherLanded:  this.featherLanded,
            leadLandTime:   this.leadLandTime,
            featherLandTime:this.featherLandTime,
            lead: {
                posY:  Math.max(0, WORLD_HEIGHT_M - this.leadBody.position.y),
                velY:  Math.abs(this.leadBody.velocity.y),
            },
            feather: {
                posY: Math.max(0, WORLD_HEIGHT_M - this.featherBody.position.y),
                velY: Math.abs(this.featherBody.velocity.y),
            },
        };
    }

    // -------------------------------------------------------------------------
    // Animation loop
    // -------------------------------------------------------------------------

    _animate() {
        const now       = performance.now();
        const deltaTime = Math.min((now - this.lastTime) / 1000, 0.05); // cap 50ms
        this.lastTime   = now;

        this._checkLanding();
        this.world.step(deltaTime);
        this._checkLanding();
        this._recordTrails();
        this.drawScene();

        const bothLanded = this.leadLanded && this.featherLanded;
        const deepSpace  = this.gravityMagnitude === 0;

        if (this.isRunning && !bothLanded && !deepSpace) {
            this.animationId = requestAnimationFrame(() => this._animate());
        } else if (deepSpace && this.isRunning) {
            // In deep space nothing moves — show static result after one frame
            this.isRunning = false;
            this.drawScene();
        } else if (bothLanded) {
            this.isRunning = false;
        }
    }

    _checkLanding() {
        // "ground" is y = 0 in world coords
        if (!this.leadLanded && this.leadBody.position.y <= 0) {
            this.leadBody.position.y  = 0;
            this.leadBody.velocity.y  = 0;
            this.leadLanded           = true;
            this.leadLandTime         = this.world.time;
        }
        if (!this.featherLanded && this.featherBody.position.y <= 0) {
            this.featherBody.position.y = 0;
            this.featherBody.velocity.y = 0;
            this.featherLanded          = true;
            this.featherLandTime        = this.world.time;
        }
        // Freeze landed bodies so world.step() cannot push them below ground
        if (this.leadLanded) {
            this.leadBody.position.y = 0;
            this.leadBody.velocity.y = 0;
        }
        if (this.featherLanded) {
            this.featherBody.position.y = 0;
            this.featherBody.velocity.y = 0;
        }
    }

    _recordTrails() {
        // Stop recording once an object has landed — the trail is complete
        if (!this.leadLanded)    this.leadTrail.push(this.leadBody.position.y);
        if (!this.featherLanded) this.featherTrail.push(this.featherBody.position.y);
    }

    // -------------------------------------------------------------------------
    // Rendering
    // -------------------------------------------------------------------------

    drawScene() {
        const ctx    = this.ctx;
        const W      = this.canvas.width;
        const H      = this.canvas.height;
        const scale  = H / WORLD_HEIGHT_M;

        // Background
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, W, H);

        this._drawSky(ctx, W, H);
        this._drawGround(ctx, W, H);
        this._drawHeightMarkers(ctx, W, H, scale);
        this._drawTrail(ctx, this.leadTrail,    scale, W * 0.35, LEAD_BALL.trailColor);
        this._drawTrail(ctx, this.featherTrail, scale, W * 0.65, FEATHER.trailColor);
        this._drawBody(ctx, this.leadBody,    scale, W * 0.35, LEAD_BALL);
        this._drawBody(ctx, this.featherBody, scale, W * 0.65, FEATHER);
        this._drawLabels(ctx, W, H, scale);
        this._drawInfo(ctx, W, H);
    }

    _drawSky(ctx, W, H) {
        const grad = ctx.createLinearGradient(0, 0, 0, H * 0.88);
        grad.addColorStop(0,   '#dbeafe');
        grad.addColorStop(1,   '#f0f9ff');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H * 0.88);
    }

    _drawGround(ctx, W, H) {
        const groundY = H * 0.88;
        ctx.fillStyle = '#6b7280';
        ctx.fillRect(0, groundY, W, H - groundY);

        // grass strip
        ctx.fillStyle = '#4ade80';
        ctx.fillRect(0, groundY, W, 6);
    }

    _drawHeightMarkers(ctx, W, H, scale) {
        ctx.strokeStyle = 'rgba(100,116,139,0.3)';
        ctx.lineWidth   = 1;
        ctx.setLineDash([4, 6]);
        ctx.font        = '11px system-ui, sans-serif';
        ctx.fillStyle   = '#64748b';

        for (let m = 0; m <= WORLD_HEIGHT_M; m += 10) {
            const y = H * 0.88 - m * scale * 0.88;
            ctx.beginPath();
            ctx.moveTo(30, y);
            ctx.lineTo(W - 10, y);
            ctx.stroke();
            ctx.fillText(`${m} m`, 4, y + 4);
        }
        ctx.setLineDash([]);
    }

    _drawTrail(ctx, trail, scale, cx, color) {
        if (trail.length < 2) return;
        ctx.strokeStyle = color;
        ctx.lineWidth   = 2;
        ctx.beginPath();
        for (let i = 0; i < trail.length; i++) {
            const y = this._worldToCanvas(trail[i]);
            if (i === 0) ctx.moveTo(cx, y);
            else         ctx.lineTo(cx, y);
        }
        ctx.stroke();
    }

    _drawBody(ctx, body, scale, cx, config) {
        const y = this._worldToCanvas(body.position.y);
        const r = config.radius;

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.12)';
        ctx.beginPath();
        ctx.ellipse(cx + 3, y + 3, r, r * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Circle
        ctx.fillStyle = config.color;
        ctx.beginPath();
        ctx.arc(cx, y, r, 0, Math.PI * 2);
        ctx.fill();

        // Emoji label
        ctx.font      = '22px serif';
        ctx.textAlign = 'center';
        ctx.fillText(config.emoji, cx, y + 8);
        ctx.textAlign = 'left';

        // Landing marker
        if ((config.label === 'Lead Ball' && this.leadLanded) ||
            (config.label === 'Feather'   && this.featherLanded)) {
            ctx.strokeStyle = '#22c55e';
            ctx.lineWidth   = 3;
            ctx.beginPath();
            ctx.arc(cx, y, r + 5, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    _drawLabels(ctx, W, H, scale) {
        const groundY = H * 0.88;
        ctx.font      = 'bold 13px system-ui, sans-serif';
        ctx.textAlign = 'center';

        // Lead ball column label
        ctx.fillStyle = LEAD_BALL.color;
        ctx.fillText('Lead Ball', W * 0.35, groundY + 22);

        // Feather column label
        ctx.fillStyle = FEATHER.color;
        ctx.fillText('Feather', W * 0.65, groundY + 22);

        ctx.textAlign = 'left';
    }

    _drawInfo(ctx, W, H) {
        const pad = 10;
        const bx  = W - 210;
        const by  = pad;
        const bw  = 200;
        const bh  = this.leadLanded || this.featherLanded ? 130 : 80;

        ctx.fillStyle = 'rgba(255,255,255,0.88)';
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth   = 1;
        this._roundRect(ctx, bx, by, bw, bh, 8);
        ctx.fill();
        ctx.stroke();

        ctx.font      = '12px system-ui, sans-serif';
        ctx.fillStyle = '#1e293b';
        ctx.fillText(`Time: ${this.world.time.toFixed(2)} s`,    bx + 10, by + 20);
        ctx.fillStyle = LEAD_BALL.color;
        ctx.fillText(`Lead v: ${Math.abs(this.leadBody.velocity.y).toFixed(1)} m/s`,
                     bx + 10, by + 40);
        ctx.fillStyle = FEATHER.color;
        ctx.fillText(`Feather v: ${Math.abs(this.featherBody.velocity.y).toFixed(1)} m/s`,
                     bx + 10, by + 58);

        if (this.leadLandTime !== null) {
            ctx.fillStyle = LEAD_BALL.color;
            ctx.fillText(`Lead landed: ${this.leadLandTime.toFixed(2)} s`, bx + 10, by + 80);
        }
        if (this.featherLandTime !== null) {
            ctx.fillStyle = FEATHER.color;
            ctx.fillText(`Feather landed: ${this.featherLandTime.toFixed(2)} s`, bx + 10, by + 100);
        }

        // Conclusion banner
        if (this.leadLanded && this.featherLanded) {
            const diff = Math.abs(this.leadLandTime - this.featherLandTime);
            const msg  = diff < 0.05
                ? '✓ They landed together! Mass doesn\'t matter.'
                : '✓ Air resistance made the difference!';
            this._drawBanner(ctx, W, H, msg);
        } else if (this.gravityMagnitude === 0 && this.isRunning === false) {
            this._drawBanner(ctx, W, H, '⚠ No gravity — objects float in deep space.');
        }
    }

    _drawBanner(ctx, W, H, msg) {
        const bh = 44;
        const by = H * 0.88 - bh - 10;
        ctx.fillStyle   = 'rgba(34,197,94,0.9)';
        this._roundRect(ctx, 20, by, W - 40, bh, 8);
        ctx.fill();
        ctx.font        = 'bold 14px system-ui, sans-serif';
        ctx.fillStyle   = '#fff';
        ctx.textAlign   = 'center';
        ctx.fillText(msg, W / 2, by + 27);
        ctx.textAlign   = 'left';
    }

    _roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    }

    /** Convert world Y (metres, 0=ground, 100=top) to canvas Y (px, 0=top) */
    _worldToCanvas(worldY) {
        // canvas ground is at H * 0.88
        const H = this.canvas.height;
        return H * 0.88 - worldY * (H * 0.88 / WORLD_HEIGHT_M);
    }
}
