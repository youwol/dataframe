import { ASerie, Serie } from '../lib/serie'
import { createSerie, createArray, createEmptySerie } from '../lib/utils'
import { add } from '../lib/math'
import { map, reduce, vector } from '../lib'

const forEach = (series: ASerie | ASerie[], callback: Function) => {
    if (series===undefined) throw new Error ('serie is undefined')

    if (series instanceof Serie) {
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

const dot = (a: ASerie, b: ASerie) => map([a, b], ([v1, v2]) => vector(v1).dot( vector(v2) ) )

// const doit = (a: string[], cb: Function) => {
//     return cb(a)
// }
// const A = ['a1', 'b2', 'c3']
// doit(A, ([a,...rest]) => {
//     console.log(a,...rest)
// })
// doit(A, a => {
//     console.log(a)
// })

test('test test', () => {
    const s1 = createSerie( {data: createArray(12, i => i+1), itemSize: 3} )
    const s2 = createSerie( {data: createArray(12, i => i+2), itemSize: 3} )
    
    console.log( map([s1, s2], ([i1, i2]) => i1.map( (i,j)=>i+i2[j] ) ) )
    console.log( map(s1, i1 => i1.map( i => i**2) ) )

    forEach([s1,s2], ([i1, i2]) => console.log(i1, i2) )

    console.log( dot(s1, s2) )
})
