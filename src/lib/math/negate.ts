import { ASerie, IArray } from '../serie'
import { createSerie } from '../utils'

/**
 * @category Math
 */
export const negate = (s: ASerie): ASerie => {
    if (s===undefined) throw new Error ('series is undefined')

    return createSerie({
        data: s.array.map( v => -v ),
        itemSize: s.itemSize
    })
}
