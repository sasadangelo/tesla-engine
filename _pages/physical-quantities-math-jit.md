---
layout: theory
title: "Scalars and Vectors — Math JIT"
sim_url: /kinematics/physical-quantities.html
permalink: /physical-quantities-math-jit/
---

# 🧭 Math JIT: Scalars and Vectors
{: .section-heading }

Every physical quantity is a number with a unit — but that number is not always enough to describe it. Some quantities are complete with just a magnitude. Others also need a **direction**. This distinction is the single most important idea to master before studying velocity and acceleration, which are both vector quantities.
{: .theory-section }

---

## 🔢 Scalar Quantities
{: .section-heading }

A **scalar** is fully described by one real number (plus its unit). There is nothing else to specify.

Examples: mass (\\(5\\) kg), time (\\(10\\) s), temperature (\\(20\\)°C), distance travelled (\\(3\\) km).
{: .theory-section }

---

## 🧭 Vector Quantities
{: .section-heading }

A **vector** needs more than one number: a magnitude **and** a direction. Concretely, a vector is a couple of values in a 2D world, or a triple of values in a 3D world.

Examples: displacement, velocity, acceleration, force.

\\[\vec{v} = (v_x, v_y) \quad \text{(2D)} \qquad \vec{v} = (v_x, v_y, v_z) \quad \text{(3D)}\\]
{: .formula-large }
{: .theory-section }

---

## 📍 A Vector is a Point in a Cartesian System
{: .section-heading }

Plot the pair \\((v_x, v_y)\\) in a Cartesian plane: it is simply a point \\(P\\). The vector \\(\vec{v}\\) is the arrow that goes from the origin \\(O\\) to \\(P\\). In 3D, the same idea works with a triple \\((v_x, v_y, v_z)\\) and a point in space.

<div class="graph-container">
  <img src="{{ '/assets/img/vector-cartesian-point.svg' | relative_url }}" alt="A vector as an arrow from the origin O to a point P with coordinates Vx, Vy in a Cartesian plane" style="width:100%;max-width:420px;display:block;margin:0 auto;">
</div>

So a vector and a point are two ways of looking at the same thing — the components ARE the coordinates of the point.
{: .theory-section }

---

## 📏 Magnitude and Direction
{: .section-heading }

Once you have a point \\(P = (v_x, v_y)\\), its distance from the origin is the **magnitude** (or **modulus**) of the vector, computed with Pythagoras' theorem:

\\[\lvert\vec{v}\rvert = \sqrt{v_x^2 + v_y^2}\\]
{: .formula-large }

The **direction** is simply the angle \\(\theta\\) that the arrow forms with the x-axis (as shown in the figure above).

This gives two equivalent ways to describe the same vector:

| Representation | Data | Formula |
|---|---|---|
| **Cartesian** | components | \\((v_x, v_y)\\) |
| **Polar** | magnitude + angle | \\(\lvert\vec{v}\rvert,\ \theta\\) |

To go from polar back to Cartesian — the same "shadow" decomposition used in the [Projectile Motion Math JIT]({{ '/projectile-motion-math-jit/' | relative_url }}):

\\[v_x = \lvert\vec{v}\rvert \cos\theta \qquad v_y = \lvert\vec{v}\rvert \sin\theta\\]
{: .formula-large }

> **In 3D**, one angle is no longer enough — you need two angles (one from each of two reference axes) to fix a direction in space. An equivalent and often more practical alternative is: magnitude \\(\lvert\vec{v}\rvert\\) **plus a unit vector** \\(\hat{u}\\) (a "versor", with \\(\lvert\hat{u}\rvert = 1\\)) that points the way: \\(\vec{v} = \lvert\vec{v}\rvert \cdot \hat{u}\\).
{: .theory-section }

---

## ⚙️ Operations on Vectors
{: .section-heading }

Vectors don't add or multiply like plain numbers — direction matters. Here are the four operations you will meet again and again.

### ➕ Sum

Add component by component. Geometrically, place the tail of \\(\vec{b}\\) at the tip of \\(\vec{a}\\): the sum is the arrow from the start of \\(\vec{a}\\) to the tip of \\(\vec{b}\\).

\\[\vec{a} + \vec{b} = (a_x + b_x,\ a_y + b_y)\\]
{: .formula-large }

<div class="graph-container">
  <img src="{{ '/assets/img/vector-sum.svg' | relative_url }}" alt="Vector sum shown as the tip-to-tail and parallelogram construction" style="width:100%;max-width:420px;display:block;margin:0 auto;">
</div>

**Used for:** combining displacements, combining velocities (e.g. a boat's velocity plus the current's), summing forces acting on a body.

### ➖ Subtraction

Subtract component by component — equivalent to adding the opposite vector.

\\[\vec{a} - \vec{b} = (a_x - b_x,\ a_y - b_y)\\]
{: .formula-large }

<div class="graph-container">
  <img src="{{ '/assets/img/vector-subtraction.svg' | relative_url }}" alt="Vector subtraction shown as the arrow from the tip of b to the tip of a" style="width:100%;max-width:420px;display:block;margin:0 auto;">
</div>

**Used for:** finding the vector that connects two points, and — crucially for what comes next — computing a **change**, like \\(\Delta \vec{v} = \vec{v}_{\text{final}} - \vec{v}_{\text{initial}}\\), the basis of acceleration.

### ⏺️ Dot Product (Scalar Product)

Multiplies two vectors and returns a **scalar** (a plain number, not a vector):

\\[\vec{a} \cdot \vec{b} = a_x b_x + a_y b_y = \lvert\vec{a}\rvert\, \lvert\vec{b}\rvert \cos\theta\\]
{: .formula-large }

<div class="graph-container">
  <img src="{{ '/assets/img/vector-dot-product.svg' | relative_url }}" alt="Dot product shown as the projection of b onto a" style="width:100%;max-width:420px;display:block;margin:0 auto;">
</div>

**Used for:** measuring how much two vectors point the same way. It is maximum when they are parallel, zero when they are perpendicular. This is exactly how **work** is defined: \\(W = \vec{F} \cdot \vec{d}\\).

### ✖️ Cross Product (Vector Product)

Multiplies two vectors and returns a **vector**, perpendicular to both (only defined in 3D):

\\[\lvert\vec{a} \times \vec{b}\rvert = \lvert\vec{a}\rvert\, \lvert\vec{b}\rvert \sin\theta\\]
{: .formula-large }

<div class="graph-container">
  <img src="{{ '/assets/img/vector-cross-product.svg' | relative_url }}" alt="Cross product shown as a vector rising straight up out of the plane containing a and b, perpendicular to both" style="width:100%;max-width:420px;display:block;margin:0 auto;">
</div>

Its direction follows the right-hand rule. **Used for:** quantities that depend on rotation or a perpendicular effect, such as **torque** and **angular momentum**.
{: .theory-section }

---

## 💡 Key Takeaway
{: .section-heading }

Velocity and acceleration are **vectors**: each one has a magnitude ("how fast") and a direction ("which way"). Every tool introduced here — Cartesian vs. polar form, sum, subtraction, dot product, cross product — is exactly what you need to combine, compare, and decompose motion quantities in the chapters ahead.
{: .theory-section }

---

## 🔗 Quick Reference
{: .section-heading }

| Concept | Formula |
|---|---|
| Vector (2D) | \\(\vec{v} = (v_x, v_y)\\) |
| Magnitude | \\(\lvert\vec{v}\rvert = \sqrt{v_x^2+v_y^2}\\) |
| Direction | angle \\(\theta\\) from the x-axis |
| Cartesian → components | \\(v_x = \lvert\vec{v}\rvert\cos\theta,\ v_y = \lvert\vec{v}\rvert\sin\theta\\) |
| Sum | \\(\vec{a}+\vec{b} = (a_x+b_x,\ a_y+b_y)\\) |
| Subtraction | \\(\vec{a}-\vec{b} = (a_x-b_x,\ a_y-b_y)\\) |
| Dot product | \\(\vec{a}\cdot\vec{b} = a_xb_x+a_yb_y = \lvert\vec{a}\rvert\lvert\vec{b}\rvert\cos\theta\\) |
| Cross product | \\(\lvert\vec{a}\times\vec{b}\rvert = \lvert\vec{a}\rvert\lvert\vec{b}\rvert\sin\theta\\) |
{: .theory-section }

---

[← Back to Theory]({{ '/physical-quantities-theory/' | relative_url }}){: .btn .btn-secondary }
[▶️ Launch Simulation]({{ '/kinematics/physical-quantities.html' | relative_url }}){: .btn .btn-primary }
{: .cta-section }
