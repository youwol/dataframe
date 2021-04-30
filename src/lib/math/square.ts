import { ASerie } from '../serie'
import { createSerie } from '../utils'

/**
 * @category Math
 */
 export const square = (s: ASerie) => {
    if (s===undefined) throw new Error ('series is undefined')
    
    return createSerie({
        data: s.array.map( v => v**2 ),
        itemSize: s.itemSize
    })
}
