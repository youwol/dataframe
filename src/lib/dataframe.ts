import { ASerie, IArray, Serie } from './serie'

/**
 * Merge two dataframe into one
 * @example
 * ```ts
 * const df1 = new DataFrame(...)
 * const df2 = new DataFrame(...)
 * const df3 = new DataFrame(...)
 * const df = merge( [df1, df2, df3] )
 * ```
 * @category DataFrame
 */
export const merge = (dfs: DataFrame[]): DataFrame => {
    if (dfs.length === 1) throw new Error ('trying to merge only one dataframe or one serie')
    const df = dfs[0].clone()
    dfs.forEach( d => d.series.forEach( (serie, name) =>  {
        df.series.set(name, serie)
        df.series.get(name).serie.name = name
    }) )
    return df
}

/**
 * Merge series in a dataframe and return a new dataframe
 * @example
 * ```ts
 * const df1 = new DataFrame(...)
 * const df2 = append(df1, {
 *   a: createSerie(...),
 *   b: createSerie(...)
 * })
 * ```
 * @category DataFrame
 */
export const append = (df: DataFrame, series: any): DataFrame => {
    const d = df.clone()
    for (var [k, v] of Object.entries(series)) {
        if (v instanceof Serie) {
            d.series.set(k, {serie: v})
            d.series.get(k).serie.name = k
        }
        else {
            d.series.set(k, v as SerieInfo)
            d.series.get(k).serie.name = k
        }
    }
    return d
}

/**
 * The dataframe class which contains a list of [[Serie]]
 * @example
 * ```ts
 * const df = new DataFrame({
 *     a: createEmptySerie({Type: Float32Array, count:2, itemSize:3, shared: true }),
 *     b: createEmptySerie({Type: Float64Array, count:2, itemSize:3, shared: false}),
 *     c: createSerie({data: [0,1,2,3,4,5,6,7,8,9], itemSize: 5}),
 *     d: {
 *         serie: createSerie({data: [0,1,2,3,4,5,6,7,8,9], itemSize: 5}),
 *         transfertPolicy: 'transfert',
 *         userData:{id:'tensor'}
 *     }
 * })
 * ```
 * @category DataFrame
 */
export class DataFrame {

    /**
     * 
     * @param params Parameters of the form
     * ```js
     * {
     *     "a": createEmptySerie({Type: Float32Array, count:2, itemSize:3, shared: true }),
     *     "b": createEmptySerie({Type: Float64Array, count:2, itemSize:3, shared: false}),
     *     "c": createSerie([0,1,2,3,4,5,6,7,8,9], 5),
     *     "d": {
     *         serie: createSerie([0,1,2,3,4,5,6,7,8,9], 5),
     *         transfertPolicy: 'transfert',
     *         userData:{id:'tensor'}
     *     }
     * }
     * ```
     * @returns 
     */
    constructor(params?: any, userData: any = undefined) {
        this.userData_ = userData
        
        if (params === undefined) return

        for (var [k, v] of Object.entries(params)) {
            if (v instanceof Serie) {
                this.series.set(k, {serie: v})
                this.series.get(k).serie.name = k
                //console.log( this.series.get(k) )
            }
            else {
                this.series.set(k, v as SerieInfo)
                this.series.get(k).serie.name = k
            }
        }
    }

    /**
     * Get a [[Serie]] by its name
     * @param name The name of the serie
     * @returns 
     */
    get(name: string) {
        const si = this.series.get(name)
        if (si) return si.serie
        return undefined
    }

    /**
     * Get a [[SerieInfo]] according to its name
     * @param name The name of the serie
     * @returns [[SerieInfo]]
     */
    getSerieInfo(name: string) {
        return this.series.get(name)
    }

    delete(name: string): DataFrame {
        const r = this.clone()
        r.series.delete(name)
        return r
    }

    // /**
    //  * Add or replace a [[Serie]]
    //  * @param name 
    //  * @param serie 
    //  * @returns A new [[DataFrame]]
    //  */
    // set(name: string, serie: SerieInfo|Serie<IArray>): DataFrame {
    //     if (serie === undefined) return this

    //     const r = this.clone()
    //     if (serie instanceof Serie) {
    //         r.series.set(name, {serie})
    //         r.series.get(name).serie.name = name
    //         return r
    //     }

    //     r.series.set(name, serie) // will erase an existing one if any
    //     r.series.get(name).serie.name = name
    //     return r
    // }

    get userData() {
        return this.userData_
    }
    set userData(data: any) {
        this.userData_ = data
    }

    get series() {
        return this.series_
    }

    clone() {
        const r = new DataFrame
        r.userData_ = Object.assign({}, this.userData)
        this.series.forEach( (v, k) => {
            r.series.set(k,v)
            r.series.get(k).serie.name = k
        })
        return r
    }

    // --------------------------

    private userData_: any = undefined
    private series_  : Series = new Map
}
