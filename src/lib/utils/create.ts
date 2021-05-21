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
 * Create a TypedArray of a given length (number of entries) that can be shared or not.
 * The length is either provided directly, or by an array that will be used to
 * initialize the type array.
 * @param Type The type of the array:
 * <ul>
 * <li>Int8Array
 * <li>Uint8Array
 * <li>Uint8ClampedArray
 * <li>Int16Array
 * <li>Uint16Array
 * <li>Int32Array
 * <li>Uint32Array
 * <li>Float32Array
 * <li>Float64Array
 * <li>BigInt64Array
 * <li>BigUint64Array
 * </ul>
 * @param data The number of entries or an array of number
 * @param shared If the Typed has SharedArrayBuffer or not
 * @example
 * ```ts
 * const sharedArray = createTyped(Float32Array, 100, true)
 * const array       = createTyped(Float32Array, [1,2,3,4,5,6,7,8,9], false)
 * ```
 * @category Creation
 */
export function createTyped(Type: any, data: number|number[], shared: boolean) {
    if (Array.isArray(data)) {
        const length = data.length*Type.BYTES_PER_ELEMENT
        let ta = undefined
        if (shared) {
            ta = new Type(new SharedArrayBuffer(length))
        }
        else {
            ta = new Type(new ArrayBuffer(length))
        }
        ta.set(data)
        return ta
    }
    else {
        const l = data*Type.BYTES_PER_ELEMENT
        if (shared) {
            return new Type(new SharedArrayBuffer(l))
        }
        return new Type(new ArrayBuffer(l))
    }
}

/**
 * Create a serie given an array (Array or TypedArray with ArrayBuffer or SharedArrayBuffer).
 * @param param0 An object with data and itemSize: `{data: T, itemSize: number = 1}`
 * @returns The newly created Serie
 * @example
 * ```ts
 * const coordinates = [0,3,2,7,4,8,6,5,2]
 * 
 * // s1 is a serie supporting a SharedArrayBuffer
 * const s1 = createSerie({
 *      data    : createTyped(Float32Array, coordinates, true),
 *      itemSize: 3
 * })
 * 
 * // s2 is a serie supporting an ArrayBuffer
 * const s2 = createSerie({
 *      data    : createTyped(Float64Array, coordinates, false),
 *      itemSize: 3
 * })
 * 
 * // s3 is an Array
 * const s3 = createSerie({
 *      data    : coordinates,
 *      itemSize: 3
 * })
 * ```
 * @category Creation
 */
 export function createSerie<T extends IArray>({
     data, 
     itemSize=1,
     userData
    }:{
        data: T, 
        itemSize?: number, 
        userData?: {[key:string]: any}}) {

    if (itemSize<=0)      throw new Error('itemSize must be > 0')
    if (data===undefined) throw new Error('either data or rowCount must be provided')
    
    if (Array.isArray( data )) {
        return Serie.create({array:data, itemSize, shared:false, userData})
    }

    // Type is either a Int8Array, Uint8Array etc...
    const shared = (data as any).buffer instanceof SharedArrayBuffer
    return Serie.create({array:data, itemSize, shared, userData})
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
export function createEmptySerie(
    {Type, count, itemSize=1, shared=false, userData}:
    {Type?:any, count: number, itemSize?: number, shared?: boolean, userData?:{[key:string]: any}}
    ) : Serie
{
    if (itemSize<=0)  throw new Error('itemSize must be > 0')
    if (count<=0) throw new Error('count must be > 0')

    if (Type===undefined || Array.isArray( new Type(1) )) {
        return Serie.create({
            array: new Array(count*itemSize).fill(0), 
            itemSize, 
            shared:false
        })
    }

    // Type is either a Int8Array, Uint8Array etc...
    const length = count*itemSize*Type.BYTES_PER_ELEMENT
    if (shared) {
        return Serie.create({
            array: new Type(new SharedArrayBuffer(length)), itemSize, shared:true, userData})
    }
    return Serie.create({ array:new Type(new ArrayBuffer(length)), itemSize, shared:false,userData})
}
