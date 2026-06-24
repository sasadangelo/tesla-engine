/**
 * Tesla Engine - World
 * Manages the physics simulation world with gravity and bodies
 */
import { Vector3D } from './vector.js';

export class World {
    constructor({ gravity = new Vector3D(0, -9.81, 0) } = {}) {
        this.gravity = gravity.clone();
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
        }

        this.time += deltaTime;
        return this;
    }
}

// Made with Bob
