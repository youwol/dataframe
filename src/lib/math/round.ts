import { ASerie } from "../serie"

/**
 * @category Math
 */
export const round = (a: ASerie) => {
    if (a.itemSize === 1) {
        return a.map( v => Math.round(v) )
    }
    return a.map( v => v.map( w => Math.round(w) ) )
}
