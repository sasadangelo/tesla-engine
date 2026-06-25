/**
 * Projectile Motion Application
 * Main application logic for UI interaction
 */

import { ProjectileMotionSimulation } from './projectile-motion.js';

// Get DOM elements
const canvas = document.getElementById('scene');
const speedInput = document.getElementById('speed');
const angleInput = document.getElementById('angle');
const launchButton = document.getElementById('launchButton');

const timeValue = document.getElementById('timeValue');
const xValue = document.getElementById('xValue');
const yValue = document.getElementById('yValue');

// Create simulation instance
const simulation = new ProjectileMotionSimulation(canvas);

// Update stats display
function updateStats() {
    const stats = simulation.getStats();
    timeValue.textContent = stats.time.toFixed(2);
    xValue.textContent = stats.x.toFixed(2);
    yValue.textContent = stats.y.toFixed(2);
}

// Launch projectile handler
function launchProjectile() {
    const speed = Number(speedInput.value);
    const angle = Number(angleInput.value);

    simulation.launch(speed, angle);

    // Update stats periodically during animation
    const statsInterval = setInterval(() => {
        updateStats();

        // Stop updating when projectile hits ground
        if (simulation.projectile && simulation.projectile.position.y <= 0 && simulation.world.time > 0) {
            clearInterval(statsInterval);
            updateStats();
        }
    }, 16); // ~60fps
}

// Event listeners
launchButton.addEventListener('click', launchProjectile);

// Update cannon angle when slider changes
angleInput.addEventListener('input', () => {
    const angle = Number(angleInput.value);
    simulation.updateAngle(angle);
});

// Initial draw
simulation.drawScene();
updateStats();
