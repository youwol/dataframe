import { createSerie, IArray, Serie } from '../serie'

/**
 * Reduce teh items of a [[Serie]] using a callback function.
 * @note Operations are done using the items
 * @category Algorithms
 * @example
 * ```ts
 * const df = new DataFrame().set( 'a', createSerie([1,2,3,4,5,6,7,8,9], 3))
 * const traces = reduce( df.get('a'), v => v[0]+v[1]+v[2])
 * console.log(traces) // display: [6, 15, 24]
 * ```
 */
export const reduceItem = (s: Serie<IArray>, callback: Function) => {
    if (s===undefined) throw new Error ('serie is undefined')

    const count = s.count
    const r = s.image(count, 1)
    
    for (let i=0; i<count; ++i) {
        const v = s.itemAt(i)
        r.array[i] = callback(s.itemAt(i), i, s)
    }

    return r
}