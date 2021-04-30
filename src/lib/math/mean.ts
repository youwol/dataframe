import { ASerie } from '../serie'

/**
 * @category Math
 */
export const mean = (s: ASerie) => {
    if (s===undefined) throw new Error ('series is undefined')

    if (s.itemSize === 1) {
        return s.clone()
    }

    //const r  = s.array.slice(0, s.count)
    const r = s.image(s.count, 1)

    for (let i=0; i<s.count; ++i) {
        let v = s.itemAt(i) as number[]
        r.array[i] = v.reduce( (acc,v) => acc + v/s.itemSize, 0)
    }

    return r
}
