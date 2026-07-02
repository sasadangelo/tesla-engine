---
layout: theory
title: "Free Fall Theory"
sim_url: /free-fall.html
permalink: /free-fall-theory/
---

# 🍎 Free Fall
{: .section-heading }

**Free fall** is the motion of any object subject only to the force of gravity, with no
other forces acting on it (in particular, no air resistance). Under these ideal conditions
a remarkable thing happens: **every object falls with exactly the same acceleration,
regardless of its mass**.

This result, which contradicts everyday intuition, was first stated rigorously by
**Galileo Galilei** around 1604 and later explained by **Newton's Second Law** combined
with his **Law of Universal Gravitation**.
{: .theory-section }

---

## 📐 The Experimental Result (Galileo, ~1604)
{: .section-heading }

**Galileo Galilei** was the first to challenge the ancient idea that heavier objects fall
faster. Through careful experiments — rolling balls down inclined planes and timing their
descent — he established a single, universal fact:

> *All objects, regardless of their mass, fall with the same constant acceleration.*

That acceleration is called **g**, and near Earth's surface its value is:

\\[g \approx 9.81 \, \text{m/s}^2\\]
{: .formula-large }

This is a **kinematic constant**: you can use it directly in the equations of motion,
exactly as you used constant acceleration in Uniformly Accelerated Motion (UAM).
The *reason* why mass cancels out — the deeper explanation involving forces — will be
covered in **Chapter 2: Newton's Second Law** (\\(F = m \cdot a\\)).
{: .theory-section }

---

## 📊 Kinematic Equations of Free Fall
{: .section-heading }

Starting from rest (\\(v_0 = 0\\)), taking downward as positive:

### Velocity as a function of time

\\[v(t) = g \cdot t\\]
{: .formula-large }

### Position (distance fallen) as a function of time

\\[y(t) = \tfrac{1}{2} g t^2\\]
{: .formula-large }

### Time to fall a height h

\\[t = \sqrt{\frac{2h}{g}}\\]
{: .formula-large }

### Velocity reached after falling a height h

\\[v = \sqrt{2 g h}\\]
{: .formula-large }

**Example:** Falling 100 m on Earth (g = 9.81 m/s²):

- Time: t = √(200 / 9.81) ≈ 4.52 s
- Final speed: v = √(2 × 9.81 × 100) ≈ 44.3 m/s ≈ 159 km/h
{: .theory-section }

---

## 💨 The Role of Air Resistance
{: .section-heading }

In reality, any object moving through a fluid (air, water) experiences a **drag force**
that opposes its motion. The linear drag model gives:

\\[F_{\text{drag}} = -b \cdot v\\]
{: .formula-large }

Where **b** depends on the properties of the **fluid** (density, viscosity) **and** the
shape of the object (cross-sectional area, drag coefficient \\(C_d\\)):

\\[b = \rho \cdot C_d \cdot A\\]
{: .formula-large }

The net downward force on a falling body with air resistance is:

\\[F_{\text{net}} = m \cdot g - b \cdot v\\]
{: .formula-large }

Applying Newton's Second Law:

\\[a = g - \frac{b}{m} \cdot v\\]
{: .formula-large }

This is why a **feather** (large Cd·A, tiny m) decelerates quickly while a **lead ball**
(small Cd·A relative to m) barely feels the drag.

### Terminal Velocity

When drag equals gravity the acceleration reaches zero and the body falls at constant speed:

\\[F_{\text{net}} = 0 \implies m \cdot g = b \cdot v_t \implies v_t = \frac{m \cdot g}{b}\\]
{: .formula-large }

A heavier or more aerodynamic object has a higher terminal velocity; a lighter or less
aerodynamic one has a lower terminal velocity.
{: .theory-section }

---

## 🌍 Gravity on Other Worlds
{: .section-heading }

The acceleration of free fall depends on the planet:

| Body | g (m/s²) | Fall time from 100 m (vacuum) |
|------|----------|-------------------------------|
| Earth | 9.81 | 4.52 s |
| Mars | 3.72 | 7.33 s |
| Jupiter | 24.79 | 2.84 s |
| Deep Space | 0 | ∞ (no fall) |

In every case, with no air, **two objects of different masses land at the same time**.
{: .theory-section }

---

## 💡 Key Takeaways
{: .section-heading }

**1. Mass does not affect free fall** — the acceleration is always g, independent of mass.

**2. Air resistance does affect fall** — but it depends on the fluid and the object's shape, not its weight.

**3. The feather vs. lead ball experiment** — in a vacuum they fall identically. The difference we see in everyday life is entirely due to air resistance.

**4. Terminal velocity** — the equilibrium speed where gravity and drag balance. A skydiver in a spread-eagle position reaches ~55 m/s; feet-first ~90 m/s.

**5. g varies by planet** — gravity changes where you fall, not whether mass matters.
{: .theory-section }

---

## Ready to Experiment?
{: .section-heading }

Drop a lead ball and a feather together. Switch between vacuum and air, change gravity, and
see Galileo's result with your own eyes.

[▶️ Launch Free Fall Simulation]({{ '/free-fall.html' | relative_url }}){: .btn .btn-primary .btn-large }
{: .cta-section }
