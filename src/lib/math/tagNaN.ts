import { ASerie } from "../serie"

/**
 * @example
 * ```ts
 * const a = createSerie( {data: [1, 2, 3, 4, 5, 6]} )
 * console.log( tagNaN(a, v => v%2===0 ) )
 * // [ 1, NaN, 3, NaN, 5, NaN ]
 * ```
 * @category Math
 */
export const tagNaN = (a: ASerie, fn: Function) => {
    if (a.itemSize === 1) {
        return a.map( (item,i) => fn(item,i,a) ? Number.NaN : item)
    }
    return a.map( (item,i) => fn(item,i,a) ? new Array(a.itemSize).fill(Number.NaN) : item)
}
