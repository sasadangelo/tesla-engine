# Physics Engine - Projectile Motion Simulation

A modular physics engine demonstration showing projectile motion with a clean separation of concerns.

## Project Structure

```
physics-engine/
├── index.html                          # Main HTML file
├── css/
│   └── styles.css                      # Application styles
├── js/
│   └── app.js                          # Application logic and UI interaction
├── tesla-engine/                       # Tesla Engine - Reusable physics library
│   ├── vector.js                       # 3D vector mathematics
│   ├── body.js                         # Physical body with mass and forces
│   └── world.js                        # Physics world with gravity
└── projectile-motion/                  # Projectile motion simulation
    └── projectile-motion.js            # Simulation logic, rendering, and animation
```

## Tesla Engine

**Tesla Engine** is the core physics library that powers this simulation. Named after the brilliant inventor Nikola Tesla, it provides fundamental physics components that can be reused across multiple simulations:

- **vector.js**: 3D vector class with mathematical operations (add, subtract, scale, dot product, normalize, etc.)
- **body.js**: Physical body with mass, position, velocity, and force integration using Euler method
- **world.js**: Physics world that manages bodies and applies gravity

The engine is designed to be modular and extensible, making it easy to create new physics simulations.

## Projectile Motion Simulation

The projectile motion simulation demonstrates the Tesla Engine in action:
- **projectile-motion.js**: Encapsulates the simulation logic, canvas rendering, and animation loop

## Application Layer

The application layer handles UI-specific code:
- **app.js**: Handles user input, DOM manipulation, and connects UI to simulation

## Styles

All styling is separated into:
- **styles.css**: Application styles separated from HTML

## How to Run

1. Open `index.html` in a modern web browser (or use a local server)
2. Adjust the initial velocity and launch angle
3. Click "Launch projectile" to see the simulation

## Features

- ⚡ **Tesla Engine**: Modular and reusable physics library
- 🎯 Real-time projectile motion simulation
- 🎨 Interactive controls for velocity and angle
- 📊 Visual trajectory tracking
- 📈 Real-time statistics display (time, x position, y position)
- 🏗️ Clean architecture with separation of concerns

## Architecture Benefits

- **Reusability**: Tesla Engine can be used for other physics simulations
- **Maintainability**: Clear separation between library, simulation, and UI
- **Extensibility**: Easy to add new simulations or physics features
- **Testability**: Each component can be tested independently