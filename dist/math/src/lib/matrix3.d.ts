import { Vector3 } from "./vectors";
/**
 * @category Matrix
 */
export declare type Matrix3 = [Vector3, Vector3, Vector3];
/**
 * @category Matrix
 */
export declare function det(m: Matrix3): number;
export declare function multVec(e: Matrix3, v: Vector3): Vector3;
export declare function multTVec(e: Matrix3, v: Vector3): Vector3;
/**
 * @category Matrix
 */
export declare function inv(me: Matrix3, throwOnDegenerate: boolean): any;
/**
 * @category Matrix
 */
export declare function transpose(m: Matrix3): any;
/**
 * @brief Rotate CCW (angle in degrees) along the provided axis.
 * @param m The matrix
 * @param angleInDeg The angle of rotation
 * @param AXIS The axis of rotation/ Can be either `x`, `X`, `y`, `Y`, `z`, or `Z`.
 * @category Matrix
 */
export declare function rotate(m: Matrix3, angleInDeg: number, AXIS: string): Matrix3;
/**
 * Rotate inverse a [[Matrix3]] according to a rotation matrix
 * @param {Matrix3} rot The rotation matrix (antisymmetric)
 * @param {Matrix3} m The matrix3 to rotate
 */
export declare function rotateInverse(m: Matrix3, rot: Matrix3): Matrix3;
/**
 * Rotate forward a [[Matrix3]] according to a rotation matrix
 * @param {Matrix3} rot The rotation matrix (antisymmetric)
 * @param {Matrix3} m The matrix3 to rotate
 */
export declare function rotateForward(m: Matrix3, rot: Matrix3): Matrix3;
