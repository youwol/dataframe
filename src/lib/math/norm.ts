import { ASerie } from '../serie'

/**
 * @category Math
 */
 export const norm = (s: ASerie) => {
    if (s===undefined) throw new Error ('series is undefined')

    const r = s.image(s.count, 1)
    
    if (s.itemSize === 1) {
        return r
    }

    for (let i=0; i<s.count; ++i) {
        let v = s.itemAt(i) as number[]
        r.array[i] = Math.sqrt( v.reduce( (acc,v) => acc + v**2, 0) )
    }

    return r
}
