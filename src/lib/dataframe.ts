import { Series } from './series'

/**
 * The DataFrame itself
 * @example
 * ```ts
 * import { DataFrame, createSeries } from '@youwol/dataframe'
 * 
 * const df2 = df1.set('fric'  , createSeries(10).initialize(1.0) )    // 10 values of scalars
 * const df3 = df2.set('stress', createSeries(10, 6).initialize(5.1) ) // 60 values of scalars
 * const df4 = df3.set('displ' , createSeries(10, 3) )                 // 30 values of scalars
 * ```
 */
export class DataFrame {
    constructor() {
    }

    /**
     * Add or replace a series in the dataframe
     * @param name The name of the series
     * @param series The [[Series]]
     * @returns The new dataframe
     */
    public readonly set = (name: string, series: Series) => {
        if (series === undefined) return this.clone()

        const df = this.clone()
        const index = this.n_.findIndex( e => e===name )
        if (index !== -1) {
            // Replace the typed array by a new one
            df.a_.splice(index, 1)
            df.n_.splice(index, 1)
        }

        df.a_.push(series)
        df.n_.push(name)
        return df
    }

    /**
     * @brief Get an existing series
     * @param name The name of the [[Series]]
     * @returns The series or undefined
     */
    public readonly get = (name: string): Series => {
        const i = this.n_.findIndex( e => e===name )
        if (i === -1) return undefined // throw new Error(`entry "${name}" is not in the dataframe`)
        return this.a_[i]
    }

    /**
     * Get the number of [[Series]]
     */
    get length() {
        return this.n_.length
    }

    /**
     * The column labels of the DataFrame (names of the [[Series]])
     */
    get entries() {
        return [...this.n_]
    }

    /**
     * @brief Get information about the dataframe
     */
    public readonly info = () => {
        return {
            length: this.n_.length,
            series: this.a_.map( (a,i) => {
                return {
                    name: this.n_[i],
                    dtype: a.dtypeName,
                    length: a.length,
                    itemSize: a.itemSize,
                    count: a.count,
                    isShared: a.shared,
                    bytesPerElement: a.BYTES_PER_ELEMENT
                }
            })
        }
    }

    /**
     * A new DataFrame, copy of this.
     * All series point to the same one.
     */
    public readonly clone = (): DataFrame => {
        const df = new DataFrame()
        df.a_ = [...this.a_]
        df.n_ = [...this.n_]
        return df
    }

    // -------------------------------------

    private a_: Array<Series> = []
    private n_: Array<string> = []
}
