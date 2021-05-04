import { Matrix3 } from './matrix3';
import { Vector3 } from './vectors';
export declare class Quaternion {
    private q;
    /**
     *
     * @param {Vector3} axis Axis of ratation
     * @param {number} angle Angle of rotation in radian
     */
    static fromAxisAngle(axis: Vector3, angle: number): Quaternion;
    static fromProd(a: Quaternion, b: Quaternion): Quaternion;
    static fromBase(X: Vector3, Y: Vector3, Z: Vector3): Quaternion;
    static fromRotationMatrix(r: Matrix3): Quaternion;
    static fromTo(from: Vector3, to: Vector3): Quaternion;
    get data(): number[];
    get axis(): Vector3;
    get angle(): number;
    equals(q: Quaternion): boolean;
    notEquals(q: Quaternion): boolean;
    prod(q: Quaternion): this;
    inverse(): Quaternion;
    invert(): this;
    negate(): this;
    normalize(): number;
    dot(A: Quaternion, B: Quaternion): number;
    /**
     * Rorate inverse a vector
     * @param {Vec3} V The vector to inverse rotate
     * @returns {Vec3} The rotated vector
     */
    iRotate(v: Vector3): Vector3;
    /**
     * Rotate a vector
     * @param {Vec3} v The vector to rotate
     * @returns {Vec3} The rotated vector
     */
    rotate(v: Vector3): number[];
    /**
     * @return [xx,xy,xz,yy,yz,zz] the rotation matrix (symm)
     */
    toMatrix(): number[];
    setFrom(q: Quaternion): this;
    /**
     *
     * @param {Vec3} v The axis of rotation
     * @param {Number} angle
     */
    setAxisAngle(v: Vector3, angle: number): this;
    setFromTo(from: Vector3, to: Vector3): this;
    /**
     *
     * @param {Mat3} r The roration matrix
     */
    setFromRotationMatrix(m: Matrix3): this;
    setFromBase(X: Vector3, Y: Vector3, Z: Vector3): this;
}
