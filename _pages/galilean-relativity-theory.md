---
layout: theory
title: "Galilean Relativity & Reference Frames"
sim_url: /kinematics/galilean-relativity.html
permalink: /galilean-relativity-theory/
---

# 📖 Galilean Relativity & Reference Frames
{: .section-heading }

**Galilean relativity** is the principle, formulated by Galileo Galilei in the early 17th century, that the laws of mechanics are the same in all **inertial reference frames** — that is, in all frames that move at constant velocity relative to one another. This idea directly challenged Aristotelian physics and laid the groundwork for Newton's laws and, centuries later, Einstein's special relativity.
{: .theory-section }

---

## 🏛️ Historical Background
{: .section-heading }

### Aristotle: the world has a privileged centre

**Aristotle** (4th century BC) believed that a body could only remain in motion if a force continuously acted upon it. Remove the force, and motion ceases. Furthermore, the Earth was the absolute centre of the cosmos — a uniquely privileged frame of rest. Every other motion was measured against it. This framework dominated natural philosophy for nearly two thousand years.

---

### The seeds of doubt: Cusanus and Copernicus

The first cracks appeared not from experiment, but from **philosophical and cosmological speculation**.

**Nicholas of Cusa** (*Nicolaus Cusanus*, 1401–1464) argued in *De Docta Ignorantia* (1440) that the universe has **no fixed centre** and no privileged place. For Cusanus this was a theological and metaphysical claim — God's infinity is reflected in an infinite, centreless cosmos — but it carried a radical physical implication: if there is no special centre, there is no special frame of rest.

> *"The universe has its centre everywhere and its circumference nowhere."*
> — Nicholas of Cusa, *De Docta Ignorantia*, 1440

**Nicolaus Copernicus** (1473–1543) then moved the argument onto astronomical ground. In *De revolutionibus orbium coelestium* (1543) he placed the Sun at the centre and set the Earth in motion. This immediately raised an empirical puzzle: if the Earth moves, why don't we feel it? Why doesn't a ball thrown upward fall behind us? Copernicus had no satisfying answer — but the question was now squarely on the table.

---

### Giordano Bruno: a philosophical leap (speculative)

**Giordano Bruno** (1548–1600) absorbed both Cusanus's metaphysics and Copernicus's heliocentrism and pushed them further in works such as *De l'Infinito Universo et Mondi* (1584). His conclusions were bold:

- The universe is **infinite** and **homogeneous** — it has no centre at all, not even the Sun.
- All positions in space are equivalent; **no location is privileged**.
- Motion is **relative**: an observer enclosed in a moving ship cannot distinguish their motion from rest by observing events inside the ship.

That last point is strikingly close to Galileo's principle of relativity — and it predates the *Dialogue* by nearly fifty years.

> *"When we are on a ship at sea and the weather is calm, we do not feel the ship's motion but judge ourselves to be at rest."*
> — Giordano Bruno, *La Cena de le Ceneri*, 1584

However, Bruno's insight remained **philosophical speculation**, not physics. He offered no equations, no controlled experiments, no quantitative predictions. His work was embedded in a pantheistic, mystical worldview that made it easy for contemporaries to dismiss — and ultimately cost him his life (he was burned at the stake in Rome in 1600, though for theological heresies rather than astronomical ones).

---

### Galileo: from speculation to science

**Galileo Galilei** (1564–1642) inherited this intellectual tradition and transformed it. In the *Dialogue Concerning the Two Chief World Systems* (1632) he gave the principle of relativity a **physical, testable form** through the famous ship's cabin thought experiment: imagine you are below deck on a smoothly sailing ship. You toss a ball, watch insects fly, and let water drip from a bottle. Everything behaves exactly as it would on land. You cannot tell, from inside the cabin, whether the ship is moving or stationary.

> *"Shut yourself up with some friend in the main cabin below decks on some large ship… you will discover not the least change in all the effects named, nor could you tell from any of them whether the ship was moving or standing still."*
> — Galileo Galilei, *Dialogue Concerning the Two Chief World Systems*, 1632

What changed with Galileo was not the intuition — Bruno had that — but the **method**: mathematical description, appeal to experiment, and a coherent mechanical framework. The idea became science.

### The lineage at a glance

| Thinker | Year | Contribution | Nature |
|---|---|---|---|
| Aristotle | ~350 BC | Privileged frame = Earth; force needed for motion | Philosophy / physics |
| Nicholas of Cusa | 1440 | No centre, no privileged place in an infinite universe | Philosophical / theological |
| Copernicus | 1543 | Earth moves; no absolute rest at the centre | Astronomy |
| Giordano Bruno | 1584 | Infinite universe; relative motion; no privileged observer | Philosophical speculation |
| Galileo | 1632 | Principle of relativity; inertia; quantitative mechanics | Physics |
| Newton | 1687 | First Law; absolute time; formalised inertial frames | Mathematical physics |
| Einstein | 1905 | Galilean transformations are an approximation; *c* is invariant | Relativistic physics |
{: .theory-section }

---

## 🔭 Inertial Reference Frames
{: .section-heading }

A **reference frame** is a coordinate system used to describe the position and motion of objects. A frame is called **inertial** if Newton's first law holds within it: a body not subject to any net force moves at constant velocity (or stays at rest).

Any frame moving at **constant velocity** with respect to an inertial frame is itself inertial. There is **no physical experiment** — no ball drop, no light beam, no pendulum — that can identify which inertial frame is "truly at rest". All are equivalent.

This is a radical departure from Aristotle: **there is no privileged rest frame**.
{: .theory-section }

---

## ⚙️ The Galilean Transformation Equations
{: .section-heading }

Consider two inertial frames sharing the same origin at \\(t = 0\\). Frame S is stationary; frame S′ moves relative to S with velocity components \\(v_x\\) along the horizontal and \\(v_y\\) along the vertical (so the motion can be oblique). The **Galilean transformations** give the coordinates of any event as seen from S, knowing the coordinates in S′:

\\[x = x' + v_x \cdot t\\]
{: .formula }

\\[y = y' + v_y \cdot t\\]
{: .formula }

\\[t = t'\\]
{: .formula }

Each position equation simply adds the displacement that S′ has covered in time \\(t\\) along that axis. If S′ moves only horizontally (\\(v_y = 0\\)) then \\(y = y'\\) — the vertical coordinate is unchanged. The time equation states that **time is the same for everyone**: a clock in S and a clock in S′ always agree.
{: .formula-description }

> 💡 The only equations that change anything are the position equations — adding \\(v_x \cdot t\\) and \\(v_y \cdot t\\).
> You may sometimes see \\(x' = x - v_x t\\) in textbooks: that is just the same equation solved for x′. Both forms are correct.
{: .math-jit-box }

### Absolute time and absolute space

In Galilean relativity **both time and space are absolute**:

- **Absolute time** \\((t = t')\\): every observer agrees on *when* an event happened and on *how much time* elapsed between two events. Clocks tick at the same rate everywhere, regardless of motion.
- **Absolute space**: the *length* of an object and the *distance* between two points are the same in every inertial frame. A ruler on the train measures the same length whether the train is moving or stationary. Space is a fixed, unchanging stage on which events take place.

These two assumptions feel completely natural — they match everyday experience perfectly. Yet both break down at speeds close to the speed of light. Einstein showed in 1905 that time and space are *not* absolute: moving clocks tick more slowly (time dilation) and moving objects contract (length contraction). The Galilean transformations are simply the low-speed approximation of Einstein's far more general Lorentz transformations.
{: .formula-description }
{: .theory-section }

---

## 🚂 The Ball-Drop Experiment
{: .section-heading }

This is the **central demonstration** of the simulation.

A passenger sits inside a train moving at constant horizontal velocity \\(V\\). He holds a ball at height \\(H\\) above the floor and releases it from rest **relative to himself**.

### In S — inside the train (passenger's frame)

The train is S here: the passenger is stationary in his own frame. The ball has no horizontal velocity relative to him. The only motion is the vertical fall due to gravity:

\\[x(t) = 0\\]
{: .formula }

\\[y(t) = H - \tfrac{1}{2} g \, t^2\\]
{: .formula }

The ball falls in a **straight vertical line** and lands at the passenger's feet. He sees exactly what he would see if the train were stationary.
{: .formula-description }

### In S′ — outside the train (ground observer's frame)

The external observer sees the whole train moving to the right at speed \\(V\\). When the ball is released it already has the horizontal velocity of the train — by **inertia**, since no horizontal force acts on it. The train travels at **constant velocity**, so the horizontal motion of the ball is **uniform rectilinear motion** (\\(x' = V \cdot t\\)). The vertical motion is unchanged because gravity acts identically in both frames:

> ⚠️ The horizontal motion is **inertial** (no force → constant velocity). The vertical motion is **not inertial** (gravity acts). This is why the vertical equation is the same in both frames while the horizontal one differs.
{: .math-jit-box }

Applying the Galilean transformation \\(x' = x + V \cdot t\\) with \\(x = 0\\), and \\(y' = y\\):

\\[x'(t) = V \cdot t\\]
{: .formula }

\\[y'(t) = H - \tfrac{1}{2} g \, t^2\\]
{: .formula }

Eliminating \\(t\\): \\(\;t = x'/V\;\\), so:

\\[y' = H - \frac{g}{2V^2} {x'}^2\\]
{: .formula }

This is a **downward-opening parabola** — the same shape as a projectile launched horizontally at speed \\(V\\). Both observers are correct: the difference is only in the choice of reference frame.
{: .theory-section }

---

## 🧭 The Principle of Inertia (Galileo → Newton)
{: .section-heading }

The ball-drop experiment is also a direct demonstration of **Galileo's Principle of Inertia**: a body on which no net force acts continues in its state of uniform motion. When the ball is released, no horizontal force acts on it, so it keeps the horizontal velocity \\(V\\) it shared with the train. Gravity only changes the vertical component.

Newton later formalised this as his **First Law of Motion**:

> *An object at rest stays at rest, and an object in uniform motion stays in uniform motion, unless acted upon by a net external force.*

The Galilean transformation is thus the mathematical bridge between the principle of inertia and the equivalence of inertial frames.
{: .theory-section }

---

## 🔬 Physics Insights
{: .section-heading }

### Why does the ball land directly below the drop point (in S′)?
Because in the train's frame the ball has zero horizontal velocity. Gravity is purely vertical, so the ball moves only downward — landing at the feet of the person who dropped it.

### Why does the ground observer see a parabola?
Because inertia gives the ball the train's horizontal velocity at the moment of release. From then on, the ball is a projectile: constant horizontal speed, uniformly accelerated vertical fall.

### What happens when V = 0?
Both frames are identical. The parabola collapses to a vertical line. This is the limiting case where the two frames coincide.

### Does the vertical fall time depend on V?
No. The time to fall height \\(H\\) is \\(T = \sqrt{2H/g}\\), independent of horizontal velocity. The range in S is \\(R = V \cdot T\\) — it grows linearly with train speed.
{: .theory-section }

---

[← Back to Kinematics]({{ '/kinematics/' | relative_url }}){: .btn .btn-secondary }
[Launch Simulation →]({{ '/kinematics/galilean-relativity.html' | relative_url }}){: .btn .btn-primary }
{: .action-buttons }
