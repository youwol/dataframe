import { ASerie, Serie } from '../serie'

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
 export const map = (series: ASerie | ASerie[], cb: Function) => {
    if (series instanceof Serie) {
        return series.map(cb)
    }
    
    let R: ASerie = undefined
    let isArray   = true
    let id        = 0

    const count   = series[0].count
    const args    = new Array<number[]|number>(series.length)

    for (let i=0; i<count; ++i) {
        for (let j=0; j<series.length; ++j) {
            args[j] = series[j].itemAt(i)
        }

        const r = cb(args)
        if (R === undefined) {
            isArray = Array.isArray(r)
            R = series[0].image(count, isArray ? r.length : 1 )
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
// export const map = (s: ASerie, callback: Function) => {
//     if (s===undefined) throw new Error ('serie is undefined')

//     const r  = s.array.slice(0, s.count)
//     const count = s.count

//     let k = 0
//     for (let i=0; i<count; ++i) {
//         r[i] = callback( s.itemAt(i) )
//     }

//     return createSerie({data: r, itemSize: s.itemSize})
// }
