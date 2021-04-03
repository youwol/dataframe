import { IArray, Serie, createEmptySerie, createSerie } from '../serie'

/**
 * Subtract several Series to generate a new one
 * @example
 * ```ts
 * // perform: a = b - c
 * const a = sub(
 *     df.get('b'),
 *     df.get('c'),
 * )
 * ```
 * @category Math
 */
 export const sub = (s1: Serie<IArray>|undefined, s2: Serie<IArray> | number |undefined, ...others: (Serie<IArray>)[]) => {
    if (s1 === undefined) return undefined
    if (s2 === undefined) return undefined

    const r  = s1.array.slice(0, s1.length)
    const size = s1.length

    if (typeof(s2) === 'number') {
        s1.array.forEach( (v: number, i: number) => {
            r[i] -= s2 as number
        })
    } else {
        s2.array.forEach( (v: number, i: number) => {
            r[i] -= v
        })
    }

    // rest
    if (others) {
        others.forEach (o => {
            if (o !== undefined) {
                if (o.length !== size) {
                    throw new Error(`size mistmatch. Cannot add 2 Series of different sizes (${o.length} != ${size})`)
                }
                o.array.forEach( (v: number, i: number) => {
                    r[i] -= v
                })
            }
        })
    }

    return createSerie({data: r, itemSize: s1.itemSize, shared: s1.shared})
}