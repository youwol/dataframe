
/**
 * @category DataFrame
 */
export type ASerie = Serie<IArray>

/**
 * @category DataFrame
 */
export interface IArray {
    readonly length: number
    [i: number]: number
    map(cb: Function): IArray
    forEach(cb: Function): void
    slice(start: number, end: number): IArray
    fill(n: number): IArray
    reduce<U>(
        callback: (state: U, element: number, index: number, array: number[]) => U,
        firstState?: U
    ): U
}

/**
 * T is either an Array, or a TypedArray (Float32Array etc...) supported by an
 * ArrayBuffer or SharedArrayBuffer
 * @category DataFrame
 */
export class Serie<T extends IArray> {
    /**
     * @ignore
     * @param array The array of values. Can be either an instance of Array or a TypedArray.
     * For TypeArray, the underlaying buffer can be either of type ArrayBuffer or
     * SharedArrayBuffer
     * @param itemSize The size of each item. [[count]] will be array.length / [[itemSize]]
     */
    constructor(public readonly array: T, public readonly itemSize: number, public readonly shared: boolean) {
        if (array.length%itemSize !== 0) throw new Error(`array length (${array.length}) is not a multiple of itemSize (${itemSize})`)
    }
    /**
     * Get the size of this serie, i.e., being [[count]] * [[itemSize]]
     */
    get length() {
        return this.array.length
    }
    /**
     * Get the number of items (an item being of size [[itemCount]])
     */
    get count() {
        return this.array.length / this.itemSize
    }
    get isArray() {
        return Array.isArray(this.array)
    }
    get isArrayBuffer() {
        return !this.isArray
    }
    
    at(i: number) {
        return this.array[i]
    }

    itemAt(i: number) {
        const size = this.itemSize
        if (size===1) return this.at(i)
        const start = i*size
        const r = new Array(size).fill(0)
        for (let j=0; j<size; ++j) r[j] = this.array[start+j]
        return r
    }

    forEachItem( callback: Function) {
        for (let i=0; i<this.count; ++i) {
            callback(this.itemAt(i), i, this)
        }
    }
    
    /**
     * Return a new serie similar to this (same type of array and buffer), and with
     * the same values in the array.
     * @param resetValues True if reset the values to 0, false otherwise (default)
     */
    clone(resetValues: boolean = false) {
        const s = new Serie(this.array.slice(0, this.count*this.itemSize), this.itemSize, this.shared)
        if (resetValues) {
            s.array.forEach( (_,i) => s.array[i] = 0 ) // reset
        }
        return s
    }

    /**
     * Return a new serie similar to this (same type of array and buffer), but with
     * different count and itemSize. All values are initialized to 0.
     * @param count    The number of items 
     * @param itemSize The size of the items
     * @see [[createEmptySerie]]
     */
    image(count: number, itemSize: number) {
        const s = new Serie(this.array.slice(0, count*itemSize), itemSize, this.shared)
        s.array.forEach( (_,i) => s.array[i] = 0 ) // reset
        return s
    }
}

/**
 * Create a serie given an array (Array or TypedArray with ArrayBuffer or SharedArrayBuffer).
 * @param data The array
 * @param itemSize The item size. The length of T should be a multiple of itemSize
 * @returns The newly created Serie
 * @category DataFrame
 */
export function createSerie<T extends IArray>(data: T, itemSize = 1) {
    if (itemSize<=0)      throw new Error('itemSize must be > 0')
    if (data===undefined) throw new Error('either data or rowCount must be provided')

    if (Array.isArray( data )) {
        return new Serie(data, itemSize, false)
    }

    // Type is either a Int8Array, Uint8Array etc...
    return new Serie<T>(data, itemSize, true)
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
 * @category DataFrame
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
