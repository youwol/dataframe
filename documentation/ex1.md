Using `createSerie` and `reduce`

```ts
import { createSeries, createArray } from '@youwol/dataframe/utils'
import { reduce } from '@youwol/dataframe/algorithms'

const a   = createSerie( { data: createArray(9, i=>i+1), itemSize: 3 })
const sol = reduce( a, v => v[0]+v[1]+v[2])
// sol.array = [6, 15, 24]
```