/**
 * Uniformly Accelerated Motion Application
 * Main application logic for the acceleration race UI
 */

import { UniformlyAcceleratedMotionSimulation } from './uniformly-accelerated-motion.js';

// Get DOM elements
const canvas       = document.getElementById('scene');
const acc1Input    = document.getElementById('acc1');
const acc2Input    = document.getElementById('acc2');
const acc3Input    = document.getElementById('acc3');
const distanceInput = document.getElementById('distance');
const startButton  = document.getElementById('startButton');
const resetButton  = document.getElementById('resetButton');

const timeValue = document.getElementById('timeValue');
const pos1Value = document.getElementById('pos1Value');
const pos2Value = document.getElementById('pos2Value');
const pos3Value = document.getElementById('pos3Value');

// Create simulation instance
const simulation = new UniformlyAcceleratedMotionSimulation(canvas);

// Update stats display
function updateStats() {
    const stats = simulation.getStats();
    timeValue.textContent = stats.time.toFixed(2);
    pos1Value.textContent = stats.vehicles[0].position.toFixed(1);
    pos2Value.textContent = stats.vehicles[1].position.toFixed(1);
    pos3Value.textContent = stats.vehicles[2].position.toFixed(1);
}

// Set controls enabled/disabled state
function setControlsDisabled(disabled) {
    startButton.disabled  = disabled;
    acc1Input.disabled    = disabled;
    acc2Input.disabled    = disabled;
    acc3Input.disabled    = disabled;
    distanceInput.disabled = disabled;
}

// Start race handler
startButton.addEventListener('click', () => {
    simulation.setVehicleAcceleration(0, Number(acc1Input.value));
    simulation.setVehicleAcceleration(1, Number(acc2Input.value));
    simulation.setVehicleAcceleration(2, Number(acc3Input.value));
    simulation.setRaceDistance(Number(distanceInput.value));

    simulation.startRace();
    setControlsDisabled(true);

    const statsInterval = setInterval(() => {
        updateStats();
        if (!simulation.isRacing) {
            clearInterval(statsInterval);
            updateStats();
            setControlsDisabled(false);
        }
    }, 16); // ~60fps
});

// Reset race handler
resetButton.addEventListener('click', () => {
    simulation.resetRace();
    updateStats();
    setControlsDisabled(false);
});

// Initial draw
simulation.drawScene();
updateStats();
