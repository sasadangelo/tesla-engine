/**
 * Tesla Engine - World
 * Manages the physics simulation world with gravity and bodies.
 *
 * linearDamping (0..∞) — resistance of the medium (air, water, vacuum).
 *   0   = perfect vacuum  → no drag at all
 *   1   = light air       → gentle resistance
 *   >1  = denser medium   → strong resistance
 *
 * The drag force applied to each body each step is:
 *   F_drag = -linearDamping * body.dragCoefficient * velocity
 *
 * This keeps "environment" on World and "shape/size" on Body,
 * matching the physics: F_drag = ½ · ρ · Cd · A · v  (linearised).
 */
import { Vector3D } from './vector.js';

export class World {
    constructor({ gravity = new Vector3D(0, -9.81, 0), linearDamping = 0 } = {}) {
        this.gravity = gravity.clone();
        this.linearDamping = linearDamping;
        this.bodies = [];
        this.time = 0;
    }

    addBody(body) {
        this.bodies.push(body);
        return this;
    }

    removeBody(body) {
        this.bodies = this.bodies.filter((currentBody) => currentBody !== body);
        return this;
    }

    step(deltaTime) {
        for (const body of this.bodies) {
            body.integrate(deltaTime, this.gravity);

            // Apply aerodynamic drag AFTER integration, as a velocity multiplier.
            //
            // Physics: F_drag = -b·v  where  b = linearDamping · dragCoefficient
            // The exact solution for free decay over dt is:  v(t+dt) = v(t) · e^(-b/m · dt)
            // We approximate with the numerically stable factor:
            //   factor = e^(-linearDamping · dragCoefficient / mass · dt)
            //
            // This is always in (0, 1], so it can never overshoot or invert the velocity,
            // regardless of mass, dt, or damping value — unlike the explicit-force approach.
            if (this.linearDamping > 0 && body.dragCoefficient > 0 && body.mass > 0) {
                const decay  = (this.linearDamping * body.dragCoefficient) / body.mass;
                const factor = Math.exp(-decay * deltaTime);
                body.velocity.scale(factor);
            }
        }

        this.time += deltaTime;
        return this;
    }
}
