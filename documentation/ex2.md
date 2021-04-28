Using `createSerie`, `map` and `reduce`

```ts
import { createSeries, createArray } from '@youwol/dataframe/utils'
import { reduce } from '@youwol/dataframe/algorithms'

// perform reduced = alpha[0]*S1 + alpha[1]*S2 + alpha[2]*S3
const S1 = createSerie( {data: createArray(18, i => i  ), itemSize: 6})
const S2 = createSerie( {data: createArray(18, i => i+1), itemSize: 6})
const S3 = createSerie( {data: createArray(18, i => i+2), itemSize: 6})
const alpha = [1, 2, 3]

const reduced = reduce( [S1, S2, S3], (stresses) =>
    stresses
        .map( (s, i) => s.map( v => v*alpha[i] ) )
        .reduce( (acc, stress) => stress.map( (v,j) => v+acc[j] ), [0,0,0,0,0,0])
)
// reduced.array = [
//    8, 14, 20, 26,  32,  38,
//   44, 50, 56, 62,  68,  74,
//   80, 86, 92, 98, 104, 110
// ]
```