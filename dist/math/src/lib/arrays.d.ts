interface IArray {
    [i: number]: number;
    length: number;
    map(cb: Function): IArray;
    filter(cb: Function): IArray;
}
/**
 * @category Array
 */
export declare function minArray(array: IArray): number;
/**
 * @category Array
 */
export declare function maxArray(array: IArray): number;
/**
 * @category Array
 */
export declare function minMaxArray(array: IArray): Array<number>;
/**
 * @category Array
 */
export declare function normalizeArray(array: IArray): IArray;
/**
 * @category Array
 */
export declare function scaleArray(array: IArray, s: number): IArray;
/**
 *  Return the indices from array that contain NaN values
 * @param array The array of number
 * @category Array
 */
export declare function dectectNan(array: IArray): IArray;
/**
 * @category Array
 */
export declare function flatten(array: Array<Array<number>>): Array<number>;
export {};
