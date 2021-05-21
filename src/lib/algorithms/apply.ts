import { Serie } from "../serie";

/**
 * Apply a function to a serie. The function signature is
 * `fn(item: number|number[], index: number, serie: Serie)`
 * @note Operations are done using the items
 * @example
 * ```ts
 * const s1 = createSerie( {data: [1, 2, 3, 4, 5, 6]} ) // itemSize=1
 * const s2 = apply(s1, item => item**2 )
 * 
 * // s1.array: [1, 2, 3,  4,  5,  6]
 * // s2.array: [1, 4, 9, 16, 25, 36]
 * ```
 * @example
 * ```ts
 * const s1 = createSerie( {data: [1, 2, 3, 4, 5, 6]}, itemSize: 3 )
 * const s2 = apply(s1, item => item.map( v => v**2) )
 * 
 * // s1.array: [1, 2, 3,  4,  5,  6]
 * // s2.array: [1, 4, 9, 16, 25, 36]
 * ```
 * @category Algorithms
 */
export const apply = (serie: Serie, fn: Function): Serie => {
    return serie.map( (item, i) => fn(item, i, serie) )
}
