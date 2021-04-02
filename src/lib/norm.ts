import { Series } from './series'

/**
 * @category Operations
 */
export const norm = (df: Series): Series => {
    if (df===undefined) throw new Error ('series is undefined')

    if (df.itemSize === 1) {
        return df.deepClone()
    }

    const count = df.count
    const r = new Series(count)
    for (let i=0; i<count; ++i) {
        let v = df.itemAt(i) as number[]
        r[i] = Math.sqrt( v.reduce( (acc,v) => acc + v**2) )
    }

    return r
}
