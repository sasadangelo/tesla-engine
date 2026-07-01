/**
 * Tesla Engine - Body
 * Represents a physical body with mass, position, velocity, and forces.
 *
 * dragCoefficient — combined shape/size factor (Cd · A) of this body.
 *   0   = point mass / no aerodynamic resistance (default, backward-compatible)
 *   ~0.1 = dense sphere (e.g. lead ball)
 *   ~2.0 = flat / irregular shape (e.g. feather)
 *
 * The actual drag force is computed by World using its linearDamping:
 *   F_drag = -world.linearDamping * body.dragCoefficient * velocity
 */
import { Vector3D } from './vector.js';

export class Body {
    constructor({
        mass = 1,
        position = new Vector3D(),
        velocity = new Vector3D(),
        dragCoefficient = 0,
    } = {}) {
        this.mass = mass;
        this.position = position.clone();
        this.velocity = velocity.clone();
        this.force = new Vector3D();
        this.dragCoefficient = dragCoefficient;
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
