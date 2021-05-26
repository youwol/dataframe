Using DataFrame and others

```ts
import { DataFrame } from '@youwol/dataframe'
import { createEmptySeries, createSerie, createArray } from '@youwol/dataframe/utils'
import { trace, add, mult } from '@youwol/dataframe/math'

let df = new DataFrame({
    series: {
        a: createEmptySerie({ // length = 2*3
            Type     : Float32Array, 
            count    : 2, 
            itemSize : 3, 
            shared   : true
            }), 
        b: createEmptySerie({ // length = 2*3
            Type     : Float64Array, 
            count    : 2,
            itemSize : 3, 
            shared   : false
            }),
        c: Serie.create( {array: createArray(10, i => i), itemSize: 5}), // length = 10
        d: {
            serie: Serie.create({
                array: createArray(10, i => i),
                itemSize: 5,
                userData:{id:'tensor'}
            })
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

// Performs a weighted sum of 2 series
const a = add(
    mult( df.get('a'), 0.1 ),
    mult( df.get('b'), 0.2 )
)
console.log(a)

df = append(df, {'d': a})
```
will display
```sh
[ 10, 35 ]
add = Serie {
  array: [
    100, 101, 102, 103,
    104, 105, 106, 107,
    108, 109
  ],
  itemSize: 5,
  shared: false
}
mult = Serie {
  array: [
      0, 100, 200, 300,
    400, 500, 600, 700,
    800, 900
  ],
  itemSize: 5,
  shared: false
}
Serie { array: Float32Array(6) [ 0, 0, 0, 0, 0, 0 ], itemSize: 3, shared: true }
```