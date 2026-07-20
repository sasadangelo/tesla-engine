/**
 * Uniform Circular Motion Application
 * Main application logic for the UCM simulation UI
 */

import { UniformCircularMotionSimulation } from './uniform-circular-motion.js';

// Get DOM elements
const canvas = document.getElementById('scene');
const radiusInput = document.getElementById('radius');
const omegaInput = document.getElementById('omega');
const directionSelect = document.getElementById('direction');
const playPauseButton = document.getElementById('playPauseButton');
const resetButton = document.getElementById('resetButton');

const timeValue = document.getElementById('timeValue');
const thetaValue = document.getElementById('thetaValue');
const speedValue = document.getElementById('speedValue');
const accelValue = document.getElementById('accelValue');
const periodValue = document.getElementById('periodValue');
const freqValue = document.getElementById('freqValue');

// Create simulation instance
const simulation = new UniformCircularMotionSimulation(canvas);
simulation.setRadius(Number(radiusInput.value));
simulation.setOmega(Number(omegaInput.value));
simulation.setDirection(Number(directionSelect.value));

let statsInterval = null;

function updateStats() {
    const stats = simulation.getStats();

    timeValue.textContent = stats.time.toFixed(2);
    thetaValue.textContent = stats.thetaDeg.toFixed(1);
    speedValue.textContent = stats.speed.toFixed(2);
    accelValue.textContent = stats.acceleration.toFixed(2);
    periodValue.textContent = Number.isFinite(stats.period) ? stats.period.toFixed(2) : '∞';
    freqValue.textContent = stats.frequency.toFixed(3);
}

function startStatsLoop() {
    if (statsInterval) return;
    statsInterval = setInterval(updateStats, 16); // ~60fps
}

function stopStatsLoop() {
    if (statsInterval) {
        clearInterval(statsInterval);
        statsInterval = null;
    }
    updateStats();
}

// Play / Pause handler
playPauseButton.addEventListener('click', () => {
    if (simulation.isRunning) {
        simulation.pause();
        playPauseButton.textContent = '▶️ Play';
        stopStatsLoop();
    } else {
        simulation.start();
        playPauseButton.textContent = '⏸️ Pause';
        startStatsLoop();
    }
});

// Reset handler
resetButton.addEventListener('click', () => {
    simulation.reset();
    playPauseButton.textContent = '▶️ Play';
    stopStatsLoop();
});

// Live control updates
radiusInput.addEventListener('input', () => {
    simulation.setRadius(Number(radiusInput.value));
    if (!simulation.isRunning) updateStats();
});

omegaInput.addEventListener('input', () => {
    simulation.setOmega(Number(omegaInput.value));
    updateStats();
});

directionSelect.addEventListener('change', () => {
    simulation.setDirection(Number(directionSelect.value));
});

// Initial draw
simulation.drawScene();
updateStats();
