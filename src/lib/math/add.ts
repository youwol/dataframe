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

export const addNumber = (serie: ASerie, a: number) => {
    const r = serie.clone(false)
    if (a===0) return r
    
    r.array.forEach( (v,i) => r.array[i] += a )
    return r
}

// export const add = (s: ASerie, ...others: (ASerie|number)[]) => {
//     if (s === undefined) throw new Error('serie s is undefined')
//     if (!others) throw new Error('cannot add undefined to s')

//     const r = s.clone() //image(s.count, s.itemSize)

//     // rest
//     if (others) {
//         others.forEach (o => {
//             if (typeof(o) === 'number') {
//                 r.array.forEach( (_,i) => r.array[i] += o )
//             }
//             else {
//                 if (o.length !== s.length) {
//                     throw new Error(`size mistmatch. Cannot add 2 Series of different sizes (${o.length} != ${s.length})`)
//                 }
//                 o.array.forEach( (v,i) => r.array[i] += v )
//             }
//         })
//     }

//     return r
// }
