---
layout: theory
title: "Degrees vs. Radians — Math JIT"
sim_url: /kinematics/uniform-circular-motion.html
permalink: /uniform-circular-motion-math-jit/
---

# 🧩 Math JIT: Degrees vs. Radians
{: .section-heading }

You already know one way to measure angles: **degrees**, where a full circle is 360°. It's the unit protractors use, and it's fine for everyday life. But every formula in this chapter — ω = Δθ/Δt, v = ωr, a_c = ω²r — silently assumes the angle is measured in a *different* unit: the **radian**.

Mixing the two up is the single most common mistake when starting circular motion, so it's worth understanding exactly what a radian is and why physics insists on it.
{: .theory-section }

---

## 📏 What Is a Radian?
{: .section-heading }

Forget 360 for a moment. Instead of dividing the circle into arbitrary equal slices, a radian defines the angle using something the circle already has built into it: **its own radius**.

**A radian is the angle you get at the center of a circle when the arc it cuts out is exactly as long as the radius.**

\\[\theta \, \text{(in radians)} = \frac{\text{arc length } s}{\text{radius } r}\\]
{: .formula-large }

Because it's a ratio of two lengths (length ÷ length), a radian is technically a "pure number" — it has no physical unit of its own, which is exactly why it slots cleanly into formulas like v = ωr without needing a conversion factor.
{: .theory-section }

---

## 🎡 The "Unrolling the Circle" Analogy
{: .section-heading }

Imagine taking a piece of string exactly as long as the circle's radius r, and laying it along the circle's edge, starting from the 3 o'clock position and curving counter-clockwise.

- The angle swept by that first piece of string is, by definition, **1 radian**.
- Lay a second identical piece right after it — now you've swept **2 radians**.
- Keep going. Since the circle's full circumference is \\(2\pi r\\), you'll need exactly **\\(2\pi\\) pieces of string** (about 6.28) to make it all the way around.

That's the whole idea: a radian just counts **how many radius-lengths of arc** you've swept. A full circle is always \\(2\pi\\) radians, no matter how big or small the circle is — because the circumference is always \\(2\pi\\) times the radius.
{: .theory-section }

---

## 🔁 Converting Between the Two

Since a full circle is both 360° and 2π rad, the two scales are proportional:

\\[\theta_{\text{rad}} = \theta_{\text{deg}} \cdot \frac{\pi}{180}\\]
{: .formula }

\\[\theta_{\text{deg}} = \theta_{\text{rad}} \cdot \frac{180}{\pi}\\]
{: .formula }

### Quick Reference Table

| Degrees | Radians | Description |
|:---:|:---:|:---|
| 0° | 0 | Starting position |
| 30° | π/6 ≈ 0.524 | — |
| 45° | π/4 ≈ 0.785 | — |
| 60° | π/3 ≈ 1.047 | — |
| 90° | π/2 ≈ 1.571 | Quarter turn |
| 180° | π ≈ 3.142 | Half turn |
| 270° | 3π/2 ≈ 4.712 | Three-quarter turn |
| 360° | 2π ≈ 6.283 | Full turn |
{: .theory-section }

---

## ⚠️ Why Physics Insists on Radians
{: .section-heading }

The formulas in this chapter aren't arbitrary — they come directly from the "unrolling" definition \\(s = r\theta\\), which is *only* true when θ is in radians. Using degrees would silently introduce an error of a factor of \\(180/\pi \approx 57.3\\) into every formula that uses ω.

| Quantity | Formula (θ, ω must be in **radians**) | If you plug in degrees instead |
|:---|:---|:---|
| Arc length | \\(s = r\theta\\) | Off by a factor of ≈ 57.3 |
| Linear speed | \\(v = \omega r\\) | Wrong numeric result |
| Centripetal acceleration | \\(a_c = \omega^2 r\\) | Wrong numeric result |
{: .theory-section }

**Rule of thumb:** whenever you see ω, always make sure it's in rad/s before plugging it into a formula. Calculators and code libraries (`Math.cos`, `Math.sin`, `sin()` in most languages) also expect radians by default.
{: .theory-section }

---

## ✏️ Worked Examples
{: .section-heading }

**Convert 90° to radians:**

\\[\theta = 90° \times \frac{\pi}{180} = \frac{\pi}{2} \approx 1.571 \, \text{rad}\\]
{: .formula }

**Convert 2 rad to degrees:**

\\[\theta = 2 \times \frac{180}{\pi} \approx 114.6°\\]
{: .formula }

**A wheel spins at ω = 1 rad/s. How many degrees does it sweep in 1 second?**

\\[1 \, \text{rad} \times \frac{180}{\pi} \approx 57.3°\\]
{: .formula }

So "1 radian per second" is a fairly slow spin — less than a sixth of a full turn every second.
{: .theory-section }

---

## 💡 Key Takeaway
{: .section-heading }

* A **radian** measures angle as "how many radius-lengths of arc," making it a natural, unit-free number tied directly to the geometry of the circle.
* A full circle is always **2π radians**, regardless of the circle's size.
* Circular motion formulas (ω, v = ωr, a_c = ω²r) are only correct when angles are in **radians** — always convert degrees first.
{: .theory-section }

---

[← Back to Uniform Circular Motion Theory]({{ '/uniform-circular-motion-theory/' | relative_url }}){: .btn .btn-secondary }
[▶️ Launch Simulation]({{ '/kinematics/uniform-circular-motion.html' | relative_url }}){: .btn .btn-primary }
{: .cta-section }
