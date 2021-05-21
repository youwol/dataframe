import { IArray, Serie } from './serie'

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
 * const df1 = new DataFrame(...)
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


export class DataFrame {

    /**
     * Mapping between column id and serie
     */
    public readonly series: {[key:string]: Serie}

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
    static create(
        {series, userData, metaData, index}:{
            series: {[key:string]:Serie},
            index?:string,
            userData?: {[key:string]:any},
            metaData?: {[key:string]:any}
        }){
        return new DataFrame(series,index, userData || {}, metaData || {})
    }

    clone() {
        return new DataFrame(this.series, this.index, this.userData, this.metaData)
    }
}
