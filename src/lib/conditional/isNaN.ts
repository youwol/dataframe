import { Serie } from "../serie"

/**
 * @category Conditional
 */
export const isNaN = (a: Serie) => {
    if (a.itemSize===1) {
        return a.map( v => Number.isNaN(v) )
    }
    return a.map( v => new Array(a.itemSize).fill(0).map(w => Number.isNaN(w) ) )
}
