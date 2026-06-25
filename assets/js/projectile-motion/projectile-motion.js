/**
 * Projectile Motion Simulation
 * Handles the simulation logic for projectile motion
 */

import { Vector3D } from '../tesla-engine/vector.js';
import { Body } from '../tesla-engine/body.js';
import { World } from '../tesla-engine/world.js';

export class ProjectileMotionSimulation {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        this.world = new World({
            gravity: new Vector3D(0, -9.81, 0),
        });

        this.projectile = null;
        this.animationFrameId = null;
        this.lastTimestamp = 0;
        this.trajectory = [];
        this.currentAngle = 45; // Default angle in degrees

        // Canvas configuration
        this.scale = 4;  // Reduced scale to fit larger trajectories
        this.groundY = canvas.height - 60;
        this.originX = 60;
    }

    degreesToRadians(degrees) {
        return (degrees * Math.PI) / 180;
    }

    reset() {
        this.world.bodies = [];
        this.world.time = 0;
        this.trajectory = [];
        this.projectile = null;
        this.lastTimestamp = 0;

        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    launch(speed, angleDegrees) {
        this.reset();
        this.currentAngle = angleDegrees;

        const angle = this.degreesToRadians(angleDegrees);

        const velocity = new Vector3D(
            speed * Math.cos(angle),
            speed * Math.sin(angle),
            0
        );

        this.projectile = new Body({
            mass: 1,
            position: new Vector3D(0, 0, 0),
            velocity,
        });

        this.world.addBody(this.projectile);
        this.drawScene();

        this.animationFrameId = requestAnimationFrame((timestamp) => this.animate(timestamp));
    }

    worldToCanvas(position) {
        return {
            x: this.originX + position.x * this.scale,
            y: this.groundY - position.y * this.scale,
        };
    }

    drawCannon() {
        const ctx = this.context;
        const cannonX = this.originX;
        const cannonY = this.groundY;
        const cannonLength = 40;
        const cannonWidth = 12;
        const wheelRadius = 8;

        // Convert angle to radians
        const angleRad = this.degreesToRadians(this.currentAngle);

        // Calculate cannon barrel end position
        const barrelEndX = cannonX + cannonLength * Math.cos(angleRad);
        const barrelEndY = cannonY - cannonLength * Math.sin(angleRad);

        // Draw cannon base (wheels)
        ctx.fillStyle = '#374151';
        ctx.beginPath();
        ctx.arc(cannonX - 10, cannonY, wheelRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cannonX + 10, cannonY, wheelRadius, 0, Math.PI * 2);
        ctx.fill();

        // Draw cannon body (rectangle at base)
        ctx.fillStyle = '#4b5563';
        ctx.fillRect(cannonX - 15, cannonY - 15, 30, 15);

        // Draw cannon barrel
        ctx.strokeStyle = '#1f2937';
        ctx.lineWidth = cannonWidth;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(cannonX, cannonY - 8);
        ctx.lineTo(barrelEndX, barrelEndY - 8);
        ctx.stroke();

        // Draw angle indicator line (dashed)
        ctx.strokeStyle = '#6b7280';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(cannonX, cannonY);
        ctx.lineTo(cannonX + 50, cannonY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw angle arc
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cannonX, cannonY, 30, -angleRad, 0, angleRad < 0);
        ctx.stroke();

        // Draw angle text
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 14px Arial';
        ctx.fillText(`${this.currentAngle}°`, cannonX + 35, cannonY - 5);
    }

    drawScene() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw ground
        this.context.strokeStyle = '#9ca3af';
        this.context.lineWidth = 2;
        this.context.beginPath();
        this.context.moveTo(40, this.groundY);
        this.context.lineTo(this.canvas.width - 20, this.groundY);
        this.context.stroke();

        // Draw cannon
        this.drawCannon();

        // Draw trajectory
        if (this.trajectory.length > 1) {
            this.context.strokeStyle = '#2563eb';
            this.context.lineWidth = 2;
            this.context.beginPath();

            this.trajectory.forEach((point, index) => {
                const canvasPoint = this.worldToCanvas(point);
                if (index === 0) {
                    this.context.moveTo(canvasPoint.x, canvasPoint.y);
                } else {
                    this.context.lineTo(canvasPoint.x, canvasPoint.y);
                }
            });

            this.context.stroke();
        }

        // Draw projectile
        if (this.projectile) {
            const point = this.worldToCanvas(this.projectile.position);

            this.context.fillStyle = '#dc2626';
            this.context.beginPath();
            this.context.arc(point.x, point.y, 8, 0, Math.PI * 2);
            this.context.fill();
        }
    }

    animate(timestamp) {
        if (!this.projectile) {
            return;
        }

        if (!this.lastTimestamp) {
            this.lastTimestamp = timestamp;
        }

        const deltaTime = Math.min((timestamp - this.lastTimestamp) / 1000, 0.033);
        this.lastTimestamp = timestamp;

        this.world.step(deltaTime);
        this.trajectory.push(this.projectile.position.clone());

        // Check if projectile hit the ground
        if (this.projectile.position.y <= 0 && this.world.time > 0) {
            this.projectile.position.y = 0;
            this.trajectory.push(this.projectile.position.clone());
            this.drawScene();
            return;
        }

        this.drawScene();
        this.animationFrameId = requestAnimationFrame((timestamp) => this.animate(timestamp));
    }

    updateAngle(angleDegrees) {
        this.currentAngle = angleDegrees;
        this.drawScene();
    }

    getStats() {
        if (!this.projectile) {
            return {
                time: 0,
                x: 0,
                y: 0
            };
        }

        return {
            time: this.world.time,
            x: this.projectile.position.x,
            y: Math.max(this.projectile.position.y, 0)
        };
    }
}
