import { IArray, Serie } from '../serie'
import { createSerie } from '../utils'

/**
 * filter a [[Serie]] using a callback function.
 * @note Operations are done using the items
 * @category Algorithms
 */
export const filter = (s: Serie<IArray>, callback: Function) => {
    if (s===undefined) throw new Error ('serie is undefined')

    const count = s.count
    const r = []

    for (let i=0; i<count; ++i) {
        const v = s.itemAt(i)
        if (callback( v, i, s )) r.push(v)
    }

    const rr  = s.array.slice(0, r.length)
    r.forEach( (v,i) => rr[i] = v )
    return createSerie({data: rr, itemSize: s.itemSize})
}
