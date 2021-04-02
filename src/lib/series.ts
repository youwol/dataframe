export enum DType {
    Int8,    Uint8,
    Int16,   Uint16,
    Int32,   Uint32,
    Float32, Float64
}

const mapType = new Map<DType, string>()
mapType.
    set(DType.Int8,"Int8").
    set(DType.Uint8,"Uint8").
    set(DType.Int16,"Int16").
    set(DType.Uint16,"Uint16").
    set(DType.Int32,"Int32").
    set(DType.Uint32,"Uint32").
    set(DType.Float32,"Float32").
    set(DType.Float64,"Float64")

/*
new ArrayBuffer(16) =>
    --------------------------------------------------------------
    Uint8Array     0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15
    --------------------------------------------------------------
    Uint16Array      0     1     2     3     4     5     6     7
    --------------------------------------------------------------
    Uint32Array         0           1           2           3
    --------------------------------------------------------------
    Float64Array              0                        1
    --------------------------------------------------------------
*/

/**
 * A [[Series]] can be added into a [[DataFrame]].
 * Series supports either ArrayBuffer or SharedArrayBuffer if the browser
 * is supporting.
 * @param data     Either the size or an array for initialization
 * @param itemSize The size of the items store in the array
 * @param dtype    The type of the array (see [[DType]])
 * @param isShared True when using SharedBuffreAttribute, false for ArrayBuffer.
 */
export class Series {
    constructor(data: Array<number>|number, itemSize: number = 1, dtype: DType = DType.Float32, isShared = false) {
        this.dtype_    = dtype
        this.shared_   = isShared
        this.itemSize_ = itemSize

        if (typeof(data) === 'number') {
            const a = (data as number)*itemSize
            //if (a%itemSize !== 0) throw new Error(`data size (${a}) is not a multiple of itemSize (${itemSize})`)
            this.arr_ = this.getType(a, dtype, isShared)
            this.length_ = a
        }
        else {
            const arr = (data as Array<number>) ;
            if (arr.length%itemSize !== 0) throw new Error(`data array length (${arr.length}) is not a multiple of itemSize (${itemSize})`)
            this.arr_ = this.getType(arr.length, dtype, isShared)
            this.length_ = arr.length ;
            for (let i=0; i<arr.length; ++i) this.arr_[i] = arr[i]
        }
    }

    initialize(v: number[] | number) {
        if (typeof(v) === 'number') {
            this.arr_.forEach( (w,i) => this.arr_[i] = v )
        }
        else {
            if (v.length !== this.length) throw new Error(`array length (${v.length}) is different from the series length (${this.length})`)
            this.arr_.forEach( (w,i) => this.arr_[i] = v[i] )
        }
        return this
    }

    forEach = (cb: Function) => this.arr_.forEach(cb, this.arr_)
    map     = (cb: Function) => this.arr_.map(cb)

    /**
     * Return a clone of this Series without copying the values. Only
     * the length, the [[dtype]] and the [[shared]] are used.
     */
    clone() {
        return new Series(this.length_/this.itemSize_, this.itemSize_, this.dtype_, this.shared_)
    }

    deepClone() {
        const s = new Series(this.length_/this.itemSize_, this.itemSize_, this.dtype_, this.shared_)
        s.arr_.set(this.arr_)
        return s
    }

    get dtypeName(){ return mapType.get(this.dtype) }
    get length()   { return this.length_ }
    get itemSize() { return this.itemSize_  }
    get count()    { return this.length_ / this.itemSize_ } 
    get dtype()    { return this.dtype_  }
    get shared()   { return this.shared_ }
    get BYTES_PER_ELEMENT() { return this.arr_.BYTES_PER_ELEMENT }

    /**
     * Get the value at index i
     * @param i index from 0 to [[length]]
     */
    at(i: number): number { return this.arr_[i] }

    /**
     * Get the item at index i
     * @param i index from 0 to [[count]]
     */
    itemAt(i: number): number[] | number {
        const size = this.itemSize
        if (size===1) return this.at(i)
        const start = i*size
        const r = new Array(size).fill(0)
        for (let j=0; j<size; ++j) r[j] = this.arr_[start+j]
        return r
    }

    /**
     * The underlaying TypedArray
     */
    get typedArray() {
        return this.arr_
    }

    info() {
        return {
            dtype: this.dtypeName,
            length: this.length,
            itemSize: this.itemSize,
            count: this.count,
            isShared: this.shared,
            bytesPerElement: this.BYTES_PER_ELEMENT,
            array: this.arr_
        }
    }

    // ---------------------------------------
    // !!! private

    private getType(size: number, dtype: DType, isShared: boolean) {
        let BUFF: any = isShared ? SharedArrayBuffer : ArrayBuffer
        let TYPE: any = Float32Array
        switch(dtype) {
            case DType.Int8   : TYPE = Int8Array   ; break
            case DType.Uint8  : TYPE = Uint8Array  ; break
            case DType.Int16  : TYPE = Int16Array  ; break
            case DType.Uint16 : TYPE = Uint16Array ; break
            case DType.Int32  : TYPE = Int32Array  ; break
            case DType.Uint32 : TYPE = Uint32Array ; break
            case DType.Float32: TYPE = Float32Array; break
            case DType.Float64: TYPE = Float64Array; break
        }

        return new TYPE( new BUFF( size*TYPE.BYTES_PER_ELEMENT ) )
    }

    dtype_: DType = DType.Float32
    shared_ = false
    length_ = 0
    itemSize_ = 1
    arr_: any
}