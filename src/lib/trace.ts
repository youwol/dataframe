import { Series } from "./series"


/**
 * @category Operations
 */
export const trace = (df: Series): Series => {
    if (df===undefined) throw new Error ('series is undefined')
    if (df.itemSize !== 6 && df.itemSize !==9) throw new Error('TypedArray does not contain tensors (size 6 or 9)')

    const size  = df.itemSize
    const count = df.count
    const r = new Series(count)
    for (let i=0; i<count; ++i) {
        let a = df.itemAt(i) as number[]
        if (size === 6) {
            r[i] = a[0]+a[3]+a[5]
        }
        else {
            r[i] = a[0]+a[4]+a[8]
        }
    }

    return r
}