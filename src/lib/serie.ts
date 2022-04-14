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
        callback: (previousValue: number, currentValue: number, currentIndex: number, array: IArray) => number,
        firstState?: U
    ): U
    filter(cb: Function): IArray
    sort(fn: Function): IArray
}

/**
 * T is either an Array, or a TypedArray (Float32Array etc...) supported by an
 * ArrayBuffer or SharedArrayBuffer
 * @category Base
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

    static isSerie(s: any): boolean {
        return 'array' in s && 'itemSize' in s
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
        // Type is either a Int8Array, Uint8Array etc...
        
        if (itemSize<=0)      throw new Error('itemSize must be > 0')
        if (array===undefined) throw new Error('array must be provided')

        // Check that SharedArrayBuffer are supported...
        if (typeof SharedArrayBuffer === "undefined") {
            return new Serie(array, itemSize, false, userData)
        }

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

    /**
     * True if this serie is an Array<number
     */
    get isArray() {
        return Array.isArray(this.array)
    }

    /**
     * True if this serie is a TypedArray
     * @see isTypedArray
     */
    get isArrayBuffer() {
        return this.isTypedArray
    }

    /**
     * True if this serie is a TypedArray
     * @see isArrayBuffer
     */
    get isTypedArray() {
        return !this.isArray
    }

    /**
     * True if this serie is the buffer of the TypedArray is
     * a SharedArrayBuffer
     */
    get isShared() {
        if (this.isArray) return false
        return (this.array as any).buffer instanceof SharedArrayBuffer
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

    setItemAt(i: number, value: number | IArray): void {
        if (i>= this.count) throw new Error('array index out of bounds')

        const size = this.itemSize

        if (size === 1) {
            if (Array.isArray(value)) throw new Error('value must be a number')
            this.array[i] = value as number
            return
        }

        const v = value as number[]
        if (v.length !== size) throw new Error(`array length (${v.length}) must equals itemSize (${size})`)
        for (let j=0; j<size; ++j) {
            this.array[i*size+j] = value[j]
        }
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
    //
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
     * the same count and itemSize.
     * @param resetValues True if reset the values to 0, false otherwise (default)
     * @see newInstance
     * @see image
     */
    clone(resetValues: boolean = false) {
        const s = new Serie(this.array.slice(0, this.count*this.itemSize), this.itemSize, this.shared, this.userData)
        if (resetValues) {
            s.array.forEach( (_,i) => s.array[i] = 0 ) // reset
        }
        return s
    }

    /**
     * Same as [[image]]. All values are set to 0 (i.e., 0, [0,0], [0,0,0]...)
     * @see clone
     * @see image
     */
    newInstance({count, itemSize, initialize=true}:{count: number, itemSize: number, initialize?: boolean}) {
        // const s = new Serie(this.array.slice(0, count*itemSize), itemSize, this.shared, this.userData)
        // s.array.forEach( (_,i) => s.array[i] = 0 )
        // return s
        const s = new Serie( createFrom({array:this.array, count, itemSize}), itemSize, this.shared, this.userData)
        if (initialize) {
            for (let i=0; i<s.array.length; ++i) s.array[i] = 0
        }
        return s
    }

    /**
     * Return a new serie similar to this (same type of array and buffer), but with
     * different count and itemSize. All values are initialized to 0. We keep this
     * mathod for compatibility reason.
     * @param count    The number of items 
     * @param itemSize The size of the items
     * @see clone
     * @see newInstance
     */
    image(count: number, itemSize: number) {
        // console.warn('warning: deprecated function')
        return this.newInstance({count, itemSize})
    }
}

// --------------------------------------------------

/**
 * @category Creation
 */
export function createFrom<T extends IArray>(
    {array, count, itemSize}:
    {array: T, count: number, itemSize: number}): IArray {

    const length = count*itemSize

    if (Array.isArray(array)) {
        return new Array(length)
    }

    let isShared = false
    if (typeof SharedArrayBuffer !== "undefined") {
        isShared = (array as any).buffer instanceof SharedArrayBuffer
    }
    
    
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
