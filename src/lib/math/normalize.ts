import { ASerie } from '../serie'
import { array } from '../utils'

/**
 * If itemSize is > 1, normalize each items, otherwize
 * normalize the serie (since itemSize=1)
 * @category Math
 */
 export const normalize = (s: ASerie): ASerie => {
    if (s===undefined) throw new Error ('series is undefined')
    
    if (s.itemSize ===1) {
        const mM = array.minMax(s.array)
        const m = mM[0]
        const l = 1/(mM[1]-m)
        return s.map( v => l*(v-m) )
    }

    return s.map( item => {
        const mM = array.minMax(item)
        const m = mM[0]
        const l = 1/(mM[1]-m)
        return item.map( v => l*(v-m) )
    })
}
