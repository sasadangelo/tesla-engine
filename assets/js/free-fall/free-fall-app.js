/**
 * Free Fall Application
 * Wires the UI controls to the FreeFallSimulation engine.
 */

import { FreeFallSimulation, GRAVITY_PRESETS } from './free-fall.js';

// ---------------------------------------------------------------------------
// DOM refs
// ---------------------------------------------------------------------------
const canvas          = document.getElementById('scene');
const gravitySelect   = document.getElementById('gravitySelect');
const dampingSlider   = document.getElementById('dampingSlider');
const dampingValue    = document.getElementById('dampingValue');
const startButton     = document.getElementById('startButton');
const resetButton     = document.getElementById('resetButton');

const timeValue       = document.getElementById('timeValue');
const leadVelValue    = document.getElementById('leadVelValue');
const featherVelValue = document.getElementById('featherVelValue');
const leadTimeValue   = document.getElementById('leadTimeValue');
const featherTimeValue= document.getElementById('featherTimeValue');

// ---------------------------------------------------------------------------
// Simulation
// ---------------------------------------------------------------------------
const sim = new FreeFallSimulation(canvas);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function updateStats() {
    const s = sim.getStats();
    timeValue.textContent        = s.time.toFixed(2);
    leadVelValue.textContent     = s.lead.velY.toFixed(1);
    featherVelValue.textContent  = s.feather.velY.toFixed(1);
    leadTimeValue.textContent    = s.leadLandTime   !== null ? s.leadLandTime.toFixed(2)   + ' s' : '—';
    featherTimeValue.textContent = s.featherLandTime !== null ? s.featherLandTime.toFixed(2) + ' s' : '—';
}

function setControlsDisabled(disabled) {
    startButton.disabled   = disabled;
    gravitySelect.disabled = disabled;
    dampingSlider.disabled = disabled;
}

// ---------------------------------------------------------------------------
// Event listeners
// ---------------------------------------------------------------------------
dampingSlider.addEventListener('input', () => {
    const v = Number(dampingSlider.value);
    dampingValue.textContent = v.toFixed(2);
    sim.setAirDamping(v);
});

gravitySelect.addEventListener('change', () => {
    sim.setGravity(gravitySelect.value);
});

startButton.addEventListener('click', () => {
    sim.setGravity(gravitySelect.value);
    sim.setAirDamping(Number(dampingSlider.value));
    sim.start();
    setControlsDisabled(true);

    const interval = setInterval(() => {
        updateStats();
        if (!sim.isRunning) {
            clearInterval(interval);
            updateStats();
            setControlsDisabled(false);
        }
    }, 16);
});

resetButton.addEventListener('click', () => {
    sim.reset();
    updateStats();
    setControlsDisabled(false);
});

// ---------------------------------------------------------------------------
// Initial render
// ---------------------------------------------------------------------------
sim.drawScene();
updateStats();
