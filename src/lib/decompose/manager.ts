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
 * @category Decomposition
 */
export class Manager {
    private ds_: Decomposer[] = []

    constructor(private readonly df: DataFrame, options: Decomposer[] = undefined) {
        if (options) this.ds_ = options
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
            if (serie.itemSize === itemSize) {
                // Avoid exposing directly 'positions' and 'indices'
                if ( !(itemSize===3 && (name==='positions'||name==='indices')) ) {
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
