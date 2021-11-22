Using `Manager` with `DataFrame` to access implicit decompositions of series

```ts
import { DataFrame, Serie, Manager } from '@youwol/dataframe'
import {
    PositionDecomposer, ComponentDecomposer,
    EigenValuesDecomposer, EigenVectorsDecomposer
} from '@youwol/math/decompose'

const  df = new DataFrale.create({
    series: {
        S: Serie.create({
            array: new Array(18).fill(0).map((v,i)=>i*2),
            itemSize: 6
        })
    }
})

const mng = new Manager(df, [
    new PositionDecomposer,
    new ComponentDecomposer,
    new EigenValuesDecomposer,
    new EigenVectorsDecomposer
])

// Gather possible scalar series name
console.log( mng.names(1) )
// Display: Sxx, Sxy, Sxz, Syy, Syz, Szz, S1, S2, S3

// Gather possible vector3 series name
console.log( mng.names(3) )
// Display: S1, S2, S3

const scalar = mng.serie(1, 'S1')
const vector = mng.serie(3, 'S1')
```