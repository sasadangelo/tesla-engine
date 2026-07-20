/**
 * Uniform Circular Motion Simulation
 * A point mass travels at constant angular velocity ω along a circle of radius r.
 *
 * Position is computed directly from the parametric equations
 *   x(t) = r · cos(θ0 + ω t),  y(t) = r · sin(θ0 + ω t)
 * rather than via force integration: centripetal dynamics (F = m ω² r) belongs
 * to the later Forces chapters, so this stays pure kinematics for now.
 */
export class UniformCircularMotionSimulation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.radius = 3;      // m
        this.omega = 2;       // rad/s
        this.direction = 1;   // 1 = counter-clockwise, -1 = clockwise
        this.theta = 0;       // current angle, rad

        this.time = 0;
        this.isRunning = false;
        this.animationId = null;
        this.lastTimestamp = 0;

        this.scale = 40; // px per meter
        this.velocityArrowLength = 60;  // px, fixed length (direction indicator)
        this.accelArrowLength = 45;     // px, fixed length (direction indicator)

        this.setupCanvas();
    }

    setupCanvas() {
        this.canvas.width = 700;
        this.canvas.height = 500;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
    }

    setRadius(r) {
        this.radius = r;
        this.drawScene();
    }

    setOmega(omega) {
        this.omega = omega;
        this.drawScene();
    }

    setDirection(direction) {
        this.direction = direction;
        this.drawScene();
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.lastTimestamp = performance.now();
        this.animate();
    }

    pause() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    reset() {
        this.pause();
        this.time = 0;
        this.theta = 0;
        this.drawScene();
    }

    animate() {
        const now = performance.now();
        const deltaTime = Math.min((now - this.lastTimestamp) / 1000, 0.033);
        this.lastTimestamp = now;

        this.time += deltaTime;
        this.theta += this.direction * this.omega * deltaTime;

        this.drawScene();

        if (this.isRunning) {
            this.animationId = requestAnimationFrame(() => this.animate());
        }
    }

    getPosition() {
        return {
            x: this.radius * Math.cos(this.theta),
            y: this.radius * Math.sin(this.theta),
        };
    }

    getVelocity() {
        const speed = this.omega * this.radius;
        return {
            magnitude: speed,
            x: -this.direction * speed * Math.sin(this.theta),
            y: this.direction * speed * Math.cos(this.theta),
        };
    }

    getCentripetalAcceleration() {
        const magnitude = this.omega * this.omega * this.radius;
        return {
            magnitude,
            x: -Math.cos(this.theta) * magnitude,
            y: -Math.sin(this.theta) * magnitude,
        };
    }

    getPeriod() {
        return this.omega > 0 ? (2 * Math.PI) / this.omega : Infinity;
    }

    getFrequency() {
        const period = this.getPeriod();
        return period > 0 && Number.isFinite(period) ? 1 / period : 0;
    }

    worldToCanvas(x, y) {
        return {
            x: this.centerX + x * this.scale,
            y: this.centerY - y * this.scale,
        };
    }

    drawArrow(fromX, fromY, toX, toY, color) {
        const ctx = this.ctx;
        const headLength = 9;
        const angle = Math.atan2(toY - fromY, toX - fromX);

        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 2.5;

        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();
    }

    drawScene() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;

        ctx.fillStyle = '#111827';
        ctx.fillRect(0, 0, width, height);

        const center = this.worldToCanvas(0, 0);
        const radiusPx = this.radius * this.scale;

        // Circular path (dashed)
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.arc(center.x, center.y, radiusPx, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Center point
        ctx.fillStyle = '#9ca3af';
        ctx.beginPath();
        ctx.arc(center.x, center.y, 4, 0, Math.PI * 2);
        ctx.fill();

        const pos = this.getPosition();
        const posPx = this.worldToCanvas(pos.x, pos.y);

        // Radius line
        ctx.strokeStyle = '#4b5563';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(posPx.x, posPx.y);
        ctx.stroke();

        // Centripetal acceleration vector (red, points to center)
        const accel = this.getCentripetalAcceleration();
        if (accel.magnitude > 0) {
            const accelDirX = -pos.x / this.radius;
            const accelDirY = -pos.y / this.radius;
            this.drawArrow(
                posPx.x, posPx.y,
                posPx.x + accelDirX * this.accelArrowLength,
                posPx.y - accelDirY * this.accelArrowLength,
                '#ef4444'
            );
        }

        // Velocity vector (green, tangent to circle)
        const vel = this.getVelocity();
        if (vel.magnitude > 0) {
            const velDirX = vel.x / vel.magnitude;
            const velDirY = vel.y / vel.magnitude;
            this.drawArrow(
                posPx.x, posPx.y,
                posPx.x + velDirX * this.velocityArrowLength,
                posPx.y - velDirY * this.velocityArrowLength,
                '#10b981'
            );
        }

        // Moving body
        ctx.fillStyle = '#2563eb';
        ctx.beginPath();
        ctx.arc(posPx.x, posPx.y, 9, 0, Math.PI * 2);
        ctx.fill();

        // Legend
        ctx.font = '13px Arial';
        ctx.fillStyle = '#10b981';
        ctx.fillText('→ velocity (tangent)', 16, height - 40);
        ctx.fillStyle = '#ef4444';
        ctx.fillText('→ centripetal acceleration', 16, height - 20);
    }

    getStats() {
        const pos = this.getPosition();
        const vel = this.getVelocity();
        const accel = this.getCentripetalAcceleration();
        const thetaDeg = ((this.theta * 180 / Math.PI) % 360 + 360) % 360;

        return {
            time: this.time,
            thetaRad: this.theta,
            thetaDeg,
            position: pos,
            speed: vel.magnitude,
            acceleration: accel.magnitude,
            period: this.getPeriod(),
            frequency: this.getFrequency(),
            isRunning: this.isRunning,
        };
    }
}
