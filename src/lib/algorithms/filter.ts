import { Serie } from '../serie'

/**
 * filter a [[Serie]] using a predicate function.
 * @note Operations are done using the items
 * @example
 * ```js
 * const a = filter( df.series.a, v => v < 10 )
 * ```
 * @category Algorithms
 */
export const filter = (s: Serie, predicate: Function) => {
    if (s===undefined) throw new Error ('serie is undefined')

    const count = s.count
    const r = []

    for (let i=0; i<count; ++i) {
        const v = s.itemAt(i)
        if (predicate( v, i, s )) r.push(v)
    }

    // const rr = createFrom(s.array, r.length/s.itemSize, s.itemSize)
    const rr  = s.array.slice(0, r.length)
    r.forEach( (v,i) => rr[i] = v )
    
    return Serie.create({array: rr, itemSize: s.itemSize})
}
