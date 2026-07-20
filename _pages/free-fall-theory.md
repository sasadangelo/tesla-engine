---
layout: theory
title: "Free Fall Theory"
sim_url: /kinematics/free-fall.html
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

## 🌐 Does g Really Stay Constant?
{: .section-heading }

Strictly speaking, gravity weakens slightly as you move away from Earth's centre —
a consequence of Newton's Law of Universal Gravitation, where gravitational attraction is
**inversely proportional to the square of the distance**. In practice, however, the change
is tiny for heights we normally deal with:

| Location | Altitude | g (m/s²) |
|----------|----------|-----------|
| Sea level | 0 km | 9.81 |
| Mount Everest summit | ~9 km | ~9.78 |
| ISS orbit | ~400 km | ~8.7 |

Even at 400 km altitude the ISS still experiences about **90 % of surface gravity**.
Astronauts feel weightless not because gravity is absent, but because the station is in a
constant state of **free fall** around Earth (orbital motion).

Near the surface, the variation is negligible, so we safely treat \\(g = 9.81 \, \text{m/s}^2\\) as constant.
{: .theory-section }

---

## 📊 Kinematic Equations of Free Fall
{: .section-heading }

Free fall is a **[uniformly accelerated motion]({{ '/uniformly-accelerated-motion-theory/' | relative_url }})**, so both velocity and position obey the
general UAM equations (with \\(t_0 = 0\\)):

\\[v(t) = v_0 + a \cdot t\\]
{: .formula-large }

\\[y(t) = y_0 + v_0 \cdot t + \tfrac{1}{2} a \cdot t^2\\]
{: .formula-large }

Substituting the free-fall conditions — initial position \\(y_0 = 0\\), initial velocity
\\(v_0 = 0\\), and acceleration \\(a = g\\) — we obtain the simplified equations below
(taking downward as positive).

### Velocity as a function of time

\\[v(t) = g \cdot t\\]
{: .formula-large }

### Position (distance fallen) as a function of time

\\[y(t) = \tfrac{1}{2} g t^2\\]
{: .formula-large }

### Reverse Formulas

#### Time to fall a height h

Solving \\(h = \tfrac{1}{2} g t^2\\) for \\(t\\):

\\[t = \sqrt{\frac{2h}{g}}\\]
{: .formula-large }

#### Velocity reached after falling a height h

Combining the two kinematic equations to eliminate \\(t\\):

\\[v = \sqrt{2 g h}\\]
{: .formula-large }

👉 **Example:** Falling 100 m on Earth (g = 9.81 m/s²):

- Time: \\(t = \sqrt{200 / 9.81} \approx 4.52\text{ s}\\)
- Final speed: \\(v = \sqrt{2 \times 9.81 \times 100} \approx 44.3\text{ m/s} \approx 159\text{ km/h}\\)
{: .theory-section }

---

## 💨 The Role of Air Resistance
{: .section-heading }

Galileo's result — all objects fall at the same rate — holds perfectly in a **vacuum**.
In everyday life, however, we are surrounded by air, and air pushes back against any
falling object. This is why a feather floats gently down while a stone drops like, well,
a stone.

That everyday experience is actually **misleading**: it is not the *mass* that makes the
stone fall faster, it is the **shape and size** of the object relative to its mass. A
crumpled sheet of paper falls noticeably faster than a flat one of identical mass,
purely because of its smaller surface catching air.

In a vacuum the illusion vanishes: a feather and a lead ball released together hit the
ground at exactly the same moment — exactly as Galileo claimed. This was famously
demonstrated on the Moon by Apollo 15 astronaut David Scott in 1971, and you can
reproduce it yourself in the simulation by setting air resistance to zero.

> 💡 The mathematical treatment of drag forces (drag coefficient, terminal velocity)
> will be covered in a later chapter on **Newton's Laws**.
{: .theory-section }

---

## 🌍 Gravity on Other Planets or Deep Space
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

[▶️ Launch Free Fall Simulation]({{ '/kinematics/free-fall.html' | relative_url }}){: .btn .btn-primary .btn-large }
{: .cta-section }
