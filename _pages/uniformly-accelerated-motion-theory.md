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

### Acceleration

Acceleration is the change in velocity per unit time.

\\[a = \frac{v}{t} = constant\\]

In terms of initial and final position and time:

\\[v = \frac{v_f - v_0}{t_f - t_0} = \frac{\Delta v}{\Delta t} = \text{constant}\\]
{: .formula-large }

Where:

* v₀ = initial velocity at time t₀
* \\(v_f\\) = final velocity at time \\(t_f\\)
* \\(\Delta v = v_f - v_0\\) = velocity change
* \\(\Delta t = t_f - t_0\\) = time interval

In uniform accelerated motion, \\(\Delta v / \Delta t\\) is the same for any equal interval: the acceleration is constant.

### Velocity as a Function of Time

For an object moving with constant acceleration a, the velocity at any time t is

\\[v(t) = v_0 + a \cdot (t - t_0)\\]
{: .formula-large }

Where:

- **v(t)** = velocity at time t
- **v₀** = initial velocity at time  t₀ (= 0 when starting from rest)
- **a** = constant acceleration
- **t** = time elapsed

<div class="graph-container">
  <img src="{{ '/assets/img/uniformly-accelerated-motion-v-graph.svg' | relative_url }}" alt="Velocity vs time graph for uniformly accelerated motion" style="width:100%;max-width:520px;display:block;margin:0 auto;">
</div>

The graph above shows **velocity v as a function of time t** for uniformly accelerated motion:

- The line is **straight** — acceleration is constant
- The **slope** of the line equals the acceleration (a)
- A steeper slope means higher acceleration
- The **y-intercept** is the initial velocity (v₀)
- Positive slope → motion in positive direction; negative slope → negative direction

### Position as a Function of Time

For an object moving with constant acceleration a, the position at any time t is

\\[x(t) = x_0 + v_0 \cdot (t - t_0) + \tfrac{1}{2} a (t - t_0)^2\\]
{: .formula-large }

When starting from rest (\\(v_0 = 0\\)):

\\[x(t) = x_0 + \tfrac{1}{2} a t^2\\]
{: .formula-large }

<div class="graph-container">
  <img src="{{ '/assets/img/uniformly-accelerated-motion-x-graph.svg' | relative_url }}" alt="Position vs time graph for uniformly accelerated motion" style="width:100%;max-width:520px;display:block;margin:0 auto;">
</div>

The graph above shows **position x as a function of time t** for uniformly accelerated motion:

- The curve is a **parabola** — position grows as t²
- The **slope at any point** equals the instantaneous velocity v(t)
- A steeper curve means higher acceleration
- The **y-intercept** is the initial position (x₀)
- When v₀ = 0 the parabola starts flat (tangent horizontal at t₀)

---

> 💡 **Geometric interpretation via the velocity-time graph:**
> Looking at the v-t graph, the displacement \\(x(t) - x_0\\) equals the **area under the straight line** between \\(t_0\\) and \\(t\\).
> That area is made up of two parts:
> - a **rectangle** of width \\((t - t_0)\\) and height \\(v_0\\), contributing \\(v_0 \cdot (t - t_0)\\)
> - a **triangle** of base \\((t - t_0)\\) and height \\(a \cdot (t - t_0)\\), contributing \\(\tfrac{1}{2} \cdot a \cdot (t - t_0)^2\\)
>
> Adding both areas gives exactly \\(x(t) - x_0 = v_0 \cdot (t-t_0) + \tfrac{1}{2} a (t-t_0)^2\\).

### Reverse Formula

#### Velocity-Position Relation (no time needed)

When time is not known, the velocity reached after covering a distance \\(x - x_0\\) starting from \\(v_0\\) with acceleration \\(a\\) is:

\\[v^2 = v_0^2 + 2 \cdot a \cdot (x - x_0)\\]
{: .formula-large }

👉 Example: if a car accelerates at \\(3\text{ m/s}^2\\) over \\(100\text{ m}\\) starting from rest, its final speed is \\(v = \sqrt{2 \cdot 3 \cdot 100} \approx 24.5\text{ m/s}\\).

#### Time to Cover a Distance (from rest)

The time needed to cover a distance \\(\Delta x\\) starting from rest under constant acceleration a is:

\\[t = \sqrt{\frac{2 \, \Delta x}{a}}\\]
{: .formula-large }

👉 Derived by solving \\(x = \tfrac{1}{2} a t^2\\) for t.
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
