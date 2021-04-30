import { ASerie } from '../serie'
import { createSerie } from '../utils'

/**
 * @category Math
 */
export const abs = (s: ASerie) => {
    if (s===undefined) throw new Error ('series is undefined')
    
    return createSerie({
        data: s.array.map( v => Math.abs(v) ),
        itemSize: s.itemSize
    })
}
