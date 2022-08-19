import { Serie } from '../serie'

/**
 * @note Operations are done using the items
 * @example
 * ```ts
 * const s1 = createSerie( {data: createArray(12, i => i+1), itemSize: 3} )
 * s1.forEach( i1 => console.log(i1) )
 * forEach(s1, i1 => console.log(i1) )
 * 
 * const s2 = createSerie( {data: createArray(12, i => i+2), itemSize: 3} )
 * forEach([s1,s2], ([i1, i2]) => console.log(i1, i2) )
 * ```
 * @category Algorithms
 */
export const forEach = (series: Serie | Serie[], callback: Function) => {
    if (series===undefined) throw new Error ('serie is undefined')

    if ( !Array.isArray(series) ) {
        for (let i=0; i<series.count; ++i) {
            callback( series.itemAt(i), i, series )
        }
        return
    }

    let count = series[0].count
    for (let i=0; i<count; ++i) {
        callback( series.map( serie => serie.itemAt(i) ), i, series)
    }
}
