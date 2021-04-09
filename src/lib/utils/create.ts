import { IArray, Serie } from "../serie"

/**
 * Create an Array of a given length and with an initial value set
 * for all entries
 * @param length The length of the array
 * @param init A function that has to be called for initialization, a number, or nothing
 * @example
 * ```ts
 * const array1 = create(100, i => i**2)
 * const array2 = create(100, 0)
 * const array3 = create(100)
 * ```
 * @category Creation
 */
 export function createArray(length: number, init: Function | number = undefined) {
    if (init === undefined) return new Array(length).fill(undefined)
    if (init instanceof Function) {
        return new Array(length).fill(undefined).map( (_,i) => init(i) )
    }
    return new Array(length).fill(init)
}

/**
 * Create a TypedArray of a given length (number of entries) that can shared or not
 * @param Type The type of the array (Int8Array, Uint8Array, Uint8ClampedArray,
 * Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array,
 * BigInt64Array, BigUint64Array)
 * @param length The number of entries
 * @param shared If the Typed has SharedArrayBuffer or not
 * @example
 * ```ts
 * const sharedArray = createTyped(Float32Array, 100, true)
 * ```
 * @category Creation
 */
export function createTyped(Type: any, length: number, shared: boolean) {
    const l = length*Type.BYTES_PER_ELEMENT
    if (shared) {
        return new Type(new SharedArrayBuffer(l))
    }
    return new Type(new ArrayBuffer(l))
}

/**
 * Create a serie given an array (Array or TypedArray with ArrayBuffer or SharedArrayBuffer).
 * @param data The array
 * @param itemSize The item size. The length of T should be a multiple of itemSize
 * @returns The newly created Serie
 * @category Creation
 */
 export function createSerie<T extends IArray>(data: T, itemSize = 1) {
    if (itemSize<=0)      throw new Error('itemSize must be > 0')
    if (data===undefined) throw new Error('either data or rowCount must be provided')

    if (Array.isArray( data )) {
        return new Serie(data, itemSize, false)
    }

    // Type is either a Int8Array, Uint8Array etc...
    const shared = (data as any).buffer instanceof SharedArrayBuffer
    return new Serie<T>(data, itemSize, shared)
}

/**
 * Create a serie from scratch given a type (Array or TypedArray) and a rowsCount.
 * Passed parameters are:
 * ```ts
 * {
 *      Type, // Can be either an Array or a TypedArray.
 *      count, // The number of elements in the array
 *      itemSize, // The size of each items (length of the array will be rowsCount*itemSize)
 *      shared // If the TypedArray should be a SharedArrayBuffer or an ArrayBuffer
 * }
 * ```
 * @returns The newly created Serie
 * @category Creation
 */
export function createEmptySerie<T extends IArray>(
    {Type, count, itemSize=1, shared=false}:
    {Type?:any, count: number, itemSize?: number, shared?: boolean})
{
    if (itemSize<=0)  throw new Error('itemSize must be > 0')
    if (count<=0) throw new Error('count must be > 0')

    if (Type===undefined || Array.isArray( new Type(1) )) {
        return new Serie(new Array(count*itemSize).fill(0), itemSize, false)
    }

    // Type is either a Int8Array, Uint8Array etc...
    const length = count*itemSize*Type.BYTES_PER_ELEMENT
    if (shared) {
        return new Serie<T>(new Type(new SharedArrayBuffer(length)), itemSize, true)
    }
    return new Serie<T>(new Type(new ArrayBuffer(length)), itemSize, false)
}