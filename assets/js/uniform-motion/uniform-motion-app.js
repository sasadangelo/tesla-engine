/**
 * Uniform Motion Application
 * Main application logic for the speed race UI
 */

import { UniformMotionSimulation } from './uniform-motion.js';

// Get DOM elements
const canvas = document.getElementById('scene');
const speed1Input = document.getElementById('speed1');
const speed2Input = document.getElementById('speed2');
const speed3Input = document.getElementById('speed3');
const distanceInput = document.getElementById('distance');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');

const timeValue = document.getElementById('timeValue');
const pos1Value = document.getElementById('pos1Value');
const pos2Value = document.getElementById('pos2Value');
const pos3Value = document.getElementById('pos3Value');

// Create simulation instance
const simulation = new UniformMotionSimulation(canvas);

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
    startButton.disabled = disabled;
    speed1Input.disabled = disabled;
    speed2Input.disabled = disabled;
    speed3Input.disabled = disabled;
    distanceInput.disabled = disabled;
}

// Start race handler
startButton.addEventListener('click', () => {
    simulation.setVehicleSpeed(0, Number(speed1Input.value));
    simulation.setVehicleSpeed(1, Number(speed2Input.value));
    simulation.setVehicleSpeed(2, Number(speed3Input.value));
    simulation.setRaceDistance(Number(distanceInput.value));

    simulation.startRace();
    setControlsDisabled(true);

    // Update stats periodically during race
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
