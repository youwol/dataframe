import { Serie, DataFrame } from '..'
import { Decomposer } from "./decomposer"

/**
 * @category Decomposition
 */
export type Functional = {
    (df: DataFrame): Serie
}

/**
 * User defined attribute based on a DataFrame
 * @example
 * ```ts
 * const mng = new Manager(df, {
 *      decomposers: [
 *          new FunctionalDecomposer(1, 'MyAttr', (df: DataFrame) => {
 *              const fct = p => p[0]**2 - p[1]***3 + Math.abs(p[2])
 *              df.get('positions').map( p => fct(p) )
 *          })
 *      ],
 *      dimension: 3
 * })
 * ```
 * @example
 * ```ts
 * const mng = new Manager(df, {
 *      decomposers: [
 *          new FunctionalDecomposer(3, 'zscaled', (df: DataFrame) => {
 *              const scale = 10
 *              df.get('positions').map( (p,i) => [p[0], p[1], p[2]*scale] )
 *          })
 *      ],
 *      dimension: 3
 * })
 * ```
 * @category Decomposition
 */
export class FunctionalDecomposer implements Decomposer {
    /**
     * 
     * @param itemSize The item size of the attribute
     * @param name The name of the atribute
     * @param fct The fonctional
     * @see [[Functional]]
     */
    constructor(private readonly itemSize: number, private readonly name: string, private readonly fct: Functional) {
    }
    /**
     * @hidden 
     */
    names(df: DataFrame, itemSize: number, serie: Serie, name: string) {
        if (itemSize !== this.itemSize) return []
        
        const s = this.fct(df)
        if (!s) return []

        return [this.name]
    }
    /**
     * @hidden 
     */
    serie(df: DataFrame, itemSize: number, name: string): Serie {
        if (itemSize!==this.itemSize || this.name!==name) return undefined
        return this.fct(df)//.setName(this.name)
    }
}
