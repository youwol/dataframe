import { ASerie } from '../serie'

/**
 * @example
 * ```ts
 * // perform a = b/c/d
 * const a = div( df.get('b'), df.get('c'), df.get('d') )
 * ```
 * @category Math
 */
 export const div = (s: ASerie, ...others: (ASerie|number)[]) => {
    if (s === undefined) return undefined
    if (!others) throw new Error('cannot divide undefined to s')

    const r = s.clone()

    // rest
    if (others) {
        others.forEach (o => {
            if (typeof(o) === 'number') {
                r.array.forEach( (_,i) => r.array[i] /= o )
            }
            else {
                if (o.length !== s.length) {
                    throw new Error(`size mistmatch. Cannot divide 2 Series of different sizes (${o.length} != ${s.length})`)
                }
                o.array.forEach( (v,i) => r.array[i] /= v )
            }
        })
    }

    return r
}
