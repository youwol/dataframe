import { ASerie } from '../serie'

/**
 * Add several Series to generate a new one
 * @example
 * ```ts
 * // perform: a = b + c
 * const a = add(
 *     df.get('b'),
 *     df.get('c'),
 * )
 * ```
 * @example
 * ```ts
 * // perform: a = 0.1*b + 0.3*c + 0.7*d
 * const a = add(
 *     mult( df.get('b'), 0.1),
 *     mult( df.get('c'), 0.3),
 *     mult( df.get('d'), 0.7)
 * )
 * ```
 * @category Math
 */
export const add = (series: ASerie[]) => {
    if (series.length <= 1) throw new Error('nb series should be greater than 1')

    const r = series[0].clone(true)

    series.forEach (o => {
        if (o.length !== r.length) {
            throw new Error(`size mistmatch. Cannot add 2 Series of different sizes (${o.length} != ${r.length})`)
        }
        o.array.forEach( (v,i) => r.array[i] += v )
    })

    return r
}

/**
 * Add a number to each value of the array
 * @example
 * ```ts
 * const a = addNumber( df.get('a'), 10 )
 * ```
 * @category Math
 */
export const addNumber = (serie: ASerie, a: number) => {
    const r = serie.clone(false)
    if (a===0) return r
    
    r.array.forEach( (v,i) => r.array[i] += a )
    return r
}
