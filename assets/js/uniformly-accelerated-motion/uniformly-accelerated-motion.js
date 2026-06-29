/**
 * Uniformly Accelerated Motion Simulation - Acceleration Race
 * Simulates a race between 3 vehicles starting from rest with constant accelerations
 */

import { World } from '../tesla-engine/world.js';
import { Body } from '../tesla-engine/body.js';
import { Vector3D } from '../tesla-engine/vector.js';

export class UniformlyAcceleratedMotionSimulation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.world = new World({ gravity: new Vector3D(0, 0, 0) });

        // Race configuration
        this.raceDistance = 500; // meters
        this.vehicles = [];
        this.isRacing = false;
        this.raceStartTime = 0;
        this.winner = null;
        this.rankings = [];

        // Animation
        this.animationId = null;
        this.lastTime = 0;

        // Vehicle configs — same three vehicles as uniform-motion
        this.vehicleConfig = [
            { emoji: '🏎️', color: '#FF4444', name: 'Red Racer',   acceleration: 5 },
            { emoji: '🚙', color: '#4444FF', name: 'Blue Cruiser', acceleration: 4 },
            { emoji: '🚕', color: '#eab308', name: 'Yellow Taxi',  acceleration: 3 }
        ];

        this.initializeVehicles();
        this.setupCanvas();
    }

    setupCanvas() {
        this.canvas.width  = 1000;
        this.canvas.height = 400;
    }

    initializeVehicles() {
        for (let i = 0; i < 3; i++) {
            const vehicle = {
                body: new Body({
                    mass: 1,
                    position: new Vector3D(50, 100 + i * 100, 0),
                    velocity: new Vector3D(0, 0, 0)
                }),
                config: this.vehicleConfig[i],
                finishTime: null,
                rank: null
            };
            this.vehicles.push(vehicle);
            this.world.addBody(vehicle.body);
        }
    }

    setRaceDistance(distance) {
        this.raceDistance = distance;
    }

    setVehicleAcceleration(vehicleIndex, acceleration) {
        if (vehicleIndex >= 0 && vehicleIndex < this.vehicles.length) {
            this.vehicleConfig[vehicleIndex].acceleration = acceleration;
        }
    }

    startRace() {
        if (this.isRacing) return;

        this.resetRace();

        this.isRacing = true;
        this.raceStartTime = performance.now();
        this.winner = null;
        this.rankings = [];
        this.world.time = 0;

        this.lastTime = performance.now();
        this.animate();
    }

    resetRace() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }

        for (let i = 0; i < this.vehicles.length; i++) {
            this.vehicles[i].body.position.x = 50;
            this.vehicles[i].body.velocity.x = 0;
            this.vehicles[i].finishTime = null;
            this.vehicles[i].rank = null;
        }

        this.isRacing = false;
        this.world.time = 0;
        this.winner = null;
        this.rankings = [];

        this.drawScene();
    }

    animate() {
        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        // Apply constant force (F = m·a, m=1 so F = a) to vehicles still racing
        for (let i = 0; i < this.vehicles.length; i++) {
            const vehicle = this.vehicles[i];
            if (vehicle.finishTime === null) {
                vehicle.body.applyForce(new Vector3D(vehicle.config.acceleration, 0, 0));
            }
        }

        this.world.step(deltaTime);
        this.checkFinishLine();
        this.drawScene();

        if (this.isRacing && this.rankings.length < this.vehicles.length) {
            this.animationId = requestAnimationFrame(() => this.animate());
        } else if (this.rankings.length === this.vehicles.length) {
            this.isRacing = false;
        }
    }

    checkFinishLine() {
        for (let i = 0; i < this.vehicles.length; i++) {
            const vehicle = this.vehicles[i];
            if (vehicle.body.position.x >= this.raceDistance + 50 && vehicle.finishTime === null) {
                vehicle.finishTime = this.world.time;
                vehicle.rank = this.rankings.length + 1;
                this.rankings.push(vehicle);

                if (this.rankings.length === 1) {
                    this.winner = vehicle;
                }
            }
        }
    }

    drawScene() {
        const ctx = this.ctx;
        const width  = this.canvas.width;
        const height = this.canvas.height;

        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, width, height);

        this.drawTrack();
        this.drawFinishLine();
        this.drawVehicles();
        this.drawRaceInfo();
    }

    drawTrack() {
        const ctx = this.ctx;

        for (let i = 0; i < 3; i++) {
            const y = 100 + i * 100;

            ctx.fillStyle = i % 2 === 0 ? '#e0e0e0' : '#d0d0d0';
            ctx.fillRect(0, y - 30, this.canvas.width, 60);

            ctx.strokeStyle = '#999';
            ctx.lineWidth = 2;
            ctx.setLineDash([10, 10]);
            ctx.beginPath();
            ctx.moveTo(0, y - 30);
            ctx.lineTo(this.canvas.width, y - 30);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, y + 30);
            ctx.lineTo(this.canvas.width, y + 30);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // Start line
        ctx.strokeStyle = '#00AA00';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(50, 40);
        ctx.lineTo(50, 360);
        ctx.stroke();

        ctx.fillStyle = '#00AA00';
        ctx.font = 'bold 16px Arial';
        ctx.fillText('START', 10, 30);
    }

    drawFinishLine() {
        const ctx = this.ctx;
        const finishX = this.raceDistance + 50;

        const squareSize = 20;
        for (let y = 40; y < 360; y += squareSize) {
            for (let x = 0; x < squareSize * 2; x += squareSize) {
                const isBlack = ((y / squareSize) + (x / squareSize)) % 2 === 0;
                ctx.fillStyle = isBlack ? '#000' : '#FFF';
                ctx.fillRect(finishX + x - squareSize, y, squareSize, squareSize);
            }
        }

        ctx.fillStyle = '#FF0000';
        ctx.font = 'bold 16px Arial';
        ctx.fillText('FINISH', finishX - 10, 30);
    }

    drawVehicles() {
        const ctx = this.ctx;

        for (let i = 0; i < this.vehicles.length; i++) {
            const vehicle = this.vehicles[i];
            const x = vehicle.body.position.x;
            const y = vehicle.body.position.y;

            // Draw vehicle emoji (flipped to face right)
            ctx.save();
            ctx.scale(-1, 1);
            ctx.font = '40px Arial';
            ctx.fillText(vehicle.config.emoji, -(x + 20), y + 15);
            ctx.restore();

            // Draw speed and acceleration label
            ctx.font = '12px Arial';
            ctx.fillStyle = vehicle.config.color;
            const speed = vehicle.body.velocity.x.toFixed(1);
            const acc   = vehicle.config.acceleration.toFixed(1);
            ctx.fillText(`v=${speed} m/s  a=${acc} m/s²`, x - 20, y - 20);

            // Draw rank if finished
            if (vehicle.rank !== null) {
                ctx.font = 'bold 20px Arial';
                ctx.fillStyle = vehicle.rank === 1 ? '#FFD700' : vehicle.config.color;
                ctx.fillText(`#${vehicle.rank}`, x - 10, y + 40);
            }
        }
    }

    drawRaceInfo() {
        const ctx = this.ctx;

        ctx.fillStyle = '#333';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(`Time: ${this.world.time.toFixed(2)}s`, 20, this.canvas.height - 20);

        if (this.winner && this.rankings.length === this.vehicles.length) {
            ctx.fillStyle = '#FFD700';
            ctx.font = 'bold 30px Arial';
            ctx.fillText(`🏆 ${this.winner.config.name} WINS!`, this.canvas.width / 2 - 150, 30);
        }

        if (this.rankings.length > 0) {
            ctx.fillStyle = '#333';
            ctx.font = 'bold 16px Arial';
            ctx.fillText('Rankings:', this.canvas.width - 200, 60);

            for (let i = 0; i < this.rankings.length; i++) {
                const vehicle = this.rankings[i];
                ctx.fillStyle = vehicle.config.color;
                ctx.font = '14px Arial';
                ctx.fillText(
                    `${i + 1}. ${vehicle.config.name} - ${vehicle.finishTime.toFixed(2)}s`,
                    this.canvas.width - 200,
                    85 + i * 25
                );
            }
        }
    }

    getStats() {
        return {
            time: this.world.time,
            vehicles: this.vehicles.map((v) => ({
                name:         v.config.name,
                position:     v.body.position.x - 50,
                velocity:     v.body.velocity.x,
                acceleration: v.config.acceleration,
                finished:     v.finishTime !== null,
                finishTime:   v.finishTime,
                rank:         v.rank
            })),
            isRacing: this.isRacing,
            winner: this.winner ? this.winner.config.name : null
        };
    }
}
