---
layout: theory
title: "Uniformly Accelerated Motion Theory"
sim_url: /uniformly-accelerated-motion.html
permalink: /uniformly-accelerated-motion-theory/
---

# 🎯 What is Uniformly Accelerated Motion?
{: .section-heading }

**Uniformly accelerated motion** (or uniformly accelerated rectilinear motion) occurs when an object moves along a straight line with a constant acceleration. This means:

- The velocity increases (or decreases) at a constant rate
- The acceleration is constant and non-zero: a = const
- The object starts from rest (\\(v_0 = 0\\)) in the classic case
- Distances covered in successive equal time intervals grow linearly
{: .theory-section }

---

## 📐 Mathematical Formulas
{: .section-heading }

### Velocity as a Function of Time

\\[v(t) = v_0 + a \cdot t\\]
{: .formula-large }

Where:

- **v(t)** = velocity at time t
- **v₀** = initial velocity (= 0 when starting from rest)
- **a** = constant acceleration
- **t** = time elapsed

### Position as a Function of Time

\\[x(t) = x_0 + v_0 \cdot t + \tfrac{1}{2} a t^2\\]
{: .formula-large }

When starting from rest (\\(v_0 = 0\\)):

\\[x(t) = x_0 + \tfrac{1}{2} a t^2\\]
{: .formula-large }

### Velocity-Position Relation (no time needed)

\\[v^2 = v_0^2 + 2 \cdot a \cdot (x - x_0)\\]
{: .formula-large }

### Time to Cover a Distance (from rest)

\\[t = \sqrt{\frac{2 \, \Delta x}{a}}\\]
{: .formula-large }

Derived by solving \\(x = \tfrac{1}{2} a t^2\\) for t.
{: .theory-section }

---

## 📊 Position-Time and Velocity-Time Graphs
{: .section-heading }

In uniformly accelerated motion (from rest):

- The **position-time graph** is a **parabola** (x ∝ t²)
- The **velocity-time graph** is a **straight line** with slope = a
- A steeper parabola means higher acceleration
- The area under the velocity-time graph equals the displacement

\\[\text{slope of v-t graph} = \frac{\Delta v}{\Delta t} = a\\]
{: .formula }
{: .theory-section }

---

## 🔬 Real-World Applications
{: .section-heading }

- **Cars accelerating** from a traffic light: constant engine force → nearly constant acceleration
- **Free fall:** objects falling under gravity (a = g = 9.81 m/s²)
- **Rocket launch:** initial phase with roughly constant thrust
- **Roller coasters:** acceleration on downhill sections
- **Athletes sprinting** from the starting blocks
{: .theory-section }

---

## 💡 Key Takeaways
{: .section-heading }

**1. Constant Acceleration** — velocity changes at a fixed rate; the defining property of this motion

**2. Quadratic Position** — position grows as t², so the vehicle covers more ground each second

**3. Predictable Motion** — all quantities (position, velocity) can be calculated exactly at any time

**4. Builds on Uniform Motion** — when a = 0 the equations reduce to uniform motion (\\(x = x_0 + v \cdot t\\))
{: .theory-section }

---

## Ready to Experiment?
{: .section-heading }

Now that you understand the theory, try the interactive simulation to see uniformly accelerated motion in action!

[▶️ Launch Acceleration Race Simulation]({{ '/uniformly-accelerated-motion.html' | relative_url }}){: .btn .btn-primary .btn-large }
{: .cta-section }
