export interface IArray {
    readonly length: number
    [i: number]: number
    map(cb: Function): number[]
    forEach(cb: Function): void
    slice(start: number, end: number): IArray
    fill(n: number)
}

/**
 * T is either an Array, or a TypedArray (Float32Array etc...) supported by an
 * ArrayBuffer or SharedArrayBuffer
 */
export class Serie<T extends IArray> {
    constructor(public readonly array: T, public readonly itemSize: number, public readonly shared: boolean) {
    }
    get length() {
        return this.array.length
    }
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
    clone() {
        return createSerie({data: this.array, itemSize: this.itemSize, shared: this.shared})
    }
}

/**
 * Create a serie given an array (Array or TypedArray with ArrayBuffer or SharedArrayBuffer)
 * @param param The passed parameters `{data, itemSize=1, shared=1}`
 * @returns The newly created Serie
 */
export function createSerie<T extends IArray>({data, itemSize=1, shared=false}:
    {data: any, itemSize?: number, shared?: boolean})
{
    if (itemSize<=0)      throw new Error('itemSize must be > 0')
    if (data===undefined) throw new Error('either data or rowCount must be provided')

    const rowsCount = data.length/itemSize

    if (Array.isArray( data )) {
        return new Serie(data, itemSize, false)
    }

    // Type is either a Int8Array, Uint8Array etc...
    if (shared) {
        return new Serie<T>(data, itemSize, true)
    }
    return new Serie<T>(data, itemSize, false)
}

/**
 * Create a serie from scratch given a type (Array or TypedArray) and a rowsCount
 * @param param The passed parameters `{Type, rowsCount, itemSize=1, shared=false}`
 * @returns The newly created Serie
 */
export function createEmptySerie<T extends IArray>({Type, rowsCount, itemSize=1, shared=false}:
    {Type?:any, rowsCount: number, itemSize?: number, shared?: boolean})
{
    if (itemSize<=0)  throw new Error('itemSize must be > 0')
    if (rowsCount<=0) throw new Error('rowCount must be > 0')

    if (Type===undefined || Array.isArray( new Type(1) )) {
        return new Serie(new Array(rowsCount*itemSize).fill(0), itemSize, false)
    }

    // Type is either a Int8Array, Uint8Array etc...
    const count = rowsCount*itemSize*Type.BYTES_PER_ELEMENT
    if (shared) {
        return new Serie<T>(new Type(new SharedArrayBuffer(count)), itemSize, true)
    }
    return new Serie<T>(new Type(new ArrayBuffer(count)), itemSize, false)
}
