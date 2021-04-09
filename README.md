# dataframe

<p>
    <a href="https://github.com/kefranabg/readme-md-generator/graphs/commit-activity" target="_blank">
        <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
    </a>
    <a href="https://github.com/youwol/dataframe/blob/main/LICENSE.md" target="_blank">
        <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
    </a>
</p>

This library provides an immutable data structure for javascript and datascience using `Array` and `TypedArray` with `ArrayBuffer` or `SharedArrayBuffer`, and which allows to work on rows and columns using functional programming.

# Table of Contents
1. [Example 1](#example1)
1. [Example 2](#example2)
1. [Example 3](#example3)
1. [Example 4](#example4)
1. [Installation](#install)
1. [License](#license)

## Example 1: createSerie and reduce<a name="example1"></a>
```ts
import { createSeries, createArray } from '@youwol/dataframe/utils'
import { reduce } from '@youwol/dataframe/algorithms'

const a   = createSerie( createArray(9, i=>i+1), 3)
const sol = reduce( a, v => v[0]+v[1]+v[2])
// sol.array = [6, 15, 24]
```

## Example 2: createSerie, map and reduce<a name="example2"></a>
```ts
import { createSeries, createArray } from '@youwol/dataframe/utils'
import { reduce } from '@youwol/dataframe/algorithms'

// perform reduced = alpha[0]*S1 + alpha[1]*S2 + alpha[2]*S3
const S1 = createSerie( createArray(18, i => i  ), 6)
const S2 = createSerie( createArray(18, i => i+1), 6)
const S3 = createSerie( createArray(18, i => i+2), 6)
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

## Example 3: createSerie and views<a name="example3"></a>
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

## Example 4<a name="example4"></a>
```ts
import { DataFrame } from '@youwol/dataframe'
import { createEmptySeries, createSerie, createArray } from '@youwol/dataframe/utils'
import { trace, add, mult } from '@youwol/dataframe/math'

let df = new DataFrame({
    columns: {
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
        c: createSerie( createArray(10, i => i), 5), // length = 10
        d: {
            serie: createSerie( createArray(10, i => i), 5), // length = 10
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

// Performs a weighted sum of 2 series
const a = add(
    mult( df.get('a'), 0.1 ),
    mult( df.get('b'), 0.2 )
)
console.log(a)

df = df.set('d', a)
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

## Installation, Build & Test<a name="install"></a>

To install the required dependencies:
```shell
yarn 
```

To build for development:
```shell
yarn build:dev
```

To build for production:
```shell
yarn build:prod
```

To test:
```shell
yarn test
```

To generate code documentation:
```shell
yarn doc
```

## License <a name="license"></a>
[MIT license](https://github.com/youwol/dataframe/blob/main/LICENSE.md)