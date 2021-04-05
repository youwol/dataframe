import { IArray, Serie } from './serie'

/**
 * The dataframe class which contains a list of [[Serie]]
 */
export class DataFrame {

    /**
     * 
     * @param params Parameters of the form
     * ```js
     * {
     *   index: new Array(10).fill(0).map( (_,i) => i),
     *   columns: {
     *     a: createEmptySerie({Type: Float32Array, count:2, itemSize:3, shared: true }),
     *     b: createEmptySerie({Type: Float64Array, count:2, itemSize:3, shared: false}),
     *     c: createSerie([0,1,2,3,4,5,6,7,8,9], 5),
     *     d: {
     *       serie: createSerie([0,1,2,3,4,5,6,7,8,9], 5),
     *       transfertPolicy: 'transfert',
     *       userData:{id:'tensor'}
     *     }
     *   },
     *   userData: {
     *     id: 'dataframe-1'
     *   }
     * }
     * ```
     * @returns 
     */
    constructor(params?: any) {
        if (params === undefined) return

        this.index_    = params.index
        this.userData_ = params.userData

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

    /**
     * Get a serie by its name
     * @param name 
     * @returns 
     */
    get(name: string) {
        const si = this.series.get(name)
        if (si) return si.serie
        return undefined
    }

    getSerie(name: string) {
        return this.series.get(name)
    }

    delete(name: string): DataFrame {
        const r = this.clone()
        r.series.delete(name)
        return r
    }

    /**
     * Add or replace a [[Serie]]
     * @param name 
     * @param serie 
     * @returns A new [[DataFrame]]
     */
    set(name: string, serie: SerieInfo|Serie<IArray>|undefined): DataFrame {
        if (serie === undefined) return this

        const r = this.clone()
        if (serie instanceof Serie) {
            r.series.set(name, {serie})
            return r
        }

        r.series.set(name, serie) // will erase an existing if any
        return r
    }

    get userData() {
        return this.userData_
    }
    get index() {
        return this.index_
    }

    get series() {
        return this.series_
    }

    clone() {
        const r = new DataFrame
        r.userData_ = Object.assign({}, this.userData)
        this.series.forEach( (v, k) => r.series.set(k,v) )
        return r
    }

    // --------------------------

    private userData_: any = undefined
    private series_  : Series = new Map
    private index_   : number[] = []
}

type SerieInfo = {
    serie: Serie<IArray>|undefined,
    userData?: any,
    transfertPolicy?: string
}

type Series = Map<string, SerieInfo>
