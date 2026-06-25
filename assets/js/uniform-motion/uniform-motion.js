/**
 * Uniform Motion Simulation - Speed Race
 * Simulates a race between 3 vehicles with constant velocities
 */

import { World } from '../tesla-engine/world.js';
import { Body } from '../tesla-engine/body.js';
import { Vector3D } from '../tesla-engine/vector.js';

export class UniformMotionSimulation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.world = new World({ gravity: new Vector3D(0, 0, 0) }); // No gravity for uniform motion

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

        // Vehicle colors and emojis
        this.vehicleConfig = [
            { emoji: '🏎️', color: '#FF4444', name: 'Red Racer' },
            { emoji: '🚗', color: '#4444FF', name: 'Blue Cruiser' },
            { emoji: '🚙', color: '#44FF44', name: 'Green Machine' }
        ];

        this.initializeVehicles();
        this.setupCanvas();
    }

    setupCanvas() {
        // Set canvas size
        this.canvas.width = 1000;
        this.canvas.height = 400;
    }

    initializeVehicles() {
        // Create 3 vehicles at starting positions
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

    setVehicleSpeed(vehicleIndex, speed) {
        if (vehicleIndex >= 0 && vehicleIndex < this.vehicles.length) {
            this.vehicles[vehicleIndex].body.velocity.x = speed;
        }
    }

    startRace() {
        if (this.isRacing) return;

        // Reset vehicles to start
        this.resetRace();

        this.isRacing = true;
        this.raceStartTime = performance.now();
        this.winner = null;
        this.rankings = [];
        this.world.time = 0;

        // Start animation
        this.lastTime = performance.now();
        this.animate();
    }

    resetRace() {
        // Stop animation
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }

        // Reset vehicles
        for (let i = 0; i < this.vehicles.length; i++) {
            this.vehicles[i].body.position.x = 50;
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
        const deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds
        this.lastTime = currentTime;

        // Update physics
        this.world.step(deltaTime);

        // Check for finishers
        this.checkFinishLine();

        // Draw scene
        this.drawScene();

        // Continue animation if race is still ongoing
        if (this.isRacing && this.rankings.length < this.vehicles.length) {
            this.animationId = requestAnimationFrame(() => this.animate());
        } else if (this.rankings.length === this.vehicles.length) {
            this.isRacing = false;
        }
    }

    checkFinishLine() {
        for (let i = 0; i < this.vehicles.length; i++) {
            const vehicle = this.vehicles[i];

            // Check if vehicle crossed finish line and hasn't been ranked yet
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
        const width = this.canvas.width;
        const height = this.canvas.height;

        // Clear canvas
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, width, height);

        // Draw race track
        this.drawTrack();

        // Draw finish line
        this.drawFinishLine();

        // Draw vehicles
        this.drawVehicles();

        // Draw race info
        this.drawRaceInfo();
    }

    drawTrack() {
        const ctx = this.ctx;

        // Draw 3 lanes
        for (let i = 0; i < 3; i++) {
            const y = 100 + i * 100;

            // Lane background
            ctx.fillStyle = i % 2 === 0 ? '#e0e0e0' : '#d0d0d0';
            ctx.fillRect(0, y - 30, this.canvas.width, 60);

            // Lane dividers (dashed lines)
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

        // Checkered pattern
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

            // Draw speed label
            ctx.font = '12px Arial';
            ctx.fillStyle = vehicle.config.color;
            const speed = vehicle.body.velocity.x.toFixed(1);
            ctx.fillText(`${speed} m/s`, x - 20, y - 20);

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

        // Time display
        ctx.fillStyle = '#333';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(`Time: ${this.world.time.toFixed(2)}s`, 20, this.canvas.height - 20);

        // Winner announcement
        if (this.winner && this.rankings.length === this.vehicles.length) {
            ctx.fillStyle = '#FFD700';
            ctx.font = 'bold 30px Arial';
            ctx.fillText(`🏆 ${this.winner.config.name} WINS!`, this.canvas.width / 2 - 150, 30);
        }

        // Rankings
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
            vehicles: this.vehicles.map((v, i) => ({
                name: v.config.name,
                position: v.body.position.x - 50, // Distance from start
                velocity: v.body.velocity.x,
                finished: v.finishTime !== null,
                finishTime: v.finishTime,
                rank: v.rank
            })),
            isRacing: this.isRacing,
            winner: this.winner ? this.winner.config.name : null
        };
    }
}
