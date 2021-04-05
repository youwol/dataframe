import { IArray, Serie } from '../serie'

/**
 * @example
 * ```ts
 * const a = mult( df.get('b'), df.get('c'), df.get('d') )
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
 export const mult = (s: Serie<IArray>|undefined, ...others: (Serie<IArray>|number)[]) => {
    if (s === undefined) return undefined
    if (!others) throw new Error('cannot multiply undefined to s')

    const r = s.clone()

    // rest
    if (others) {
        others.forEach (o => {
            if (typeof(o) === 'number') {
                r.array.forEach( (_,i) => r.array[i] *= o )
            }
            else {
                if (o.length !== s.length) {
                    throw new Error(`size mistmatch. Cannot multiply 2 Series of different sizes (${o.length} != ${s.length})`)
                }
                o.array.forEach( (v,i) => r.array[i] *= v )
            }
        })
    }

    return r
}