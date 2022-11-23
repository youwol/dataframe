import { DataFrame, Serie } from '..'
import { Decomposer } from './decomposer'

/**
 * Manager of (virtual or not) series.
 * 
 * Allows to decompose series in other user-defined series.
 * Let say that you have a serie `W` with `itemSize=6`, meaning that items
 * are potentially components of symmetric rank 2 tensors of dimension 3.
 * Then, using this library, it is possible to get names and underlaying
 * series of decompositions. For instance, it is possible to get the components (`itemSize=1`),
 * eigen values (`itemSize=1`), eigen vectors(`itemSize=3`)... from this original `W` serie.
 * @example
 * ```ts
 * const df = DataFrame.create({
 *     series: {
 *         positions: Serie.create( {array: [1,2,3, 4,5,6], itemSize: 3} ),
 *         scalar   : Serie.create( {array: [4,9], itemSize: 1}),
 *         U        : Serie.create( {array: [6,5,4, 3,2,1], itemSize: 3} ),
 *         S        : Serie.create( {array: [10,11,12,13,14,15, 16,17,18,19,20,21], itemSize: 6} )
 *     }
 * })
 * 
 * const manager = new Manager(df, {
 *      decomposers: [
 *          new PositionDecomposer,
 *          new ComponentDecomposer,
 *          new EigenValuesDecomposer,
 *          new EigenVectorsDecomposer
 *      ],
 *      dimension: 3
 * })
 * 
 * const x   = manager.serie(1, 'x')   // x coordinate
 * const S1  = manager.serie(1, 'S1')  // first eigen value
 * const vS1 = manager.serie(3, 'S1')  // first eigen vector
 * const Sxx = manager.serie(1, 'Sxx') // xx component of the stress tensor
 * 
 * console.log( manager.names(1) ) // display all names for itemSize = 1 // scalars
 * console.log( manager.names(3) ) // display all names for itemSize = 3 // vectors
 * ```
 * @category Decomposition
 */
export class Manager {
    private ds_: Decomposer[] = []
    public readonly dimension: number = 3

    /**
     * Two usages of the constructor for compatibility reason:
     * 
     * - Old fashioned. By default the dimension is set to 3 and cannot be changed:
     * ```ts
     * const mng = new Manager(df, [
     *     new PositionDecomposer, 
     *     new ComponentDecomposer
     * ])
     * ```
     * 
     * - New way. You have to provide the dimension (no default value):
     * ```ts
     * const mng = new Manager(df, {
     *     decomposers: [
     *         new PositionDecomposer, 
     *         new ComponentDecomposer
     *     ],
     *     dimension: 2
     * })
     * ```
     */
    constructor(private readonly df: DataFrame, options: Decomposer[] | {decomposers: Decomposer[], dimension: number}) {
        if (options) {
            // For compatibility reason
            if (Array.isArray(options)) {
                console.warn('Deprecated ctor for Manager')
                this.ds_ = options
            }
            else {
                if (options.decomposers) this.ds_ = options.decomposers
                if (options.dimension) this.dimension = options.dimension
            }
        }
    }

    /**
     * Add a new Decomposer in this [[Manager]]
     */
    add(d: Decomposer) {
        this.ds_.push(d)
    }

    /**
     * Remove all registered decomposers from this manager
     */
    clear() {
        this.ds_ = []
    }

    /**
     * Get all possible decomposed names for a given itemSize
     * @param itemSize 
     * @returns 
     */
    names(itemSize: number): string[] {
        let names = new Set<string>()

        // add series with same itemSize
        Object.entries(this.df.series).forEach( ([name, serie]) => {
            // ! use dimension
            if (serie.itemSize === itemSize && serie.dimension === this.dimension) {
                // Avoid exposing directly 'positions' and 'indices'
                // if ( !(itemSize===3 && (name==='positions'||name==='indices')) ) {
                if ( name !== 'positions' && name !== 'indices' ) {
                    names.add(name)
                }
            }
            this.ds_.forEach( d => {
                d.names(this.df, itemSize, serie, name).forEach( n => names.add(n) )
            })
        })
        return Array.from(names)
    }

    /**
     * Check if the attribute named name with itemSize exists in the manager
     */
    contains(itemSize: number, name: string): boolean {
        const n = this.names(itemSize)
        return n.includes(name)
    }

    /**
     * For a given itemSize and a decomposed's name, get the corresponding serie
     */
    serie(itemSize: number, name: string): Serie {
        for (let [mname, serie] of Object.entries(this.df.series)) {
            if (serie.itemSize===itemSize && name===mname) {
                return serie.clone(false)
            }
        }
        for (let d of this.ds_) {
            const serie = d.serie(this.df, itemSize, name)
            if (serie) return serie
        }
        return undefined
    }
}
