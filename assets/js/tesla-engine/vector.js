/**
 * Tesla Engine - Vector3D
 * A 3D vector class for physics calculations
 */
export class Vector3D {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    copy(vector) {
        this.x = vector.x;
        this.y = vector.y;
        this.z = vector.z;
        return this;
    }

    clone() {
        return new Vector3D(this.x, this.y, this.z);
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
        return this;
    }

    subtract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        this.z -= vector.z;
        return this;
    }

    scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }

    scaled(scalar) {
        return this.clone().scale(scalar);
    }

    dot(vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }

    lengthSquared() {
        return this.dot(this);
    }

    length() {
        return Math.sqrt(this.lengthSquared());
    }

    normalize() {
        const len = this.length();

        if (len > 0) {
            this.scale(1 / len);
        }

        return this;
    }

    zero() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        return this;
    }

    toArray() {
        return [this.x, this.y, this.z];
    }

    static add(a, b) {
        return new Vector3D(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    static subtract(a, b) {
        return new Vector3D(a.x - b.x, a.y - b.y, a.z - b.z);
    }

    static scale(vector, scalar) {
        return new Vector3D(vector.x * scalar, vector.y * scalar, vector.z * scalar);
    }
}
