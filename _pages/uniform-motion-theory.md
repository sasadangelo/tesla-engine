---
layout: theory
title: "Uniform Motion Theory"
sim_url: /uniform-motion.html
permalink: /uniform-motion-theory/
---

# 🎯 What is Uniform Motion?
{: .section-heading }

**Uniform motion** (or uniform rectilinear motion) occurs when an object moves along a straight line at a constant velocity. This means:

- The speed remains constant over time
- The direction of motion doesn't change
- There is no acceleration (a = 0)
- Equal distances are covered in equal time intervals

This is the simplest type of motion in physics and serves as a fundamental model for studying more complex motions.
{: .theory-section }

---

## 📐 Mathematical Formulas
{: .section-heading }

### Velocity

Velocity is the distance (displacement) traveled per unit time.

v = S / t = constant

In terms of initial and final position and time:

\\[v = \frac{x_f - x_0}{t_f - t_0} = \frac{\Delta x}{\Delta t} = \text{constant}\\]
{: .formula-large }

Where:

* x₀ = initial position at time t₀
* \\(x_f\\) = final position at time \\(t_f\\)
* \\(\Delta x = x_f - x_0\\) = displacement
* \\(\Delta t = t_f - t_0\\) = time interval

In uniform motion, \\(\Delta x / \Delta t\\) is the same for any interval: the velocity is constant.

### Position as a Function of Time

For an object moving with constant velocity v, the position at any time t is

\\[x(t) = x_0 + v \cdot (t - t_0)\\]
{: .formula-large }

Where:

- **x(t)** = position at time t
- **x₀** = initial position (at t = 0)
- **v** = constant velocity
- **t** = time elapsed

<div class="graph-container">
  <img src="{{ '/assets/img/uniform-motion-graph.svg' | relative_url }}" alt="Position vs time graph: straight line showing x(t) = x₀ + v·t" style="width:100%;max-width:520px;display:block;margin:0 auto;">
</div>

The graph above shows **position x as a function of time t** for uniform motion:

- The line is **straight** — velocity is constant
- The **slope** of the line equals the velocity (v)
- A steeper slope means higher velocity
- The **y-intercept** is the initial position (x₀)
- Positive slope → motion in positive direction; negative slope → negative direction

### Acceleration

a = 0
{: .formula-large }

Since velocity is constant, there is no change in velocity over time, which means acceleration is zero.

### Reverse Formula

Starting from the definition of velocity:

\\[v = \frac{\Delta x}{\Delta t}\\]
{: .formula-large }

we can derive the inverse relations depending on the unknown quantity.

#### ⏱ Time (\\(\Delta t\\))

Solving for time:

\\[\Delta t = \frac{\Delta x}{v}\\]
{: .formula-large }

or in expanded form:

\\[t_f = \frac{x_f - x_0}{v} + t_0\\]
{: .formula-large }

👉 Interpretation:
The time required to cover a distance increases with displacement and decreases with velocity.

#### 📏 Distance (\\(\Delta x\\))

Solving for displacement:

\\[\Delta x = v \cdot \Delta t\\]
{: .formula-large }

or:

\\[x_f = x_0 + v \cdot \Delta t\\]
{: .formula-large }

👉 Interpretation:
In uniform motion, displacement grows linearly with time.

---


## 🔬 Real-World Applications
{: .section-heading }

- **Highway Driving:** Cruise control maintains constant speed
- **Conveyor Belts:** Move at constant velocity in factories
- **Escalators:** Constant speed vertical/inclined motion
- **Trains:** Between stations, trains often maintain constant speed
- **Satellites:** In stable orbits, maintain constant orbital velocity
{: .theory-section }

---

## 💡 Key Takeaways
{: .section-heading }

**1. Constant Velocity** — The defining characteristic of uniform motion is constant velocity (no acceleration)

**2. Linear Relationship** — Position changes linearly with time: x = x₀ + v·t

**3. Predictable Motion** — Future position can be calculated exactly at any time

**4. Foundation Concept** — Understanding uniform motion is essential for studying accelerated motion
{: .theory-section }

---

## Ready to Experiment?
{: .section-heading }

Now that you understand the theory, try the interactive simulation to see uniform motion in action!

[▶️ Launch Speed Race Simulation]({{ '/uniform-motion.html' | relative_url }}){: .btn .btn-primary .btn-large }
{: .cta-section }
