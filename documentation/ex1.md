Using `createSerie` and `reduce`

```ts
import { Serie, createArray } from '@youwol/dataframe/utils'
import { reduce } from '@youwol/dataframe/algorithms'

const a   = Serie.create( { array: createArray(9, i=>i+1), itemSize: 3 })
const sol = reduce( a, v => v[0]+v[1]+v[2])
// sol.array = [6, 15, 24]
```