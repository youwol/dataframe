import { Serie } from '../serie'

/**
 * map a [[Serie]] onto another one using a map function.
 * @note Operations are done using the items
 * @example
 * ```ts
 * const s1 = createSerie( {data: createArray(12, i => i+1), itemSize: 3} )
 * s1.map( i1 => i1.map(i => i**2 ) )
 * map(s1, i1 => i1.map(i => i**2 ) )
 *
 * const s2 = createSerie( {data: createArray(12, i => i+2), itemSize: 3} )
 * console.log( map([s1, s2], ([i1, i2]) => vector(i1).dot( vector(i2) ) )
 * ```
 * @category Algorithms
 */
export const map = (series: Serie | Serie[], cb: Function) => {
    if (Array.isArray(series)) {
        let R: Serie = undefined
        let isArray = true
        let id = 0

        const count = series[0].count
        const args = new Array<number[] | number>(series.length)

        for (let i = 0; i < count; ++i) {
            for (let j = 0; j < series.length; ++j) {
                args[j] = series[j].itemAt(i)
            }

            const r = cb(args)
            if (R === undefined) {
                isArray = Array.isArray(r)
                R = series[0].image(count, isArray ? r.length : 1)
            }

            if (isArray) {
                r.forEach((v) => (R.array[id++] = v))
            } else {
                R.array[id++] = r
            }
        }

        return R
    }

    return series.map(cb)
}
