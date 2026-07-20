---
layout: theory
title: "Deriving the Position Formula — Math JIT"
sim_url: /kinematics/uniformly-accelerated-motion.html
permalink: /uniformly-accelerated-motion-math-jit/
---

# 🧮 Math JIT — Deriving the Position Formula
{: .section-heading }

In the [Uniformly Accelerated Motion theory page]({{ '/uniformly-accelerated-motion-theory/' | relative_url }}) we introduced the position formula without proof:

\\[x(t) = x_0 + v_0 \cdot (t - t_0) + \tfrac{1}{2} a (t - t_0)^2\\]
{: .formula-large }

A reasonable question is: **where does this formula come from?** Why exactly that \\(\tfrac{1}{2}\\)? Why squared? It is not obvious at all.

The goal of this page is to answer exactly that question — building the formula from scratch, step by step, using nothing more than the definition of average velocity and a bit of algebra. No calculus required.

The only ingredient we need is the velocity formula, which we already derived:

\\[v(t) = v_0 + a \cdot (t - t_0)\\]
{: .formula-large }

Starting from there, four algebraic steps lead us straight to the position formula.

---

## Step 1 — Isolate the Displacement
{: .section-heading }

By definition, average velocity \\(v_m\\) is displacement divided by elapsed time:

\\[v_m = \frac{x(t) - x_0}{t - t_0}\\]
{: .formula-large }

Multiply both sides by \\((t - t_0)\\) — the time that was dividing on the right now moves to multiply on the left:

\\[x(t) - x_0 = v_m \cdot (t - t_0)\\]
{: .formula-large }

> Displacement = average velocity × elapsed time. Simple, but this single line is the engine of the whole derivation.
{: .theory-section }

---

## Step 2 — Replace \\(v_m\\) with the Mean of Initial and Final Velocity
{: .section-heading }

When acceleration is **constant**, velocity grows linearly. The average velocity is therefore the exact arithmetic mean of the velocity at the start and at the end of the interval:

\\[v_m = \frac{v_0 + v(t)}{2}\\]
{: .formula-large }

Substitute this into the displacement equation from Step 1:

\\[x(t) - x_0 = \frac{v_0 + v(t)}{2} \cdot (t - t_0)\\]
{: .formula-large }
{: .theory-section }

---

## Step 3 — Substitute the Velocity Formula
{: .section-heading }

You already know the expression for \\(v(t)\\):

\\[v(t) = v_0 + a(t - t_0)\\]
{: .formula-large }

Replace \\(v(t)\\) inside the bracket:

\\[x(t) - x_0 = \frac{v_0 + \bigl(v_0 + a(t - t_0)\bigr)}{2} \cdot (t - t_0)\\]
{: .formula-large }

Combine the two \\(v_0\\) terms in the numerator (\\(v_0 + v_0 = 2v_0\\)):

\\[x(t) - x_0 = \frac{2v_0 + a(t - t_0)}{2} \cdot (t - t_0)\\]
{: .formula-large }
{: .theory-section }

---

## Step 4 — Expand and Collect
{: .section-heading }

Split the fraction into two separate terms:

\\[x(t) - x_0 = \left(\frac{2v_0}{2} + \frac{a(t - t_0)}{2}\right) \cdot (t - t_0)\\]
{: .formula-large }

The \\(2\\) cancels in the first term, and \\(\tfrac{a(t-t_0)}{2}\\) is the same as \\(\tfrac{1}{2}a(t-t_0)\\):

\\[x(t) - x_0 = \left[v_0 + \tfrac{1}{2}\,a(t - t_0)\right] \cdot (t - t_0)\\]
{: .formula-large }

Distribute \\((t - t_0)\\) across the bracket:

\\[x(t) - x_0 = v_0 \cdot (t - t_0) + \tfrac{1}{2}\,a\,(t - t_0)^2\\]
{: .formula-large }

Finally, add \\(x_0\\) to both sides:

\\[x(t) = x_0 + v_0 \cdot (t - t_0) + \tfrac{1}{2}\,a\,(t - t_0)^2\\]
{: .formula-large }

This is exactly the position formula — derived from scratch, step by step.
{: .theory-section }

---

## 💡 Summary of the Derivation
{: .section-heading }

| Step | What we did |
|------|-------------|
| 1 | Rewrote the definition of \\(v_m\\) to isolate displacement |
| 2 | Used \\(v_m = (v_0 + v(t))/2\\), valid only when acceleration is constant |
| 3 | Replaced \\(v(t)\\) with \\(v_0 + a(t-t_0)\\) and simplified the numerator |
| 4 | Split the fraction, distributed, and rearranged |
{: .theory-section }

---

[← Back to Theory]({{ '/uniformly-accelerated-motion-theory/' | relative_url }}){: .btn .btn-secondary }
[▶️ Launch Simulation]({{ '/kinematics/uniformly-accelerated-motion.html' | relative_url }}){: .btn .btn-primary }
{: .cta-section }
