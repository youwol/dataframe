import { ASerie } from '../serie'

/**
 * @category Stats
 */
export const weightedMean = (s: ASerie, w: ASerie): number|number[] => {
    if (s===undefined) throw new Error ('s is undefined')
    if (w===undefined) throw new Error ('w is undefined')
    if (w.count !== s.count) throw new Error (`count mismatch for s (${s.count}) and w (${w.count})`)
    if (w.itemSize !== 1) throw new Error (`itemSize for w should be 1 (got ${w.itemSize})`)

    const W = w.array.reduce( (acc,v) => acc+v, 0)

    const n = s.itemSize
    if (n === 1) {
        return s.array.reduce( (acc, v, i) => acc+v*w.array[i], 0) / W
    }

    const r = new Array(n).fill(0)

    s.forEach( (v,i) => {
        for (let j=0; j<n; ++j) {
            r[j] += w.array[i]*v[j]// /s.count
        }
    })

    return r.map( v => v / W)
}
