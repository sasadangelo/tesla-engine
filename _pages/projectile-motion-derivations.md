---
layout: theory
title: "Projectile Motion — Derivations"
sim_url: /kinematics/projectile-motion.html
permalink: /projectile-motion-derivations/
---

# 📐 Formula Derivations
{: .section-heading }

This page walks through the reasoning behind the key projectile motion formulas, step by step.
{: .theory-section }

---

## Time of Flight
{: .section-heading }

### Why is \\(T = \dfrac{2 \, v_0 \cdot \sin(\theta)}{g}\\)?

The trajectory is a parabola, symmetric around its peak: the projectile takes exactly as long to **rise** to the maximum height as it takes to **fall** back down to the launch height. So the total time of flight is simply twice the rise time:

\\[T = 2 \cdot t_{\text{rise}}\\]
{: .formula }

**Step 1 — Split the initial velocity into components**

\\[v_{0x} = v_0 \cdot \cos(\theta) \qquad v_{0y} = v_0 \cdot \sin(\theta)\\]
{: .formula }

**Step 2 — Write the vertical velocity as a function of time**

Gravity only acts on the vertical component, decelerating it over time:

\\[v_y(t) = v_{0y} - g \cdot t = v_0 \cdot \sin(\theta) - g \cdot t\\]
{: .formula }

**Step 3 — Find the rise time**

At the peak of the trajectory the vertical velocity is momentarily zero (\\(v_y = 0\\)):

\\[0 = v_0 \cdot \sin(\theta) - g \cdot t_{\text{rise}}\\]
{: .formula }

Solving for \\(t_{\text{rise}}\\):

\\[t_{\text{rise}} = \frac{v_0 \cdot \sin(\theta)}{g}\\]
{: .formula }

**Step 4 — Double it to get the total time of flight**

Since going up takes the same time as coming down:

\\[T = 2 \cdot t_{\text{rise}} = \frac{2 \, v_0 \cdot \sin(\theta)}{g}\\]
{: .formula }

which is exactly the formula we started from.
{: .theory-section }

---

## Range
{: .section-heading }

### Why is \\(R = \dfrac{v_0^2 \cdot \sin(2\theta)}{g}\\)?

The horizontal motion has no acceleration, so the range is just the horizontal velocity times the total time the projectile spends in the air:

\\[R = v_{0x} \cdot T\\]
{: .formula }

**Step 1 — Substitute \\(v_{0x}\\) and \\(T\\)**

Using \\(v_{0x} = v_0 \cdot \cos(\theta)\\) and the [time of flight](#time-of-flight) \\(T = \dfrac{2 \, v_0 \cdot \sin(\theta)}{g}\\) found above:

\\[R = v_0 \cdot \cos(\theta) \cdot \frac{2 \, v_0 \cdot \sin(\theta)}{g}\\]
{: .formula }

**Step 2 — Simplify**

\\[R = \frac{2 \, v_0^2 \cdot \sin(\theta) \cdot \cos(\theta)}{g}\\]
{: .formula }

**Step 3 — Apply the double-angle identity**

The double-angle formula for sine states that \\(2 \cdot \sin(\theta) \cdot \cos(\theta) = \sin(2\theta)\\):

\\[R = \frac{v_0^2 \cdot \sin(2\theta)}{g}\\]
{: .formula }

which is exactly the formula we started from.
{: .theory-section }

---

## Maximum Height
{: .section-heading }

### Why is \\(H = \dfrac{v_0^2 \cdot \sin^2(\theta)}{2g}\\)?

\\(H\\) is just the vertical position \\(y(t)\\) evaluated at the [rise time](#time-of-flight) \\(t_{\text{rise}}\\), since that is the instant the projectile reaches the top of its trajectory.

**Step 1 — Start from the general equation of motion for the vertical position**

\\[y(t) = y_0 + v_{0y} \cdot t - \tfrac{1}{2} g t^2\\]
{: .formula }

**Step 2 — The projectile launches from ground level, so \\(y_0 = 0\\)**

\\[y(t) = v_{0y} \cdot t - \tfrac{1}{2} g t^2\\]
{: .formula }

**Step 3 — \\(H\\) is \\(y(t)\\) at \\(t = t_{\text{rise}}\\)**

\\[H = v_{0y} \cdot t_{\text{rise}} - \tfrac{1}{2} g \, t_{\text{rise}}^2\\]
{: .formula }

**Step 4 — Substitute \\(t_{\text{rise}} = \dfrac{v_{0y}}{g}\\)** found earlier:

\\[H = v_{0y} \cdot \frac{v_{0y}}{g} - \frac{1}{2} g \cdot \left(\frac{v_{0y}}{g}\right)^2\\]
{: .formula }

**Step 5 — Simplify**

\\[H = \frac{v_{0y}^2}{g} - \frac{1}{2} \cdot \frac{v_{0y}^2}{g} = \frac{v_{0y}^2}{2g}\\]
{: .formula }

**Step 6 — Substitute \\(v_{0y} = v_0 \cdot \sin(\theta)\\)**

\\[H = \frac{v_0^2 \cdot \sin^2(\theta)}{2g}\\]
{: .formula }

which is exactly the formula we started from.
{: .theory-section }

---

[← Back to Projectile Motion Theory]({{ '/projectile-motion-theory/' | relative_url }}){: .btn .btn-secondary }
{: .action-buttons }
