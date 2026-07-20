---
layout: theory
title: "Splitting a Vector (The Shadow Analogy) — Math JIT"
sim_url: /kinematics/projectile-motion.html
permalink: /projectile-motion-math-jit/
---

# 🧩 Math JIT: Splitting a Vector (The Shadow Analogy)
{: .section-heading }

When dealing with physics or simulations, you will constantly see objects moving diagonally. However, computers and physics equations don't easily handle "diagonal" math directly. They prefer to break everything down into straight lines: **Horizontal (X)** and **Vertical (Y)**.

A diagonal arrow representing a quantity (like velocity or force) is called a **vector**. Splitting that diagonal arrow into its horizontal and vertical pieces is called **vector decomposition**.
{: .theory-section }

---

## 🔦 The Flashlight and The Shadows
{: .section-heading }

Instead of getting bogged down in complex trigonometry theorems or geometric proportions, you can intuitively understand how this works using a simple analogy: **shadows and flashlights**.

Imagine you have a diagonal vector arrow with a total length (magnitude) of \\(v_0\\), tilted at an angle \\(\theta\\) from the ground.

### 1. The Horizontal Component: \\(\cos(\theta)\\)

Imagine shining a flashlight from directly above the vector, pointing straight down at the floor.

* The shadow cast by the diagonal arrow on the horizontal floor represents your **Horizontal Component (\\(v_{0x}\\))**.
* The mathematical function **\\(\cos(\theta)\\)** is simply a scaling factor (a percentage between 0 and 1) that tells you how much of the original arrow is flattened onto the ground.

\\[v_{0x} = v_0 \cdot \cos(\theta)\\]
{: .formula }

### 2. The Vertical Component: \\(\sin(\theta)\\)

Now, imagine moving that flashlight to the side, shining it horizontally against a vertical wall.

* The shadow cast by the diagonal arrow on the wall represents your **Vertical Component (\\(v_{0y}\\))**.
* The mathematical function **\\(\sin(\theta)\\)** is the scaling factor that tells you what percentage of the original arrow is projected upward.

\\[v_{0y} = v_0 \cdot \sin(\theta)\\]
{: .formula }
{: .theory-section }

---

## 🎛️ Dynamic Examples
{: .section-heading }

To see why this is so powerful, look at what happens when you change the angle \\(\theta\\):

| Launch Angle (\\(\theta\\)) | Behavior of the Shadows | Mathematical Result |
| :--- | :--- | :--- |
| **Directly Horizontal** (\\(\theta = 0^\circ\\)) | The flashlight from above casts a maximum shadow on the floor. The side flashlight casts no shadow on the wall. | \\(\cos(0^\circ) = 1\\) (100% speed on X) <br> \\(\sin(0^\circ) = 0\\) (0% speed on Y) |
| **Perfect Diagonal** (\\(\theta = 45^\circ\\)) | The arrow is perfectly balanced. The shadow on the floor and the shadow on the wall are exactly equal. | \\(\cos(45^\circ) \approx 0.707\\) <br> \\(\sin(45^\circ) \approx 0.707\\) |
| **Directly Vertical** (\\(\theta = 90^\circ\\)) | The top flashlight shines directly on the tip, casting no shadow on the floor. The side flashlight casts a full shadow on the wall. | \\(\cos(90^\circ) = 0\\) (0% speed on X) <br> \\(\sin(90^\circ) = 1\\) (100% speed on Y) |
{: .theory-section }

---

## 💡 Key Takeaway
{: .section-heading }

* **\\(\cos(\theta)\\)** = percentage of the vector that lies along the **horizontal** axis.
* **\\(\sin(\theta)\\)** = percentage of the vector that lies along the **vertical** axis.

They are just **scaling factors** — nothing more mysterious than asking "how much of this arrow's length falls on each axis?"

When \\(\theta\\) grows from 0° to 90°:
- \\(\cos\\) shrinks from 1 → 0 (less and less horizontal)
- \\(\sin\\) grows from 0 → 1 (more and more vertical)

This is why at 45° both are equal (~0.707): the arrow is perfectly balanced between horizontal and vertical.
{: .theory-section }

---

## 🔗 Quick Reference

| Symbol | Meaning |
|--------|---------|
| \\(v_0\\) | Total magnitude of the vector (initial speed) |
| \\(\theta\\) | Angle measured from the horizontal |
| \\(v_{0x} = v_0 \cos\theta\\) | Horizontal component |
| \\(v_{0y} = v_0 \sin\theta\\) | Vertical component |
{: .theory-section }

---

[← Back to Projectile Motion Theory]({{ '/projectile-motion-theory/' | relative_url }}){: .btn .btn-secondary }
[▶️ Launch Simulation]({{ '/kinematics/projectile-motion.html' | relative_url }}){: .btn .btn-primary }
{: .cta-section }
