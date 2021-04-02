# dataframe

<p>
    <a href="https://github.com/kefranabg/readme-md-generator/graphs/commit-activity" target="_blank">
        <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
    </a>
    <a href="https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE" target="_blank">
        <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
    </a>
</p>

The library datagrame provides an immutable data structure for javascript and datascience using SharedArrayBuffer and ArrayBuffer, which allows to work on rows and columns using functional programming.

## Example
```ts
import { DataFrame, createSeries, add, mult } from '@youwol/dataframe'

let df = new DataFrame()
    .set('a', createSeries(10, 2).initialize(2) )
    .set('b', createShatedSeries(10, 3).initialize(3) )

// Performs a weighted sum od Series
const sum = add(
    mult( df.get('a'), 10),
    mult( df.get('b'), 20)
))

console.log( info(series) )

// Add the newly created series in the dataframe
df = df.set('sum', sum)
```
will display
```sh
{
    dtype: 'Float32',
    length: 20,
    itemSize: 2,
    count: 10,
    isShared: false,
    bytesPerElement: 4,
    array: Float32Array(20) [
        80, 80, 80, 80, 80, 80, 80,
        80, 80, 80, 80, 80, 80, 80,
        80, 80, 80, 80, 80, 80
    ]
}
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
