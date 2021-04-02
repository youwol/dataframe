import { Series } from "./series"

/**
 * @category Operations
 */
export const map = (df: Series, mapfct: Function): Series => {
    if (df===undefined) throw new Error ('series is undefined')

    const r        = df.clone()
    const count    = df.count

    let k = 0
    //const a = new Array(df.itemSize).fill(0)
    for (let i=0; i<count; ++i) {
        r[i] = mapfct( df.itemAt(i) )
    }

    return r
}