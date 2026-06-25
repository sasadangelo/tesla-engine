# 🗺️ Tesla Engine — Roadmap

> A structured journey through Physics, Mathematics, and Code.
> Each topic builds on the previous one, introducing the **Just-in-Time math** needed to implement the simulation.

---

## 1. Kinematics — The Geometry of Motion

| # | Topic | Description | Math JIT |
|---|-------|-------------|----------|
| 1.1 | ~~**Uniform Rectilinear Motion (URM)**~~ | ~~Displacement at constant velocity.~~ | Introduction to **Vectors** (magnitude, direction, sense). |
| 1.2 | **Uniformly Accelerated Motion (UAM)** | Introduction of constant acceleration. | **Derivatives and Integrals** — how acceleration generates velocity, and velocity generates position over time. |
| 1.3 | **Free Fall** | First encounter with Earth's gravitational field (g ≈ 9.81 m/s²). | — |
| 1.4 | ~~**Projectile Motion (Parabolic)**~~ | ~~Two-dimensional integration of URM + free fall.~~ | **Basic Trigonometry** — sine and cosine to decompose the initial velocity vector into X and Y Cartesian components. |
| 1.5 | **Simple Harmonic Motion (SHM)** | Pure sinusoidal oscillation — the kinematic bridge before springs. | — |

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

*Total planned simulations: **23 topics** across 9 chapters.*
