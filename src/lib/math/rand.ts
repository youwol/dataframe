import { ASerie } from "../serie";

/**
 * @example
 * ```ts
 * const a = createSerie( {data: [1, 2, 3, 4, 5, 6]} )
 * console.log( round( rand(a, -10, 20 ) ) )
 * // [ 17, -5, 14, -5, 5, -8 ]
 * ```
 * @category Math
 */
export const rand = (a: ASerie, min=0, max=1) => {
    const delta = max-min
    if (a.itemSize===1) {
        return a.map( v => min + delta*Math.random() )
    }
    return a.map( v => new Array(a.itemSize).fill(0).map(v => min + delta*Math.random() ) )
}
