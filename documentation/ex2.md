Using `createSerie`, `map` and `reduce`

```ts
import { createSerie, createArray } from '@youwol/dataframe/utils'
import { reduce } from '@youwol/dataframe/algorithms'

// Performs alpha[0]*S[0] + alpha[1]*S[1] + alpha[2]*S[2]
// i.e., sum_i{ alpha_i . S_i }

const alpha = [1, 2, 3]

const S = [
    Serie.create( {array: createArray(18, i => i  ), itemSize: 6})
    Serie.create( {array: createArray(18, i => i+1), itemSize: 6})
    Serie.create( {array: createArray(18, i => i+2), itemSize: 6})
]

const solution = reduce( S, (stresses) =>
    stresses
        .map( (s, i) => s.map( v => v*alpha[i] ) )
        .reduce( (acc, stress) => stress.map( (v,j) => v+acc[j] ), [0,0,0,0,0,0])
)

// solution.array = [
//    8, 14, 20, 26,  32,  38,
//   44, 50, 56, 62,  68,  74,
//   80, 86, 92, 98, 104, 110
// ]
```

The same example using math operations `add` and `mult`
```ts
import { Serie, createArray } from '@youwol/dataframe/utils'
import { add, mult } from '@youwol/dataframe/math'

const alpha = [1, 2, 3]

const S1 = Serie.create( {array: createArray(18, i => i  ), itemSize: 6})
const S2 = Serie.create( {array: createArray(18, i => i+1), itemSize: 6})
const S3 = Serie.create( {array: createArray(18, i => i+2), itemSize: 6})

const solution = add(
    mult( S1, alpha[0] ),
    mult( S2, alpha[1] ),
    mult( S3, alpha[2] )
)

// solution.array = [
//    8, 14, 20, 26,  32,  38,
//   44, 50, 56, 62,  68,  74,
//   80, 86, 92, 98, 104, 110
// ]
```