function fakeFct(s: Serie<IArray>) {} // ??? if not, it wont compile!

export interface IArray {
    readonly length: number
    [i: number]: number
    map(cb: Function): number[]
    forEach(cb: Function): void
    slice(start: number, end: number): IArray
}

/**
 * T is either Array, or a TypedArray supported by a 
 * ArrayBuffer or SharedArrayBuffer (Float32Array etc...)
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
    info() {
        return {
            isArray: this.isArray,
            isBuffer: this.isArrayBuffer,
            isShared: this.shared,
            length: this.length,
            count: this.count,
            itemSize: this.itemSize,
            array: this.array
        }
    }
}

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

type SerieInfo = {
    serie: Serie<IArray>|undefined,
    userData?: any,
    transfertPolicy?: string
}

type Series = Map<string, SerieInfo>

export class DataFrame {
    constructor(params?: any) {
        if (params === undefined) return

        this.index    = params.index
        this.userData = params.userData

        if (params.columns !== undefined) {
            for (var [k, v] of Object.entries(params.columns)) {
                if (v instanceof Serie) {
                    this.series.set(k, {serie: v})
                }
                else {
                    this.series.set(k, v as SerieInfo)
                }
            }
        }
    }

    get(name: string) {
        return this.series.get(name)
    }
    getSerie(name: string) {
        // if (!this.series.has(name)) return []
        // return this.series.get(name).serie
        const si = this.series.get(name)
        if (si) return si.serie
        return undefined
    }

    delete(name: string): DataFrame {
        const r = this.clone()
        r.series.delete(name)
        return r
    }

    set(name: string, serie: SerieInfo|Serie<IArray>|undefined): DataFrame {
        if (serie === undefined) return this
        const r = this.clone()
        if (serie instanceof Serie) {
            r.series.set(name, {serie})
        }
        else {
            r.series.set(name, serie) // will erase an existing if any
        }
        return r
    }

    info() {
        return {
            index: this.index,
            userData: this.userData,
            series: [...this.series].map( ([name, value]) => {
                return {
                    name,
                    userData: value.userData,
                    transfertPolicy: value.transfertPolicy,
                    serie: value.serie?value.serie.info(): undefined
                }
            })
        }
    }

    // --------------------------

    private clone() {
        const r = new DataFrame
        r.userData = Object.assign({}, this.userData)
        this.series.forEach( (v, k) => r.series.set(k,v) )
        return r
    }
    private userData: any = undefined
    private series  : Series = new Map
    private index   : number[] = []
}

export function trace(s: Serie<IArray>|undefined) {
    if (s === undefined) {
        return []
    }
    if (s && s.itemSize===1 ) {
        return s.array.map( (_:number) => _)
    }

    const r = s.array.slice(0, s.count)
    for (let i=0; i<s.count; ++i) {
        const v = s.itemAt(i) as number[]
        r[i] = v.reduce( (acc,v) => acc+v, 0)
    }
    return r
}

export const add = (s1: Serie<IArray>|undefined, s2: Serie<IArray> | number |undefined, ...others: (Serie<IArray>)[]) => {
    if (s1 === undefined) return undefined
    if (s2 === undefined) return undefined

    const r  = s1.array.slice(0, s1.length)
    const size = s1.length

    if (typeof(s2) === 'number') {
        s1.array.forEach( (v: number, i: number) => {
            r[i] += s2 as number
        })
    } else {
        s2.array.forEach( (v: number, i: number) => {
            r[i] += v
        })
    }

    // rest
    if (others) {
        others.forEach (o => {
            if (o !== undefined) {
                if (o.length !== size) {
                    throw new Error(`size mistmatch. Cannot add 2 Series of different sizes (${o.length} != ${size})`)
                }
                o.array.forEach( (v: number, i: number) => {
                    r[i] += v
                })
            }
        })
    }

    return createSerie({data: r, itemSize: s1.itemSize, shared: s1.shared})
}

export const mult = (s1: Serie<IArray>|undefined, s2: Serie<IArray> | number|undefined, ...others: (Serie<IArray>)[]) => {
    if (s1 === undefined) return undefined
    if (s2 === undefined) return undefined

    const r  = s1.array.slice(0, s1.length)
    const size = s1.length

    if (typeof(s2) === 'number') {
        s1.array.forEach( (v: number, i: number) => {
            r[i] *= s2 as number
        })
    } else {
        s2.array.forEach( (v: number, i: number) => {
            r[i] *= v
        })
    }

    // rest
    if (others) {
        others.forEach (o => {
            if (o !== undefined) {
                if (o.length !== size) {
                    throw new Error(`size mistmatch. Cannot add 2 Series of different sizes (${o.length} != ${size})`)
                }
                o.array.forEach( (v: number, i: number) => {
                    r[i] *= v
                })
            }
        })
    }

    return createSerie({data: r, itemSize: s1.itemSize, shared: s1.shared})
}

// ----------------------------------------------------------------

let df = new DataFrame({
    index: new Array(10).fill(0).map( (_,i) => i),
    columns: {
        a: createEmptySerie({Type: Float32Array, rowsCount:2, itemSize:3, shared: true }),
        b: createEmptySerie({Type: Float64Array, rowsCount:2, itemSize:3, shared: false}),
        c: createSerie({data: [0,1,2,3,4,5,6,7,8,9], itemSize: 5}),
        d: {
            serie: createSerie({data: [0,1,2,3,4,5,6,7,8,9], itemSize: 5}),
            transfertPolicy: 'transfert',
            userData:{id:'tensor'}
        }
    },
    userData: {
        id: 'dataframe-1'
    }
})

console.log( trace( df.getSerie('c') ) )

console.log('add =', add(
    df.getSerie('c'),
    100
))

console.log('mult =', mult(
    df.getSerie('c'),
    100
))

const a = add(
    mult( df.getSerie('a'), 0.1 ),
    mult( df.getSerie('b'), 0.2 )
)
console.log(a)

df = df.set('d', a)

// console.log(df)
