import { Serie } from '../serie'
import { filter } from './filter'

/**
 * cut a [[Serie]] using a callback function.
 * @category Algorithms
 */
export const cut = (s: Serie, callback: Function) => {
    if (s===undefined) throw new Error ('serie is undefined')
    if (s.itemSize !== 1) throw new Error ('serie should have itemSize = 1')

    return filter(s, callback)
}
