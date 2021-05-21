import { createTyped } from "./utils/create"

/** Interface for supported array in [[Serie]]:
 * -    Array
 * -    TypedArray with either shared or not buffer
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
    filter(cb: Function): IArray
}

/**
 * T is either an Array, or a TypedArray (Float32Array etc...) supported by an
 * ArrayBuffer or SharedArrayBuffer
 * @category DataFrame
 */
export class Serie<T extends IArray = IArray> {
    
    /**
     * The underlying array of the serie
     */
    public readonly array: T

    /**
     * The itemSize is the dimension of one 'cell' of the serie
     */
    public readonly itemSize: number

    /**
     * Whether or not [[array]] is a SharedArrayBuffer
     */
    public readonly shared: boolean

    /**
     * 
     * Mutable dictionary to store consumer data (context information of the usage)
     */
    public userData: {[key:string]: any} = {}

    private constructor(
        array: T, 
        itemSize: number, 
        shared: boolean,
        userData: {[key:string]: any} = {}
        ) {

        if (array.length%itemSize !== 0) 
            throw new Error(`array length (${array.length}) is not a multiple of itemSize (${itemSize})`)
        this.array = array
        this.itemSize = itemSize
        this.shared = shared
        this.userData = userData
    }

    /**
     * 
     * @param array The array of values. Can be either an instance of Array or a TypedArray.
     * For TypeArray, the underlaying buffer can be either of type ArrayBuffer or
     * SharedArrayBuffer
     * @param itemSize The size of each item. [[count]] will be array.length / [[itemSize]]
     * @param userData user data
     */
    static create<T extends IArray = IArray>({
            array, itemSize, userData
        }:
        {
            array: T, itemSize: number, userData?: {[key:string]: any}
        }
    ){
        if (itemSize<=0)      throw new Error('itemSize must be > 0')
        if (array===undefined) throw new Error('array must be provided')
        
        // Type is either a Int8Array, Uint8Array etc...
        const shared = (array as any).buffer instanceof SharedArrayBuffer
        
        return new Serie(array, itemSize, shared, userData)
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

    /**
     * Iterate over all items
     * @param callback The callback that will called for each item
     */
    forEach( callback: Function) {
        for (let i=0; i<this.count; ++i) {
            callback(this.itemAt(i), i, this)
        }
    }

    /**
     * Map the items
     */
    map(callback: Function) {
        const tmp = callback(this.itemAt(0), 0, this)
        
        const itemSize = (Array.isArray(tmp) ? tmp.length : 1)
        const R = this.image(this.count, itemSize)
        
        let id = 0
        for (let i=0; i<this.count; ++i) {
            const r = callback(this.itemAt(i), i, this)
            if (itemSize===1) {
                R.array[id++] = r
            }
            else {
                for (let j=0; j<itemSize; ++j) {
                    R.array[id++] = r[j]
                }
            }
        }
        return R
    }

    /**
     * Reduce each item
     */
    // reduce(callback: Function, accumulator: number|number[]) {
    //     if (this.itemSize === 1) {
    //         return this.array.reduce(callback as any, accumulator)
    //     }
    //     // for (let i of iterable) {
    //     //     accumulator = reduceFn(accumulator, i)
    //     // }
    //     // return accumulator
        
    //     const R = this.image(this.count, this.itemSize)
    //     let id = 0
    //     for (let i=0; i<this.count; ++i) {
    //         const r = callback(this.itemAt(i), i, this)
    //         for (let j=0; j<this.itemSize; ++j) {
    //             R.array[id++] = r[j]
    //         }
    //     }
    //     return R
    // }
    
    /**
     * Return a new serie similar to this (same type of array and buffer), and with
     * the same values in the array.
     * @param resetValues True if reset the values to 0, false otherwise (default)
     */
    clone(resetValues: boolean = false) {
        const s = new Serie(this.array.slice(0, this.count*this.itemSize), this.itemSize, this.shared, this.userData)
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
        return new Serie( createFrom({array:this.array, count, itemSize}), itemSize, this.shared, this.userData)
    }
}

// --------------------------------------------------

/**
 * @category Creation
 */
export function createFrom<T extends IArray>(
    {array, count, itemSize}:
    {array: T, count: number, itemSize: number}): IArray {

    if (Array.isArray(array)) {
        return new Array(count*itemSize)
    }

    const isShared = (array as any).buffer instanceof SharedArrayBuffer
    const length = count*itemSize
    if (array instanceof Int8Array)         return createTyped(Int8Array,         length, isShared)
    if (array instanceof Uint8Array)        return createTyped(Uint8Array,        length, isShared)
    if (array instanceof Uint8ClampedArray) return createTyped(Uint8ClampedArray, length, isShared)
    if (array instanceof Int16Array)        return createTyped(Int16Array,        length, isShared)
    if (array instanceof Uint16Array)       return createTyped(Uint16Array,       length, isShared)
    if (array instanceof Int32Array)        return createTyped(Int32Array,        length, isShared)
    if (array instanceof Uint32Array)       return createTyped(Uint32Array,       length, isShared)
    if (array instanceof Float32Array)      return createTyped(Float32Array,      length, isShared)
    if (array instanceof Float64Array)      return createTyped(Float64Array,      length, isShared)
    if (array instanceof BigInt64Array)     return createTyped(BigInt64Array,     length, isShared)
    if (array instanceof BigUint64Array)    return createTyped(BigUint64Array,    length, isShared)
}
