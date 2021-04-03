import { IArray, Serie } from '../serie'

/**
 * @category Math
 */
export const norm = (s: Serie<IArray>) => {
    if (s===undefined) throw new Error ('series is undefined')

    const r = s.clone()
    
    if (s.itemSize === 1) {
        return r
    }

    for (let i=0; i<s.count; ++i) {
        let v = s.itemAt(i) as number[]
        r[i] = Math.sqrt( v.reduce( (acc,v) => acc + v**2) )
    }

    return r
}
