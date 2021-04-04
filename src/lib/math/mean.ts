import { createSerie, IArray, Serie } from '../serie'

/**
 * @category Math
 */
export const mean = (s: Serie<IArray>) => {
    if (s===undefined) throw new Error ('series is undefined')

    const r  = s.array.slice(0, s.count)

    if (s.itemSize === 1) {
        return r
    }

    for (let i=0; i<s.count; ++i) {
        let v = s.itemAt(i) as number[]
        r[i] = v.reduce( (acc,v) => acc + v/s.itemSize, 0)
    }

    return createSerie(r,1)
}
