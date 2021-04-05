import { createSerie, IArray, Serie } from '../serie'

/**
 * map a [[Serie]] onto another one using a map function.
 * @note Operations are done using the items
 * @category Algorithms
 */
export const map = (s: Serie<IArray>, callback: Function) => {
    if (s===undefined) throw new Error ('serie is undefined')

    const r  = s.array.slice(0, s.count)
    const count = s.count

    let k = 0
    for (let i=0; i<count; ++i) {
        r[i] = callback( s.itemAt(i) )
        console.log(s.itemSize, r[i], s.itemAt(i))
    }

    return createSerie(r, s.itemSize)
}
