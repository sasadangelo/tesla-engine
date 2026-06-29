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

This is the simplest type of motion in physics and serves as the foundation for understanding more complex motions.
{: .theory-section }

---

## 📐 Mathematical Formulas
{: .section-heading }

### Position as a Function of Time

x(t) = x₀ + v·t
{: .formula-large }

Where:

- **x(t)** = position at time t
- **x₀** = initial position (at t = 0)
- **v** = constant velocity
- **t** = time elapsed

### Velocity

v = Δx / Δt = constant
{: .formula-large }

The velocity is the ratio of displacement (Δx) to time interval (Δt). In uniform motion, this ratio is always constant.

### Acceleration

a = 0
{: .formula-large }

Since velocity is constant, there is no change in velocity over time, which means acceleration is zero.

### Time to Cover a Distance

t = Δx / v
{: .formula-large }

Rearranging the position formula, we can calculate how long it takes to cover a certain distance at a given velocity.
{: .theory-section }

---

## 📊 Position-Time Graph
{: .section-heading }

In uniform motion, the position-time graph is a **straight line**:

- The slope of the line equals the velocity (v)
- A steeper slope means higher velocity
- The y-intercept is the initial position (x₀)
- Positive slope = motion in positive direction
- Negative slope = motion in negative direction

slope = Δx / Δt = v
{: .formula }
{: .theory-section }

---

## 🏁 Speed Race Application
{: .section-heading }

In our simulation, three vehicles race along parallel tracks. Each vehicle moves with uniform motion at a constant velocity that you can set.

### 1. Winner Prediction

The vehicle with the highest velocity will always reach the finish line first, assuming they all start at the same time and position.

If v₁ > v₂ > v₃, then vehicle 1 wins
{: .formula }

### 2. Finish Time Calculation

For a race distance D, each vehicle's finish time is:

t_finish = D / v
{: .formula }

Example: For D = 500m and v = 50 m/s, the finish time is 10 seconds.

### 3. Distance Relationship

At any given time t, the distance between two vehicles is:

Δx = (v₁ - v₂) · t
{: .formula }

The gap grows linearly with time if velocities are different.
{: .theory-section }

---

## 🧪 Practical Examples
{: .section-heading }

### Example 1: Equal Speeds

**Setup:** All three vehicles at v = 40 m/s

**Result:** They all finish at the same time (tie)

**Time:** t = 500m / 40 m/s = 12.5 seconds

### Example 2: Double Speed

**Setup:** Red at 60 m/s, Blue at 30 m/s

**Result:** Red finishes in half the time

**Times:**
- Red: t = 500m / 60 m/s = 8.33 seconds
- Blue: t = 500m / 30 m/s = 16.67 seconds

### Example 3: Overtaking

**Question:** When does Red (v=50 m/s) overtake Blue (v=40 m/s)?

**Answer:** Red is always ahead if they start together! In uniform motion with the same starting position, the faster vehicle is always ahead. There's no "overtaking" — the lead is established immediately.
{: .theory-section }

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
