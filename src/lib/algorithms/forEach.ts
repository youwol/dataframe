import { createSerie, IArray, Serie } from '../serie'

/**
 * @note Operations are done using the items
 * @category Algorithms
 */
export const forEach = (s: Serie<IArray>, callback: Function) => {
    if (s===undefined) throw new Error ('serie is undefined')

    for (let i=0; i<s.count; ++i) {
        callback( s.itemAt(i), i, s )
    }
}
