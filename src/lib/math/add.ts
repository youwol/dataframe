import { IArray, Serie } from '../serie'

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
 export const add = (s1: Serie<IArray>|undefined, s2: Serie<IArray> | number |undefined, ...others: (Serie<IArray>)[]) => {
    if (s1 === undefined) return undefined
    if (s2 === undefined) return undefined

    const s = s1.image(s1.count, s1.itemSize)

    if (typeof(s2) === 'number') {
        s1.array.forEach( (v: number, i: number) => {
            s.array[i] += s2 as number
        })
    } else {
        s2.array.forEach( (v: number, i: number) => {
            s.array[i] += v
        })
    }

    // rest
    if (others) {
        others.forEach (o => {
            if (o !== undefined) {
                if (o.length !== s1.length) {
                    throw new Error(`size mistmatch. Cannot add 2 Series of different sizes (${o.length} != ${s1.length})`)
                }
                o.array.forEach( (v: number, i: number) => {
                    s.array[i] += v
                })
            }
        })
    }

    return s
}
