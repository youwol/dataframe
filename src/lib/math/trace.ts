import { IArray, Serie } from "../serie"


/**
 * Get the trace of symmetric matrices of size:
 * <ul>
 *   <li> 6: [xx, xy, xz, yy, yz, zz]
 *   <li> 9: [xx, xy, xz, yx, yy, yz, zx, zy, zz]
 * </ul>
 * @category Math
 */
 export function trace(s: Serie<IArray>|undefined) {
    if (s === undefined) throw new Error ('series is undefined')
    if (s.itemSize!==1 && s.itemSize!==6 && s.itemSize!==9) throw new Error ('item size should be 1, 6 or 9')

    if (s.itemSize === 1) {
        return s.clone()
    }

    const itemSize = s.itemSize
    const r = s.image(s.count, 1)
    for (let i=0; i<s.count; ++i) {
        let a = s.itemAt(i) as number[]
        if (itemSize === 6) {
            r.array[i] = a[0]+a[3]+a[5]
        }
        else {
            r.array[i] = a[0]+a[4]+a[8]
        }
    }
    return r
}