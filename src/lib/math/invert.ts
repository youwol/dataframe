import { ASerie, IArray } from '../serie'
import { createSerie } from '../utils'

/**
 * @category Math
 */
export const invert = (s: ASerie): ASerie => {
    if (s===undefined) throw new Error ('series is undefined')

    return createSerie({
        data: s.array.map( v => 1/v ),
        itemSize: s.itemSize
    })
}
