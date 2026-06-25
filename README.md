# Tesla Engine — Interactive Physics Simulations

A collection of interactive physics simulations built with a custom JavaScript physics engine and a [Jekyll](https://jekyllrb.com/) static site.

🌐 **Live site:** https://sasadangelo.github.io/tesla-engine/

---

## Project Structure

```
tesla-engine/
├── _config.yml              # Jekyll config — development (localhost:5001)
├── _config_prod.yml         # Jekyll config — production (GitHub Pages)
├── Gemfile                  # Ruby dependencies
│
├── _includes/
│   ├── header.html          # Shared site header
│   └── footer.html          # Shared site footer
│
├── _layouts/
│   ├── default.html         # Base layout
│   ├── home.html            # Home page (no sidebar)
│   ├── simulation.html      # Simulation pages (left panel + canvas)
│   └── theory.html          # Theory pages (header + breadcrumb + content)
│
├── _pages/
│   ├── uniform-motion-theory.md      # Uniform motion theory content
│   └── projectile-motion-theory.md   # Projectile motion theory content
│
├── assets/
│   ├── css/
│   │   └── styles.css       # All site styles
│   └── js/
│       ├── tesla-engine/    # Core physics engine
│       │   ├── vector.js    # 3D vector math
│       │   ├── body.js      # Physical body (mass, forces, Euler integration)
│       │   └── world.js     # Physics world (gravity, body management)
│       ├── uniform-motion/
│       │   ├── uniform-motion.js      # Speed race simulation logic
│       │   └── uniform-motion-app.js  # UI wiring
│       └── projectile-motion/
│           ├── projectile-motion.js     # Projectile simulation logic
│           └── projectile-motion-app.js # UI wiring
│
├── index.html               # Home page
├── uniform-motion.html      # Speed race simulation page
└── projectile-motion.html   # Projectile motion simulation page
```

---

## Prerequisites

- **Ruby** ≥ 3.0 — check with `ruby --version`
- **Bundler** — install with `gem install bundler`

---

## Local Development

```bash
# 1. Install dependencies (only needed once)
bundle install

# 2. Start the development server on localhost:5001
bundle exec jekyll serve --port 5001
```

Open http://localhost:5001 in your browser.  
Jekyll watches for changes and rebuilds automatically.

---

## Production Build

```bash
bundle exec jekyll build --config _config_prod.yml
```

The static site is generated in `_site/`.

---

## Deployment (GitHub Pages)

The site is hosted at https://sasadangelo.github.io/tesla-engine/.

Push to the `main` branch and configure GitHub Pages to serve from the repository root (or `_site/` with a custom workflow).  
When building for production the `baseurl` is set to `/tesla-engine` automatically by `_config_prod.yml`.

---

## Available Simulations

| Simulation | Theory | Launch |
|---|---|---|
| Uniform Motion — Speed Race | `/uniform-motion-theory/` | `/uniform-motion.html` |
| Projectile Motion | `/projectile-motion-theory/` | `/projectile-motion.html` |

---

## Tesla Engine (Physics Library)

Located in `assets/js/tesla-engine/`, the engine is a lightweight, modular physics library:

| File | Description |
|---|---|
| `vector.js` | 3D vector class — add, subtract, scale, dot product, normalize |
| `body.js` | Physical body — mass, position, velocity, force integration (Euler) |
| `world.js` | Physics world — manages bodies, applies gravity each tick |

The engine is shared across all simulations via ES module imports (`import { World } from '../tesla-engine/world.js'`).

---

## Adding a New Simulation

1. Create `assets/js/my-sim/my-sim.js` (simulation logic) and `my-sim-app.js` (UI wiring)
2. Create `my-sim.html` at the root with `layout: simulation` and `sim_script: /assets/js/my-sim/my-sim-app.js`
3. Create `_pages/my-sim-theory.md` with `layout: theory`
4. Add a card to `index.html`
