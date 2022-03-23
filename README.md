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
const array = new Array(...)
const serie = Serie.create({
    array: array as IArray,
    itemSize: 3
})
```

### From a TypedArray
```ts
const typedArray = new Float32Array(...)
const serie = Serie.create({
    array: typedArray as IArray,
    itemSize: 3
})
```

### From a BufferAttribute (Three.js)
```ts
const bufferAttribute = new THREE.BufferAttribute(...)
const serie = Serie.create({
    array: bufferAttribute.array as IArray,
    itemSize: 3
})
```