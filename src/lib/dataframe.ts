import { Serie } from './serie'

/**
 * Merge two dataframe into one
 * @example
 * ```ts
 * const df1 = DataFrame.create(...)
 * const df2 = DataFrame.create(...)
 * const df3 = DataFrame.create(...)
 * const df = merge( [df1, df2, df3] )
 * ```
 * @category DataFrame
 */
export const merge = (dfs: DataFrame[], index?:string): DataFrame => {
    // What if multiple column with same name
    // What about userData, metaData
    let series = dfs.reduce( (acc, e) => ({...acc, ...e.series}) , {})
    let userData =  dfs.reduce( (acc, e) => ({...acc, ...e.userData}) , {})
    let metaData =  dfs.reduce( (acc, e) => ({...acc, ...e.metaData}) , {})
    
    return DataFrame.create({series, userData, metaData, index})
}

/**
 * Merge series in a dataframe and return a new dataframe
 * @example
 * ```ts
 * const df1 = DataFrame.create(...)
 * const df2 = append(df1, {
 *   a: createSerie(...),
 *   b: createSerie(...)
 * })
 * ```
 * @category DataFrame
 */
export const append = ({series, index, metaData, userData}: DataFrame, news: {[key:string]: Serie}): DataFrame => {
    //! need to check that rows count are compatible
    return DataFrame.create({ series: {...series, ...news}, index, metaData, userData})
}

/**
 * Mutating function which add a new (or an existing) serie into a dataframe
 * @param {df: DataFrame, s: Serie, name: string} param0 The serie s into the dataframe df. If the serie
 * already exist, it is replaced. Serie's count is checked against existing series in the dataframe, so that
 * a dataframe will contain only series with same count.
 * @returns The input dataframe (not a copy!)
 */
export const insertSerie = ({df, serie, name}:{df: DataFrame, serie: Serie, name: string}): DataFrame => {
    //! need to check that rows count are compatible
    const names = Object.entries(df.series).map( ([name, serie]) => name)
    const count = names.length !== 0 ? df.series[names[0]].count: 0

    if (count !== 0 && serie.count !== count) {
        throw new Error('Provided serie count must be equal to existing series count')
    }

    df.series[name] = serie
    return df
}

/**
 * Remove a serie or a list of series (given by there name) from a dataframe.
 * @param dataframe The dataframe
 * @param serieName The serie of a list of series given by their names
 * @returns A new [[Dataframe]] even if no modification
 * @example
 * ```ts
 * let df = ...
 * 
 * df = df.remove(['a', 'toto'])
 * ```
 */
export const remove = (dataframe: DataFrame, series: string|string[]): DataFrame => {
    return dataframe.remove(series)
}

/**
 * @category Base
 */
export class DataFrame {

    /**
     * Mapping between column id and serie
     */
    public readonly series: {[key:string]: Serie}

    /**
     * Convenient method to iterate over all series
     * @example
     * ```ts
     * const df = DataFrame.create({
     *      series: {
     *          a: ...,
     *          b: ...,
     *      }
     * })
     * 
     * df.forEach( (name, serie, i) => {
     *      console.log('serie named', name, 
     *                  'at index', i, 
     *                  ', count=', serie.count, 
     *                  ', itemSize=', serie.itemSize
     *      )
     * })
     * ```
     */
    public forEach( cb: Function) {
        Object.entries(this.series).forEach( ([name, serie], i) => cb(name, serie, i) )
    }

    /**
     * If provided, the column that acts as index
     */
    public readonly index : string | undefined = undefined

    /**
     * 
     * Mutable dictionary to store consumer data (context information of the usage)
     */
    public userData: {[key:string]: any} = {}

    /**
     * 
     * Dictionary to store metadata (context information of the dataframe's creation)
     */
    public readonly metaData: {[key:string]: any} = {}

    private constructor(
        series: {[key:string]: Serie},
        index: string,
        userData: {[key:string]: any},
        metaData: {[key:string]: any}
    ) {
        this.series = series
        this.index = index
        this.userData = userData
        this.metaData = metaData
    }

    /**
     * The dataframe class which contains a list of [[Serie]]
     * @example
     * ```ts
     * const df = DataFrame.create({
     *     series: {
     *          a: createEmptySerie({
     *              Type: Float32Array, count:2, itemSize:3, shared: true
     *          }),
     *          b: createEmptySerie({
     *              Type: Float64Array, count:2, itemSize:3, shared: false
     *          }),
     *          c: createSerie({data: [0,1,2,3,4,5,6,7,8,9], itemSize: 5}),
     *          d: createSerie({data: [0,1,2,3,4,5,6,7,8,9], itemSize: 5}),
     *     }
     * })
     * ```
     * @category DataFrame
     */
    static create(
        {series, userData, metaData, index}: {
            series: {[key:string]:Serie},
            index?:string,
            userData?: {[key:string]:any},
            metaData?: {[key:string]:any}
        }): DataFrame
    {
        return new DataFrame(series,index, userData || {}, metaData || {})
    }

    /**
     * Remove a serie or a list of series (given by their name) from this dataframe.
     * @param serieName 
     * @returns A new [[Dataframe]] even if no modification
     * @example
     * ```ts
     * let df = ...
     * 
     * df = df.remove(['a', 'toto'])
     * ```
     */
    remove(serieName: string | string[]): DataFrame {
        const df = this.clone()

        if (Array.isArray(serieName)) {
            serieName.forEach( name => {
                if (df.series.hasOwnProperty(name)) {
                    delete df.series[name]
                }
            })
        }
        else {
            if (df.series.hasOwnProperty(serieName)) {
                delete df.series[serieName]
            }
        }
        return df
    }

    clone() {
        return new DataFrame(this.series, this.index, this.userData, this.metaData)
    }
}
