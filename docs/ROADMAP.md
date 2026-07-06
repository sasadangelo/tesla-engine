# 🗺️ Tesla Engine — Roadmap

> A structured journey through Physics, Mathematics, and Code.
> Each topic builds on the previous one, introducing the **Just-in-Time math** needed to implement the simulation.

---

# Part I — Mechanics

## 1. Kinematics — The Geometry of Motion

| # | Topic | Description | Math JIT |
|---|-------|-------------|----------|
| 1.1 | ~~**Uniform Rectilinear Motion (URM)**~~ | ~~Displacement at constant velocity.~~ | Introduction to **Vectors** (magnitude, direction, sense). |
| 1.2 | ~~**Uniformly Accelerated Motion (UAM)**~~ | ~~Introduction of constant acceleration.~~ | ~~[Deriving the Position Formula](../uniformly-accelerated-motion-math-jit/) — step-by-step algebraic derivation from average velocity to x(t) = x₀ + v₀t + ½at².~~ |
| 1.3 | ~~**Free Fall**~~ | ~~Two objects (lead ball and feather) dropped simultaneously. Combo box for gravity preset (Earth, Mars, Jupiter, Deep Space). Slider for air resistance. Demonstrates that mass does not affect free-fall acceleration.~~ | — |
| 1.4 | ~~**Projectile Motion (Parabolic)**~~ | ~~Two-dimensional integration of URM + free fall.~~ | ~~[Splitting a Vector — The Shadow Analogy](../projectile-motion-math-jit/) — sine and cosine as "shadow percentages" to decompose the initial velocity vector into X and Y components.~~ |
| 1.5 | **Galilean Relativity & Reference Frames** | Inertial vs. non-inertial frames. No privileged frame — all inertial observers are equivalent. Simulation: a ball dropped inside a moving train appears to fall vertically for the passenger but traces a parabola for the trackside observer. Toggle button to switch between the two reference frames in real time. | **Galilean transformations** — x' = x − vt, t' = t; **relative velocity composition**: v'⃗ = v⃗ − u⃗. |
| 1.6 | **Uniform Circular Motion (UCM)** | Constant-speed motion along a circle — introduces angular velocity ω, period T, and frequency f. | **Angular velocity** ω = Δθ/Δt, centripetal acceleration a = ω²·r. |
| 1.7 | **Simple Harmonic Motion — Pendulum** | SHM as the projection of UCM: θ(t) = θ₀·cos(ωt) with ω = √(g/L). Interactive pendulum simulation. | **Period** T = 2π√(L/g) — bridge between circular motion and oscillation. |

---

## 2. Terrestrial Dynamics — The Introduction of Forces

| # | Topic | Description |
|---|-------|-------------|
| 2.1 | **Newton's 1st Law (Inertia)** | State of rest or URM when the net force is zero (∑F⃗ = 0). |
| 2.2 | **Newton's 2nd Law (F = ma)** | The heart of the engine. Computing acceleration from mass and applied forces. |
| 2.3 | **Newton's 3rd Law (Action / Reaction)** | Symmetric and opposite forces — e.g. cannon recoil or rocket propulsion. |
| 2.4 | **Sliding Friction (Static & Kinetic)** | Contact forces on surfaces — e.g. sliding on an inclined plane. |
| 2.5 | **Fluid Resistance (Drag)** | Forces proportional to velocity (linear / quadratic) and the concept of terminal velocity. |

---

## 3. Celestial Mechanics — The Universe in Code

| # | Topic | Description |
|---|-------|-------------|
| 3.1 | **Newton's Law of Universal Gravitation** | Computing attractive forces between masses at a distance: F = G · m₁m₂ / r². |
| 3.2 | **Kepler's Three Laws** | Simulation of stable elliptical orbits and geometric demonstration of the swept-area law. |
| 3.3 | **N-Body Simulation** | Chaotic systems with three or more interacting bodies — e.g. Sun–Earth–Moon. |

---

## 4. Mathematics of Time — Solvers (Software Engineering)

| # | Topic | Description |
|---|-------|-------------|
| 4.1 | **Euler vs. Euler–Cromer** | Why the simplest integration creates energy from nothing, and how to fix it to stabilise the code. |
| 4.2 | **Verlet Integration** | Position-based algorithm (no explicit velocity storage) — essential for the stability of ropes and cloth. |
| 4.3 | **Runge–Kutta (RK4)** | High-precision solver for scientific orbital simulations. |

---

## 5. Statics and Simple Machines — Equilibrium and Mechanical Advantage

| # | Topic | Description | Math JIT |
|---|-------|-------------|----------|
| 5.1 | **Rigid Body Equilibrium** | Force and moment equilibrium conditions: ∑F⃗ = 0 and ∑M⃗ = 0. | — |
| 5.2 | **Levers** | Lever arm and mechanical advantage — 1st, 2nd, and 3rd class levers / the seesaw. | — |
| 5.3 | **Pulleys** | Ideal inextensible ropes. Fixed pulley (force vector redirection) and movable pulley (halved effort). | — |
| 5.4 | **Gears** | Rotational motion transmission, reduction ratios, direction reversal. | Introduction to **Angular Velocity (ω)** and the software concept of **Relational Constraint**. |

---

## 6. Conservation Laws — The Engine's Quality Control

| # | Topic | Description |
|---|-------|-------------|
| 6.1 | **Kinetic and Potential Energy** | The energy balance of moving bodies. |
| 6.2 | **Conservation of Mechanical Energy** | Pendulum or Roller Coaster simulation with real-time graphs showing that E_total is conserved when the engine is accurate. |

---

## 7. Collisions and Tunneling

| # | Topic | Description | Math JIT |
|---|-------|-------------|----------|
| 7.1 | **Linear Momentum** | The principle of conservation of linear impulse. | — |
| 7.2 | **Elastic Collisions** | Collision Detection and Collision Resolution between spheres. | **Dot Product** — to project velocity vectors along the impact axis. |
| 7.3 | **The Tunneling Paradox (CCD)** | Raycasting techniques to prevent fast-moving objects from passing through walls in discrete time-step calculations. | — |

---

## 8. Spring Systems — Deformable Structures

| # | Topic | Description |
|---|-------|-------------|
| 8.1 | **Hooke's Law** | Elastic forces proportional to displacement: F = −kx. |
| 8.2 | **Mass–Spring Systems** | Connecting multiple particles via elastic constraints to simulate soft bodies, swinging ropes, or cloth. |

---

## 9. Rigid Body Dynamics — Advanced Rotation

| # | Topic | Description | Math JIT |
|---|-------|-------------|----------|
| 9.1 | **Moment of Inertia (I)** | The intrinsic rotational resistance of an extended geometric shape. | — |
| 9.2 | **Torque (τ)** | The rotational equivalent of force: τ = I · α. | **Cross Product** — to compute torque in 3D and **Rotation Matrices** to update geometry vertices on the Canvas. |

---

# Part II — Thermodynamics

## 10. Kinetic Theory & Ideal Gases — From Particles to Temperature

| # | Topic | Description | Math JIT |
|---|-------|-------------|----------|
| 10.1 | **Kinetic Theory of Gases** | A gas as a box of elastic particles: pressure emerges statistically from collisions on walls. | **Statistical average** — temperature T ∝ ⟨½mv²⟩. |
| 10.2 | **Maxwell-Boltzmann Distribution** | Live histogram of particle speeds; verify convergence to the theoretical curve as N increases. | — |
| 10.3 | **Ideal Gas Law (PV = nRT)** | Movable piston: change volume or temperature and observe the other variable respond in real time. | — |

---

## 11. Heat & Thermodynamic Processes — Energy in Transit

| # | Topic | Description | Math JIT |
|---|-------|-------------|----------|
| 11.1 | **Heat and Internal Energy** | Distinction between heat (transfer) and internal energy (state). Two bodies reaching thermal equilibrium. | — |
| 11.2 | **Isothermal, Isobaric, Isochoric, Adiabatic** | Animated P-V diagram showing each process as a different curve; piston simulation synchronised with the graph. | **Work** W = ∫P dV for each process type. |
| 11.3 | **Carnot Cycle** | Ideal heat engine: four-step cycle animated with simultaneous P-V plot. Efficiency η = 1 − T_cold/T_hot. | — |
| 11.4 | **Entropy and Irreversibility** | Free expansion: particles initially on one side spread everywhere — never the reverse. Visual entropy counter. | Qualitative introduction to the **Second Law**. |

---

# Part III — Fluid Mechanics

## 12. Fluid Statics — Pressure at Rest

| # | Topic | Description | Math JIT |
|---|-------|-------------|----------|
| 12.1 | **Hydrostatic Pressure** | Fluid column: pressure proportional to depth (P = ρgh). Interactive manometer. | — |
| 12.2 | **Pascal's Principle** | Hydraulic press: a small force on a small piston produces a large force on a large piston. | — |
| 12.3 | **Archimedes' Principle** | Objects of different densities immersed in a liquid: floating, equilibrium, sinking. | — |

---

## 13. Fluid Dynamics — Flow and Forces

| # | Topic | Description | Math JIT |
|---|-------|-------------|----------|
| 13.1 | **Continuity Equation & Bernoulli** | Venturi tube: velocity increases where cross-section decreases; pressure drops. | **Conservation of flow rate** A₁v₁ = A₂v₂. |
| 13.2 | **Viscosity and Laminar Flow** | Parabolic Poiseuille profile in a pipe. Slider for viscosity. | — |
| 13.3 | **Turbulence (Reynolds Number)** | Transition from laminar to turbulent flow visualised as Re increases. | **Re = ρvL/μ** — dimensionless threshold. |
| 13.4 | **Smoothed-Particle Hydrodynamics (SPH)** | 2D water simulation: flow, waves, splash — each particle carries density and pressure. | **Smoothing kernel** W(r, h) and **pressure gradient** as inter-particle force. |

---

# Part IV — Waves & Acoustics

## 14. Mechanical Waves — Oscillations that Travel

| # | Topic | Description | Math JIT |
|---|-------|-------------|----------|
| 14.1 | **Transverse Waves on a String** | Chain of coupled oscillators (springs); pulse propagates and reflects at a fixed/free end. | **Wave equation** ∂²y/∂t² = v²·∂²y/∂x². |
| 14.2 | **Longitudinal Waves (Sound)** | Compressions and rarefactions in a row of particles — "slinky" visualisation. | — |
| 14.3 | **Superposition and Interference** | Two point sources: constructive/destructive interference pattern in the plane. | **Superposition principle** y = y₁ + y₂. |
| 14.4 | **Standing Waves and Resonance** | String fixed at both ends: only certain frequencies produce stable patterns (harmonics). | **Natural frequencies** fₙ = n·v/(2L). |
| 14.5 | **Doppler Effect** | Moving source: frontal compression and rear elongation of wavelength. | **f' = f · (v ± v_obs) / (v ∓ v_src)**. |

---

# Part V — Electromagnetism

## 15. Electrostatics — Forces at a Distance (with Sign)

| # | Topic | Description | Math JIT |
|---|-------|-------------|----------|
| 15.1 | **Coulomb's Law** | Force between point charges: F = k·q₁q₂/r² — attraction and repulsion. Same structure as gravity but with sign. | — |
| 15.2 | **Electric Field** | Field-line visualisation for one, two, or more charges. Arrows proportional to intensity. | **Field** E⃗ = F⃗/q — "force per unit charge". |
| 15.3 | **Electric Potential** | Colour heatmap of potential V; equipotential surfaces perpendicular to field lines. | **Gradient** E⃗ = −∇V. |
| 15.4 | **Motion of Charges in a Uniform Field** | Charged particle between capacitor plates: parabolic trajectory (analogous to projectile motion). | — |
| 15.5 | **Capacitor and Energy Storage** | Two parallel plates: uniform field, capacitance C = ε₀A/d, energy U = ½CV². | — |

---

## 16. Magnetism & Electromagnetic Induction — Charges in Motion

| # | Topic | Description | Math JIT |
|---|-------|-------------|----------|
| 16.1 | **Lorentz Force** | Charge moving in a magnetic field: F⃗ = qv⃗ × B⃗. Circular or helical trajectory. | Reuse of **cross product** (ch. 9.2). |
| 16.2 | **Cyclotron** | Particle accelerating in a uniform B-field with synchronised electric pulses. | — |
| 16.3 | **Magnetic Field from Currents** | Field lines around a straight wire (Biot-Savart) and inside a solenoid. | **Biot-Savart Law** dB⃗ = (μ₀/4π)·I·dl⃗×r̂/r². |
| 16.4 | **Faraday's Induction** | Magnet entering a coil: induced EMF proportional to the rate of change of flux. | **Faraday's Law** ε = −dΦ_B/dt. |
| 16.5 | **Electromagnetic Waves (overview)** | Orthogonal E and B fields propagating — qualitative animation; bridge to optics. | — |

---

# Part VI — Optics

## 17. Geometric Optics — Rays of Light

| # | Topic | Description | Math JIT |
|---|-------|-------------|----------|
| 17.1 | **Reflection** | Plane and spherical mirrors (concave/convex): law of reflection θ_i = θ_r and image construction. | — |
| 17.2 | **Refraction & Snell's Law** | Ray crossing the interface between two media: deviation proportional to refractive indices. | **Snell's Law** n₁ sin θ₁ = n₂ sin θ₂. |
| 17.3 | **Total Internal Reflection** | Critical angle: beyond which light cannot escape the denser medium — optical fibre. | — |
| 17.4 | **Thin Lenses** | Converging and diverging lenses: graphical image construction with parallel, central, and focal rays. | **Lens equation** 1/f = 1/d_o + 1/d_i. |
| 17.5 | **Dispersion and Prisms** | White light decomposed into colours: refractive index depends on wavelength. | — |

---

# Part VII — Special Relativity

## 18. Einstein's Special Relativity — When Speed Approaches Light

| # | Topic | Description | Math JIT |
|---|-------|-------------|----------|
| 18.1 | **Postulates of Special Relativity** | The speed of light is invariant in all inertial frames; no preferred reference frame exists. Contrast with Galilean relativity (ch. 1.7). | — |
| 18.2 | **Time Dilation** | Light-clock thought experiment: a moving clock ticks slower. Interactive twin-paradox visualisation. | **Lorentz factor** γ = 1/√(1 − v²/c²). |
| 18.3 | **Length Contraction** | A moving rod appears shorter in the direction of motion. Animated comparison at different fractions of c. | — |
| 18.4 | **Lorentz Transformations** | The correct coordinate transformations replacing Galileo's: x' = γ(x − vt), t' = γ(t − vx/c²). | **Lorentz transforms** vs. Galilean (ch. 1.7). |
| 18.5 | **Relativistic Momentum & E = mc²** | Mass-energy equivalence. Kinetic energy diverges as v → c; nothing with mass can reach light speed. | **E² = (pc)² + (mc²)**². |

---

# Part VIII — Nuclear Physics

## 19. Nuclear Structure & Radioactivity — The Heart of the Atom

| # | Topic | Description | Math JIT |
|---|-------|-------------|----------|
| 19.1 | **Nuclear Structure** | Protons, neutrons, strong force, and binding energy. Visual representation of nuclides. | — |
| 19.2 | **Radioactive Decay (α, β, γ)** | Monte Carlo simulation: each nucleus has a probability of decaying per time step. Stochastic process visualised in real time. | **Exponential decay** N(t) = N₀·e^(−λt). |
| 19.3 | **Half-Life** | Interactive graph showing the decay curve; slider for λ. Demonstrate that half-life is independent of the initial sample size. | **t½ = ln2 / λ**. |
| 19.4 | **Nuclear Fission & Chain Reaction** | Neutron hits a heavy nucleus → splits + more neutrons → cascade. Visual simulation of critical mass concept. | — |
| 19.5 | **Nuclear Fusion** | Two light nuclei merging under extreme conditions; energy released from mass deficit. Animated energy balance. | **Mass deficit** Δm → ΔE = Δm·c². |

---

# Part IX — Quantum Mechanics (Visual Introduction)

## 20. Quantum Mechanics — Probability Replaces Certainty

| # | Topic | Description | Math JIT |
|---|-------|-------------|----------|
| 20.1 | **Double-Slit Experiment** | Particles fired one at a time build up an interference pattern — wave-particle duality visualised. | — |
| 20.2 | **Wave Function & Probability Density** | Animated |ψ(x)|² for a particle in a box; probability of finding the particle in a region. | **Schrödinger equation** (1D, time-independent, qualitative). |
| 20.3 | **Heisenberg Uncertainty Principle** | Interactive demo: narrowing Δx widens Δp and vice versa. Gaussian wave-packet spreading over time. | **ΔxΔp ≥ ħ/2**. |
| 20.4 | **Quantum Tunnelling** | Particle approaching a potential barrier with E < V₀ — non-zero probability of appearing on the other side. Contrast with classical CCD (ch. 7.3). | **Transmission coefficient** T ∝ e^(−2κd). |
| 20.5 | **Energy Quantisation** | Discrete energy levels in a potential well; only specific wavelengths "fit" — standing-wave analogy (ch. 14.4). | **Eₙ = n²π²ħ² / (2mL²)**. |

---

*Total planned simulations: **69 topics** across 20 chapters grouped in 9 parts.*
