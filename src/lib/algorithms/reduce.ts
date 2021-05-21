import { Serie } from '../serie'
import { createEmptySerie } from '../utils'


/**
 * @returns a new [[Serie]]
 * @example
 * ```ts
 * const A = df.get('A')
 * const y = df.get('y')
 * const reduced = reduce([A,y], ([m,x]) => {
 *     let vec = vector(x)
 *     let mat = smatrix(m, 3, 3) // sym matrix rank 2
 *     return mat.transpose().multVec( vector(vec).normalize() ).array
 * })
 * ```
 * @category Algorithms
 */
export const reduce = (series: Serie | Serie[], callback: Function) => {
    if (series instanceof Serie) {
        const count = series.count
        const r = series.image(count, 1)
        
        for (let i=0; i<count; ++i) {
            const v = series.itemAt(i)
            r.array[i] = callback(series.itemAt(i), i, series)
        }

        return r
    }

    // Assert all series have the same nbr of element (count)
    const n     = series.length
    const count = series[0].count

    series.forEach( s => {
        if (s.count !== count) throw new Error('All series must have the same nbr of elements (count)')
    })

    let R: Serie = undefined
    const args = new Array<number[]|number>(n)//.fill([])
    let isArray = true
    let id = 0
    for (let i=0; i<count; ++i) {
        for (let j=0; j<n; ++j) {
            args[j] = series[j].itemAt(i)
        }

        const r = callback(args)
        
        if (R === undefined) {
            isArray = Array.isArray(r)
            // TODO: deal with Float32Array, count and itemSize by default !!!
            //R = createEmptySerie({Type: Float32Array, count, itemSize: r.length})
            R = series[0].image( count, (isArray?r.length:1) )
        }
        if (isArray) {
            r.forEach( v => R.array[id++] = v)
        }
        else {
            R.array[id++] = r
        }
    }

    return R
}
