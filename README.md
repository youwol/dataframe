# dataframe

<p>
    <a href="https://github.com/kefranabg/readme-md-generator/graphs/commit-activity" target="_blank">
        <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
    </a>
    <a href="https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE" target="_blank">
        <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
    </a>
</p>

The library `dataframe` provides an immutable data structure for javascript and datascience using `Array` and `TypedArray` with `ArrayBuffer` or `SharedArrayBuffer`, and which allows to work on rows and columns using functional programming.

## Example
```ts
import { DataFrame, createSeries } from '@youwol/dataframe'
import { add, mult } from '@youwol/dataframe/math'

let df = new DataFrame({
    columns: {
        a: createEmptySerie({Type: Float32Array, rowsCount:2, itemSize:3, shared: true }),
        b: createEmptySerie({Type: Float64Array, rowsCount:2, itemSize:3, shared: false}),
        c: createSerie([0,1,2,3,4,5,6,7,8,9], 5),
        d: {
            serie: createSerie([0,1,2,3,4,5,6,7,8,9], 5),
            transfertPolicy: 'transfert',
            userData:{id:'tensor'}
        }
    },
    userData: {
        id: 'dataframe-1'
    }
})

console.log( trace( df.getSerie('c') ) )

console.log('add =', add(
    df.getSerie('c'),
    100
))

console.log('mult =', mult(
    df.getSerie('c'),
    100
))

// Performs a weighted sum of 2 series
const a = add(
    mult( df.getSerie('a'), 0.1 ),
    mult( df.getSerie('b'), 0.2 )
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

## Installation, Build & Test 

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
