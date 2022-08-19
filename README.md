# A Pandas like dataframe in TypeScript.

<p>
    <a href="https://github.com/kefranabg/readme-md-generator/graphs/commit-activity" target="_blank">
        <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
    </a>
    <a href="https://github.com/youwol/dataframe/blob/main/LICENSE.md" target="_blank">
        <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
    </a>
</p>

This library provides an immutable data structure for javascript and datascience using `Array` and `TypedArray` with `ArrayBuffer` or `SharedArrayBuffer`, and which allows to work on rows and columns using functional programming.

## Extension
A mathematical extension of this library is provided in [@youwol/math](https://github.com/youwol/math)

## Documentation
See the [online documentation](https://youwol.github.io/dataframe/dist/docs/index.html).

## License <a name="license"></a>
[MIT license](https://github.com/youwol/dataframe/blob/main/LICENSE.md)

___

## Examples of how to create Series
In the following, we use itemSize = 3 as an example.
### From an Array
```ts
import { Serie } from '@youwol/dataframe'

const array = new Array(...)
const serie = Serie.create({
    array: array as IArray,
    itemSize: 3
})
```

### From a TypedArray
```ts
import { Serie } from '@youwol/dataframe'

const typedArray = new Float32Array(...)
const serie = Serie.create({
    array: typedArray as IArray,
    itemSize: 3
})
```

### From a BufferAttribute (Three.js)
```ts
import { Serie } from '@youwol/dataframe'
import { BufferAttribute } from 'three'

const bufferAttribute = new BufferAttribute(...)
const serie = Serie.create({
    array: bufferAttribute.array as IArray,
    itemSize: 3
})
```

### How to iterate over multiple series
```ts
import { forEach, map, Serie } from '@youwol/dataframe'

const S1 = Serie.create({ array, itemSize: 1 })
const S2 = Serie.create({ array, itemSize: 1 })
const S3 = Serie.create({ array, itemSize: 1 })

forEach([S1, S2, S3], ([s1, s2, s3]) => {
    console.log(s1, s2, s3)
})

// create a serie with itemSize = 3
const s = map([S1, S2, S3], ([s1, s2, s3]) => [s1, s2, s3] )
```