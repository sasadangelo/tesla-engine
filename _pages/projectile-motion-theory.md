---
layout: theory
title: "Projectile Motion"
sim_url: /projectile-motion.html
permalink: /projectile-motion-theory/
---

# 📖 Projectile Motion
{: .section-heading }

**Projectile motion** is a form of motion experienced by an object that is projected into the air and moves under the influence of gravity. The path followed by a projectile is called its **trajectory**, which is a parabolic curve in the absence of air resistance.

When an object is launched at an angle \\(\theta\\) with an initial velocity \\(v_0\\), it follows a curved path. The motion can be analyzed by breaking it into two independent components:

- **Horizontal motion:** Uniform motion (constant velocity)
- **Vertical motion:** Uniformly accelerated motion (due to gravity)
{: .theory-section }

---

## 📐 Key Formulas
{: .section-heading }

### Initial Velocity Components

\\[v_{0x} = v_0 \cdot \cos(\theta)\\]
{: .formula }

\\[v_{0y} = v_0 \cdot \sin(\theta)\\]
{: .formula }

Where \\(v_0\\) is the initial velocity and \\(\theta\\) is the launch angle.
{: .formula-description }

> 🧩 **Confused by Sine and Cosine?**
> If you don't understand where these formulas come from, check out our quick [Math JIT: The Shadow Analogy]({{ '/projectile-motion-math-jit/' | relative_url }}) to visualize how vectors are split using shadows.
{: .math-jit-box }


### Position Equations

\\[x(t) = v_{0x} \cdot t = v_0 \cdot \cos(\theta) \cdot t\\]
{: .formula }

\\[y(t) = v_{0y} \cdot t - \tfrac{1}{2} g t^2 = v_0 \cdot \sin(\theta) \cdot t - \tfrac{1}{2} g t^2\\]
{: .formula }

Where \\(g = 9.81 \, \text{m/s}^2\\) is the acceleration due to gravity.
{: .formula-description }

### Velocity Equations

\\[v_x(t) = v_{0x} = v_0 \cdot \cos(\theta)\\]
{: .formula }

\\[v_y(t) = v_{0y} - g \cdot t = v_0 \cdot \sin(\theta) - g \cdot t\\]
{: .formula }

### Important Parameters

**Time of Flight:**
\\[T = \frac{2 \, v_0 \cdot \sin(\theta)}{g}\\]
{: .formula }

**Maximum Height:**
\\[H = \frac{v_0^2 \cdot \sin^2(\theta)}{2g}\\]
{: .formula }

**Range:**
\\[R = \frac{v_0^2 \cdot \sin(2\theta)}{g}\\]
{: .formula }

The maximum range is achieved at \\(\theta = 45°\\).
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

## 📝 Practice Exercises
{: .section-heading }

Ready to put these formulas to work? Solve 20 problems of increasing difficulty, from ⭐ warm-ups to ⭐⭐⭐⭐⭐ expert challenges — with full worked solutions available afterward.
{: .theory-section }

[Go to Exercises →]({{ '/projectile-motion-exercises/' | relative_url }}){: .btn .btn-primary }
{: .action-buttons }

---

[← Back to Home]({{ '/' | relative_url }}){: .btn .btn-secondary }
[Launch Simulation →]({{ '/projectile-motion.html' | relative_url }}){: .btn .btn-primary }
{: .action-buttons }
