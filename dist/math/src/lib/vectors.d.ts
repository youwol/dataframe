export interface IVector {
    [i: number]: number;
    reduce(cb: Function, init: number): any;
    map(cb: Function): IVector;
    forEach(cb: Function): void;
    [Symbol.iterator](): any;
    readonly length: number;
}
/**
 * @category Vector
 */
export declare type Vector2 = [number, number];
/**
 * @category Vector
 */
export declare type Vector3 = [number, number, number];
/**
 * @category Vector
 */
export declare type Vector4 = [number, number, number, number];
/**
 * @category Vector
 */
export declare type Vector6 = [number, number, number, number, number, number];
/**
* @category Vector
*/
export declare type Vector9 = [number, number, number, number, number, number, number, number, number];
/**
 * @category Vector
 */
export declare const create: (v1: IVector, v2: IVector) => IVector;
/**
 * @category Vector
 */
export declare const norm2: (v: IVector) => any;
/**
 * @category Vector
 */
export declare const norm: (v: IVector) => number;
/**
 * Perform (a+b)
 * @category Vector
 */
export declare const add: (a: IVector, b: IVector) => IVector;
/**
 * Perform (a-b)
 * @category Vector
 */
export declare const sub: (a: IVector, b: IVector) => IVector;
/**
 * @category Vector
 */
export declare const scale: (v: IVector, s: number) => IVector;
/**
 * @category Vector
 */
export declare const setCoord: (v: IVector, i: number, value: number) => number;
/**
 * @category Vector
 */
export declare const set: (v: IVector, v1: IVector) => void;
/**
 * @category Vector
 */
export declare const dot: (a: IVector, b: IVector) => number;
/**
 * @category Vector
 */
export declare const cross: (v: Vector3, w: Vector3) => Vector3;
/**
 * @category Vector
 */
export declare const normalize: (v: IVector) => IVector;
export declare const clone: (v: IVector) => IVector;
