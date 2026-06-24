/**
 * Tesla Engine - Body
 * Represents a physical body with mass, position, velocity, and forces
 */
import { Vector3D } from './vector.js';

export class Body {
    constructor({
        mass = 1,
        position = new Vector3D(),
        velocity = new Vector3D(),
    } = {}) {
        this.mass = mass;
        this.position = position.clone();
        this.velocity = velocity.clone();
        this.force = new Vector3D();
    }

    applyForce(force) {
        this.force.add(force);
        return this;
    }

    clearForces() {
        this.force.zero();
        return this;
    }

    getInverseMass() {
        return this.mass > 0 ? 1 / this.mass : 0;
    }

    integrate(deltaTime, gravity = new Vector3D()) {
        if (this.mass <= 0) {
            this.clearForces();
            return this;
        }

        const acceleration = gravity.clone().add(this.force.scaled(this.getInverseMass()));

        this.velocity.add(acceleration.scaled(deltaTime));
        this.position.add(this.velocity.scaled(deltaTime));

        this.clearForces();
        return this;
    }
}

// Made with Bob
