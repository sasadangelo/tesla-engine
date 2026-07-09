---
layout: theory
title: "Physical Quantities & Measurements"
sim_url: /kinematics/physical-quantities.html
permalink: /physical-quantities-theory/
---

# 📏 What is a Physical Quantity?
{: .section-heading }

A **physical quantity** is any property of a phenomenon or object that can be measured and expressed as a number multiplied by a unit. Every equation in physics relates physical quantities — so before studying motion we must understand *how to measure*.

Physical quantities are divided into two classes:

- **Base (fundamental) quantities** — defined independently; their units are chosen by convention
- **Derived quantities** — defined as algebraic combinations of base quantities (e.g. velocity = length / time)
{: .theory-section }

---

## 🌍 The International System of Units (SI)
{: .section-heading }

The **Système International d'Unités** (SI) is the globally agreed measurement standard. It defines **seven base units**; for kinematics the three that matter most are:

| Quantity | Symbol | SI Unit | Unit symbol |
|---|---|---|---|
| Length | \\(L\\) | metre | m |
| Time | \\(T\\) | second | s |
| Mass | \\(M\\) | kilogram | kg |

> 💡 All other kinematic quantities — velocity, acceleration, angular velocity, etc. — are derived from these three.

### SI Prefixes

When measured values are very large or very small, SI prefixes scale the unit by powers of ten:

| Prefix | Symbol | Factor |
|---|---|---|
| tera | T | \\(10^{12}\\) |
| giga | G | \\(10^{9}\\) |
| mega | M | \\(10^{6}\\) |
| kilo | k | \\(10^{3}\\) |
| hecto | h | \\(10^{2}\\) |
| deca | da | \\(10^{1}\\) |
| — | — | \\(10^{0}\\) |
| deci | d | \\(10^{-1}\\) |
| centi | c | \\(10^{-2}\\) |
| milli | m | \\(10^{-3}\\) |
| micro | μ | \\(10^{-6}\\) |
| nano | n | \\(10^{-9}\\) |
| pico | p | \\(10^{-12}\\) |

👉 Example: 1 km = 10³ m; 1 ms = 10⁻³ s; 1 μg = 10⁻⁶ g.
{: .theory-section }

---

## 📐 Base Quantities in Kinematics
{: .section-heading }

### Length — \\(L\\)

Length measures the spatial extent between two points.

- SI unit: **metre (m)**
- Definition (since 1983): the distance light travels in vacuum in \\(1/299\,792\,458\\) of a second
- Typical instruments: ruler, tape measure, vernier calliper, laser rangefinder

### Time — \\(T\\)

Time measures the duration between two events.

- SI unit: **second (s)**
- Definition (since 2019): fixed by the caesium-133 hyperfine frequency \\(\Delta\nu_{Cs} = 9\,192\,631\,770\\) Hz
- Typical instruments: stopwatch, atomic clock

### Mass — \\(M\\)

Mass is the quantity of matter in an object and its resistance to acceleration.

- SI unit: **kilogram (kg)**
- Definition (since 2019): fixed by the Planck constant \\(h = 6.626\,070\,15 \times 10^{-34}\\) J·s
- Typical instruments: balance, electronic scale
{: .theory-section }

---

## ⚡ Derived Quantities
{: .section-heading }

All kinematic quantities are combinations of length, time, and (for force) mass:

| Quantity | Definition | Formula | SI Unit |
|---|---|---|---|
| Velocity | length / time | \\(v = \Delta x / \Delta t\\) | m/s |
| Acceleration | velocity / time | \\(a = \Delta v / \Delta t\\) | m/s² |
| Area | length × length | \\(A = L^2\\) | m² |
| Volume | length³ | \\(V = L^3\\) | m³ |
| Frequency | 1 / time | \\(f = 1/T\\) | Hz (= 1/s) |
| Angular velocity | angle / time | \\(\omega = \Delta\theta/\Delta t\\) | rad/s |
| Force | mass × acceleration | \\(F = m \cdot a\\) | N (= kg·m/s²) |

> 💡 **Dimensional analysis** — checking that both sides of an equation have the same combination of L, T, M — is the fastest way to catch formula errors.

### Dimensional Analysis Example

Verify \\(v = \sqrt{2 a \Delta x}\\):

\\[\left[v\right] = \frac{L}{T}, \quad \left[\sqrt{2 a \Delta x}\right] = \sqrt{\frac{L}{T^2} \cdot L} = \sqrt{\frac{L^2}{T^2}} = \frac{L}{T} \checkmark\\]
{: .formula-large }
{: .theory-section }

---

## 🔬 Measurement & Uncertainty
{: .section-heading }

Every measurement is imperfect. No instrument can read an exact value — there is always a **measurement uncertainty** (also called **error**) that expresses how much the true value could differ from the measured value.

### Why Uncertainty Matters

Without stating an uncertainty, a measurement is meaningless: "I measured 2.5 m" says nothing about precision. "2.5 ± 0.1 m" tells us the true value lies between 2.4 m and 2.6 m.

### Sources of Error

| Type | Description | Example |
|---|---|---|
| **Systematic error** | Consistent offset in one direction; due to faulty calibration or method | A ruler that starts at 1 mm instead of 0 |
| **Random error** | Unpredictable fluctuations; reduced by repeating measurements | Reading a stopwatch by hand |
| **Parallax error** | Reading a scale from the wrong angle | Reading a liquid level on a tilted graduated cylinder |
{: .theory-section }

---

## ± Absolute Error
{: .section-heading }

The **absolute error** \\(\Delta x\\) is the uncertainty expressed in the *same unit* as the measured quantity.

\\[\text{measured value} = x \pm \Delta x\\]
{: .formula-large }

For a single instrument reading, \\(\Delta x\\) is usually taken as **half the smallest scale division** (resolution):

\\[\Delta x = \frac{\text{resolution}}{2}\\]
{: .formula-large }

**Example:** a ruler with 1 mm graduations gives \\(\Delta x = 0.5\\) mm. A measurement reads 23.4 cm, so the result is:

\\[L = (23.4 \pm 0.05) \text{ cm}\\]
{: .formula-large }

When you **add or subtract** quantities, absolute errors *add*:

\\[z = x + y \implies \Delta z = \Delta x + \Delta y\\]
{: .formula-large }

\\[z = x - y \implies \Delta z = \Delta x + \Delta y\\]
{: .formula-large }
{: .theory-section }

---

## % Relative Error
{: .section-heading }

The **relative error** \\(\varepsilon_r\\) (or **fractional error**) expresses the uncertainty as a fraction — or percentage — of the measured value:

\\[\varepsilon_r = \frac{\Delta x}{x}\\]
{: .formula-large }

\\[\varepsilon_r\% = \frac{\Delta x}{x} \times 100\\]
{: .formula-large }

The relative error tells you *how significant* the uncertainty is. A 1 mm error on a 10 m rope (0.01 %) is very different from a 1 mm error on a 5 mm bolt (20 %).

**Example (continuing from above):**

\\[\varepsilon_r = \frac{0.05 \text{ cm}}{23.4 \text{ cm}} \approx 0.0021 \approx 0.21\%\\]
{: .formula-large }

When you **multiply or divide** quantities, relative errors *add*:

\\[z = x \cdot y \implies \varepsilon_r(z) = \varepsilon_r(x) + \varepsilon_r(y)\\]
{: .formula-large }

\\[z = \frac{x}{y} \implies \varepsilon_r(z) = \varepsilon_r(x) + \varepsilon_r(y)\\]
{: .formula-large }

For powers \\(z = x^n\\):

\\[\varepsilon_r(z) = \lvert n \rvert \cdot \varepsilon_r(x)\\]
{: .formula-large }
{: .theory-section }

---

## 🔄 Propagating Errors to Derived Quantities
{: .section-heading }

Kinematic quantities are derived from measured lengths and times. Errors in those measurements propagate to the result.

### Velocity from Distance and Time

\\[v = \frac{\Delta x}{\Delta t}\\]

The relative error on velocity is:

\\[\varepsilon_r(v) = \varepsilon_r(\Delta x) + \varepsilon_r(\Delta t) = \frac{\Delta(\Delta x)}{\Delta x} + \frac{\Delta(\Delta t)}{\Delta t}\\]
{: .formula-large }

**Example:** a car covers \\(\Delta x = (100 \pm 0.5)\\) m in \\(\Delta t = (8.0 \pm 0.1)\\) s.

\\[v = \frac{100}{8.0} = 12.5 \text{ m/s}\\]

\\[\varepsilon_r(v) = \frac{0.5}{100} + \frac{0.1}{8.0} = 0.005 + 0.0125 = 0.0175\\]

\\[\Delta v = 0.0175 \times 12.5 \approx 0.22 \text{ m/s}\\]

\\[v = (12.5 \pm 0.2) \text{ m/s}\\]
{: .formula-large }

### Acceleration from Velocity and Time

\\[a = \frac{\Delta v}{\Delta t}\\]

\\[\varepsilon_r(a) = \varepsilon_r(\Delta v) + \varepsilon_r(\Delta t)\\]
{: .formula-large }
{: .theory-section }

---

## 📊 Summary Table
{: .section-heading }

| Concept | Symbol | Formula | Unit |
|---|---|---|---|
| Absolute error | \\(\Delta x\\) | half resolution (single reading) | same as quantity |
| Relative error | \\(\varepsilon_r\\) | \\(\Delta x / x\\) | dimensionless |
| Relative error (%) | \\(\varepsilon_r\%\\) | \\((\Delta x / x) \times 100\\) | % |
| Error on sum/diff | \\(\Delta z\\) | \\(\Delta x + \Delta y\\) | same as quantity |
| Error on product/quotient | \\(\varepsilon_r(z)\\) | \\(\varepsilon_r(x) + \varepsilon_r(y)\\) | dimensionless |
| Error on power | \\(\varepsilon_r(z)\\) | \\(\lvert n \rvert \cdot \varepsilon_r(x)\\) | dimensionless |
{: .theory-section }

---

## 💡 Key Takeaways
{: .section-heading }

**1. Three base quantities** — length (m), time (s), and mass (kg) are the building blocks of all kinematic formulas.

**2. SI is universal** — always state the unit; a number without a unit is physically meaningless.

**3. Every measurement has uncertainty** — always report \\(x \pm \Delta x\\) and, when relevant, \\(\varepsilon_r \%\\).

**4. Absolute error for sums; relative error for products** — these two rules cover nearly every formula you will encounter.

**5. Significant figures** — the number of digits you write should be consistent with the precision of your measurement; never write more digits than your uncertainty justifies.
{: .theory-section }

---

## Ready to Experiment?
{: .section-heading }

Now that you understand base quantities, SI units, and measurement uncertainty, try the interactive simulation — measure a car's velocity with real instruments and watch how the error bar changes as you swap to coarser or finer tools!

[▶️ Launch Velocity Measurement Simulation]({{ '/kinematics/physical-quantities.html' | relative_url }}){: .btn .btn-primary .btn-large }
{: .cta-section }
