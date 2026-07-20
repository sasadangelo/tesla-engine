---
layout: theory
title: "Uniform Circular Motion Theory"
sim_url: /kinematics/uniform-circular-motion.html
permalink: /uniform-circular-motion-theory/
---

# 🔄 What is Uniform Circular Motion?
{: .section-heading }

**Uniform circular motion (UCM)** occurs when an object travels along a circular path at **constant speed**. The speed never changes, but the *direction* of motion changes continuously — and a change in direction is a change in velocity, which means the object is constantly accelerating, even though it never speeds up or slows down.

- The path is a circle of radius r
- The speed (magnitude of velocity) is constant
- The direction of velocity is always tangent to the circle
- There is a non-zero acceleration, always pointing toward the center
{: .theory-section }

---

## 📐 Mathematical Formulas
{: .section-heading }

### Angular Velocity

Instead of tracking position with a linear coordinate, it's natural to track the **angle** θ swept by the radius. The angular velocity ω is how fast that angle changes:

\\[\omega = \frac{\Delta \theta}{\Delta t} = \text{constant}\\]
{: .formula-large }

Where:

* θ = angular position, measured in **radians**
* ω = angular velocity, in radians per second (rad/s)

> 🧩 **What's a radian?**
> If degrees feel more natural than radians, check out our [Math JIT: Degrees vs. Radians]({{ '/uniform-circular-motion-math-jit/' | relative_url }}) — it explains why physics always uses radians for angular quantities.
{: .math-jit-box }

### Position as a Function of Time

Placing the circle's center at the origin, the position of the moving body at time t is:

\\[x(t) = r \cdot \cos(\theta_0 + \omega t)\\]
{: .formula }

\\[y(t) = r \cdot \sin(\theta_0 + \omega t)\\]
{: .formula }

Where:

- **r** = radius of the circular path
- **θ₀** = initial angle at t = 0
- **ω** = constant angular velocity

### Linear Speed

The relationship between angular velocity and ordinary (tangential) speed is:

\\[v = \omega \cdot r\\]
{: .formula-large }

The larger the radius, the faster a point must move to sweep the same angle in the same time — that's why the outer seats of a carousel feel faster than the inner ones, even though everyone shares the same ω.
{: .formula-description }

### Period and Frequency

The **period** T is the time needed for one full revolution (θ sweeps 2π radians):

\\[T = \frac{2\pi}{\omega}\\]
{: .formula }

The **frequency** f is the number of revolutions per second, the reciprocal of the period:

\\[f = \frac{1}{T} = \frac{\omega}{2\pi} \quad \text{(measured in Hz)}\\]
{: .formula }

### Centripetal Acceleration

Even though speed is constant, velocity is not — its direction keeps changing. That change requires an acceleration directed toward the center of the circle, called **centripetal acceleration**:

\\[a_c = \omega^2 \cdot r = \frac{v^2}{r}\\]
{: .formula-large }

The centripetal acceleration vector is always perpendicular to the velocity vector, and always points from the body toward the center — never forward, never backward, only sideways relative to the motion.
{: .formula-description }
{: .theory-section }

---

## 🔬 Physics Insights
{: .section-heading }

### Why is there acceleration if the speed is constant?

Acceleration is the rate of change of the **velocity vector**, not just its magnitude. In UCM the speed |v| never changes, but the direction of v changes every instant. A vector whose direction changes is a vector that changes — so a_c ≠ 0, even though |v| is constant.

### Why does the acceleration point toward the center?

Picture the velocity vector at two nearby instants: both have the same length but point in slightly different directions. Their difference — the change in velocity — points inward, toward the center of the circle. As the time interval shrinks to zero, this difference becomes exactly radial, i.e. centripetal ("center-seeking").

### Radians make the formulas clean

Because v = ωr and a_c = ω²r only work out to correct SI values when ω is expressed in **radians per second**, not degrees per second. Radians are the "natural" angular unit precisely because they make arc length, velocity, and acceleration relate to angle through simple multiplication, with no extra conversion factor.
{: .theory-section }

---

## 🔬 Real-World Applications
{: .section-heading }

- **Wheels and Gears:** Every point on a rotating wheel undergoes UCM around the axle
- **Satellites:** Objects in circular orbit move at (approximately) constant speed around the Earth
- **Centrifuges:** Spin samples at high ω to produce large centripetal acceleration for separation
- **Carousels and Ferris Wheels:** Classic everyday examples of constant-speed circular motion
- **Clock Hands:** The tip of a clock's second hand traces a circle with T = 60 s
{: .theory-section }

---

## 💡 Key Takeaways
{: .section-heading }

**1. Constant Speed, Changing Velocity** — UCM has |v| = constant, but the direction of v changes continuously

**2. Angular Velocity** — ω = Δθ/Δt (rad/s) describes how fast the angle is swept; it's the circular analog of linear velocity

**3. Linear Speed from ω** — v = ωr connects angular and linear descriptions of the same motion

**4. Centripetal Acceleration** — a_c = ω²r = v²/r always points toward the center, and exists precisely because direction is changing

**5. Period and Frequency** — T = 2π/ω is the time for one revolution; f = 1/T counts revolutions per second
{: .theory-section }

---

## 🔍 Understanding Radians

Every formula above assumes ω is in radians per second. If degrees still feel more intuitive than radians, work through the dedicated Math JIT page before moving on — it explains the "why" behind radians using the same visual, step-by-step approach as the rest of PhysicaLab.
{: .theory-section }

[Go to Math JIT: Degrees vs. Radians →]({{ '/uniform-circular-motion-math-jit/' | relative_url }}){: .btn .btn-primary }
{: .action-buttons }

---

## 📝 Practice Exercises
{: .section-heading }

Ready to put these formulas to work? Solve 20 problems of increasing difficulty, from ⭐ warm-ups to ⭐⭐⭐⭐⭐ expert challenges — with full worked solutions available afterward.
{: .theory-section }

[Go to Exercises →]({{ '/uniform-circular-motion-exercises/' | relative_url }}){: .btn .btn-primary }
{: .action-buttons }

---

[← Back to Home]({{ '/' | relative_url }}){: .btn .btn-secondary }
[Launch Simulation →]({{ '/kinematics/uniform-circular-motion.html' | relative_url }}){: .btn .btn-primary }
{: .action-buttons }
