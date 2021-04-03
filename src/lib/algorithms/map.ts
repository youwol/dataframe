import { IArray, Serie } from '../serie'

/**
 * @category Algorithms
 */
export const map = (s: Serie<IArray>, mapfct: Function) => {
    if (s===undefined) throw new Error ('serie is undefined')

    const r     = s.clone()
    const count = s.count

    let k = 0
    for (let i=0; i<count; ++i) {
        r[i] = mapfct( s.itemAt(i) )
    }

    return r
}
