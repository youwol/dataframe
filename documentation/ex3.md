Using `createSerie` and `views`

```ts
import { createSeries, createArray } from '@youwol/dataframe/utils'
import { reduce } from '@youwol/dataframe/algorithms'
import { matrix, vector } from '@youwol/dataframe/views'

const M = createSerie( createArray(27, i=>i), 9) // [0,1,2...17]
const V = createSerie( createArray(9 , i=>i), 3) // [0,1,2...8]

const reduced = reduce([M, V], ([m, v]) => {
    const A = matrix(m)
    const x = vector(v).normalize()
    return A.transpose().multVec(x)
})

// reduced.array = [
//    6.70820379257202,  8.04984474182128,  9.39148521423339,
//   21.21320343017578, 22.91025924682617, 24.60731506347656,
//   36.61966705322265, 38.34005355834961, 40.06044006347656
// ]
```