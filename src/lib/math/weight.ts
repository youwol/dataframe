import { ASerie } from "../serie"
import { add } from "./add"
import { mult } from "./mult"

/**
 * Weights an array of [[ASerie]] with numbers and return the resulting [[ASerie]]
 * @example
 * ```ts
 * const S = [
 *     createSerie( {data: createArray(18, i => i  ), itemSize: 6}),
 *     createSerie( {data: createArray(18, i => i+1), itemSize: 6}),
 *     createSerie( {data: createArray(18, i => i+2), itemSize: 6})
 * ]
 * 
 * const r = weight(S, [1,2,3])
 * console.log(r.array)
 * 
 * // [ 8, 14, 20, 26,  32,  38,
 * //  44, 50, 56, 62,  68,  74,
 * //  80, 86, 92, 98, 104, 110 ]
 * ```
 * @category Math
 */
export const weight = (data: ASerie[], alpha: number[]): ASerie => {
    if (alpha.length !== data.length) throw new Error(`data length (${data.length}) should be equal to alpha length (${alpha.length})`)
    return add( data.map( (d,i) => mult(d, alpha[i])) )
}
