/**
 * Physical Quantities App — UI wiring
 */

import { VelocityMeasurementSimulation } from './physical-quantities.js';

// ── DOM refs ──────────────────────────────────────────────────────────────
const canvas              = document.getElementById('scene');
const trueDistInput       = document.getElementById('trueDistance');
const rulerResSelect      = document.getElementById('rulerResolution');
const trueTimeInput       = document.getElementById('trueTime');
const stopwatchResSelect  = document.getElementById('stopwatchResolution');
const measureButton       = document.getElementById('measureButton');
const resetButton         = document.getElementById('resetButton');

const statsPanel          = document.getElementById('statsPanel');
const measuredDistEl      = document.getElementById('measuredDist');
const measuredTimeEl      = document.getElementById('measuredTime');
const calcVelocityEl      = document.getElementById('calcVelocity');
const absErrorEl          = document.getElementById('absError');
const relErrorEl          = document.getElementById('relError');
const trueVelocityEl      = document.getElementById('trueVelocity');

// ── Build initial simulation ──────────────────────────────────────────────
let sim = buildSim();

function buildSim() {
    return new VelocityMeasurementSimulation(canvas, {
        trueDistance  : Number(trueDistInput.value),
        trueTime      : Number(trueTimeInput.value),
        rulerRes      : Number(rulerResSelect.value),
        stopwatchRes  : Number(stopwatchResSelect.value)
    });
}

// ── Helpers ───────────────────────────────────────────────────────────────
function setControlsDisabled(disabled) {
    measureButton.disabled     = disabled;
    trueDistInput.disabled     = disabled;
    rulerResSelect.disabled    = disabled;
    trueTimeInput.disabled     = disabled;
    stopwatchResSelect.disabled = disabled;
}

function showResults(r) {
    const dDec = decimals(sim.rulerRes);
    const tDec = decimals(sim.stopwatchRes);

    measuredDistEl.textContent  =
        `${r.measuredDist.toFixed(dDec)} ± ${r.absDist.toFixed(dDec)} m`;

    measuredTimeEl.textContent  =
        `${r.measuredTime.toFixed(tDec)} ± ${r.absTime.toFixed(tDec)} s`;

    calcVelocityEl.textContent  =
        `${r.velocity.toFixed(3)} m/s`;

    absErrorEl.textContent      =
        `± ${r.absErrV.toFixed(3)} m/s`;

    relErrorEl.textContent      =
        `${(r.relErrV * 100).toFixed(2)} %`;

    trueVelocityEl.textContent  =
        `${r.trueV.toFixed(3)} m/s`;

    statsPanel.style.display = 'block';
}

function decimals(res) {
    if (res >= 1)   return 0;
    if (res >= 0.1) return 1;
    return 2;
}

// ── Event listeners ───────────────────────────────────────────────────────
measureButton.addEventListener('click', () => {
    sim = buildSim();
    statsPanel.style.display = 'none';
    setControlsDisabled(true);

    sim.onDone = (results) => {
        showResults(results);
        setControlsDisabled(false);
    };

    sim.start();
});

resetButton.addEventListener('click', () => {
    sim.reset();
    statsPanel.style.display = 'none';
    setControlsDisabled(false);
});
