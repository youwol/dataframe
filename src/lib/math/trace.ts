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
    if (s === undefined) {
        return []
    }
    if (s && s.itemSize===1 ) {
        return s.array.map( (_:number) => _)
    }

    const r = s.array.slice(0, s.count)
    for (let i=0; i<s.count; ++i) {
        let a = s.itemAt(i) as number[]
        if (s.itemSize === 6) {
            r[i] = a[0]+a[3]+a[5]
        }
        else {
            r[i] = a[0]+a[4]+a[8]
        }
    }
    return r
}