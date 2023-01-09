import { Serie } from '../serie'
import { filter } from './filter'

/**
 * Cut a [[Serie]] using a predicate function. It is essentially the same as [[filter]]
 * @see filter
 * @category Algorithms
 */
export const cut = (s: Serie, callback: Function) => {
    if (s===undefined) throw new Error ('serie is undefined')
    if (s.itemSize !== 1) throw new Error ('serie should have itemSize = 1')

    return filter(s, callback)
}
