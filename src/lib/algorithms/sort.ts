import { Serie } from "../serie"

/**
 * Sort a [[Serie]] for which itemSize = 1
 * @category Algorithms
 */
export const sort = (serie: Serie, fn: Function = (a,b)=>(a-b)): Serie => {
    if (serie.itemSize !== 1) throw new Error('sort algorithm: itemSize must be 1')
    const s = serie.clone(false)
    s.array.sort(fn)
    return s
}
