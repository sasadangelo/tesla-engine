/**
 * Galilean Relativity App
 * Wires DOM controls to the simulation.
 */

import { GalileanRelativitySimulation } from './galilean-relativity.js';

const canvas      = document.getElementById('scene');
const trainSlider = document.getElementById('trainVelocity');
const velocityVal = document.getElementById('velocityValue');
const startBtn    = document.getElementById('startButton');
const resetBtn    = document.getElementById('resetButton');

const timeVal    = document.getElementById('timeValue');
const yPrimeVal  = document.getElementById('yPrimeValue');
const xGroundVal = document.getElementById('xGroundValue');

const sim = new GalileanRelativitySimulation(canvas);

function updateStats() {
    const s = sim.getStats();
    timeVal.textContent    = s.time.toFixed(2);
    yPrimeVal.textContent  = s.yPrime.toFixed(2);
    xGroundVal.textContent = s.xGround.toFixed(2);
}

function setControlsDisabled(disabled) {
    startBtn.disabled   = disabled;
    trainSlider.disabled = disabled;
}

trainSlider.addEventListener('input', () => {
    const v = Number(trainSlider.value);
    velocityVal.textContent = v;
    sim.setVelocity(v);
    updateStats();
});

startBtn.addEventListener('click', () => {
    sim.start();
    setControlsDisabled(true);
    const interval = setInterval(() => {
        updateStats();
        if (!sim.running) {
            clearInterval(interval);
            updateStats();
            setControlsDisabled(false);
        }
    }, 16);
});

resetBtn.addEventListener('click', () => {
    sim.reset();
    updateStats();
    setControlsDisabled(false);
});

// Initial render
sim.setVelocity(Number(trainSlider.value));
updateStats();
