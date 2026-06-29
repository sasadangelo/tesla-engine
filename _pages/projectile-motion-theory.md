---
layout: theory
title: "Projectile Motion"
sim_url: /projectile-motion.html
permalink: /projectile-motion-theory/
---

# 📖 Projectile Motion
{: .section-heading }

**Projectile motion** is a form of motion experienced by an object that is projected into the air and moves under the influence of gravity. The path followed by a projectile is called its **trajectory**, which is a parabolic curve in the absence of air resistance.

When an object is launched at an angle θ with an initial velocity v₀, it follows a curved path. The motion can be analyzed by breaking it into two independent components:

- **Horizontal motion:** Uniform motion (constant velocity)
- **Vertical motion:** Uniformly accelerated motion (due to gravity)
{: .theory-section }

---

## 📐 Key Formulas
{: .section-heading }

### Initial Velocity Components

v₀ₓ = v₀ · cos(θ)
{: .formula }

v₀ᵧ = v₀ · sin(θ)
{: .formula }

Where v₀ is the initial velocity and θ is the launch angle.
{: .formula-description }

### Position Equations

x(t) = v₀ₓ · t = v₀ · cos(θ) · t
{: .formula }

y(t) = v₀ᵧ · t - ½ · g · t² = v₀ · sin(θ) · t - ½ · g · t²
{: .formula }

Where g = 9.81 m/s² is the acceleration due to gravity.
{: .formula-description }

### Velocity Equations

vₓ(t) = v₀ₓ = v₀ · cos(θ)
{: .formula }

vᵧ(t) = v₀ᵧ - g · t = v₀ · sin(θ) - g · t
{: .formula }

### Important Parameters

**Time of Flight:** T = (2 · v₀ · sin(θ)) / g
{: .formula }

**Maximum Height:** H = (v₀² · sin²(θ)) / (2 · g)
{: .formula }

**Range:** R = (v₀² · sin(2θ)) / g
{: .formula }

The maximum range is achieved at θ = 45°.
{: .formula-description }
{: .theory-section }

---

## 🔬 Physics Insights
{: .section-heading }

### Why is the trajectory parabolic?

The horizontal velocity remains constant (no air resistance), while the vertical velocity changes linearly due to constant gravitational acceleration. This combination produces a parabolic path.

### What affects the range?

The range depends on both the initial velocity and the launch angle. For a given velocity, the maximum range occurs at 45°. Angles above or below 45° result in shorter ranges.

### Real-world applications

Projectile motion principles are used in sports (basketball, golf), military applications (ballistics), space exploration (rocket trajectories), and many engineering fields.
{: .theory-section }

---

[← Back to Home]({{ '/' | relative_url }}){: .btn .btn-secondary }
[Launch Simulation →]({{ '/projectile-motion.html' | relative_url }}){: .btn .btn-primary }
{: .action-buttons }
