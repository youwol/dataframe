import { DataFrame } from '../lib/dataframe'
import { add, mult, trace } from '../lib/math'
import { createArray, createEmptySerie, createSerie } from '../lib/utils'

let df = new DataFrame({
    index: new Array(10).fill(0).map( (_,i) => i),
    columns: {
        a: createEmptySerie({Type: Float32Array, count:2, itemSize:3, shared: true }),
        b: createEmptySerie({Type: Float64Array, count:2, itemSize:3, shared: false}),
        c: createSerie( {data: createArray(10, i=>i), itemSize: 5}),
        d: {
            serie: createSerie( {data: createArray(10, i=>i), itemSize: 5}),
            transfertPolicy: 'transfert',
            userData:{id:'tensor'}
        }
    },
    userData: {
        id: 'dataframe-1'
    }
})

console.log( trace( df.get('c') ) )

console.log('add =', add(
    df.get('c'),
    100
))

console.log('mult =', mult(
    df.get('c'),
    100
))

const a = add(
    mult( df.get('a'), 0.1 ),
    mult( df.get('b'), 0.2 )
)
console.log(a)

df = df.set('d', a)

// console.log(df)
