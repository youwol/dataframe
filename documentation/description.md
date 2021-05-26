This library provides an immutable data structure for javascript and datascience using `Array` and `TypedArray` with `ArrayBuffer` or `SharedArrayBuffer`, and which allows to work on rows and columns using functional programming.

## Examples of how to create Series
In the following, we use itemSize = 3 as an example.
### From an Array
```ts
const array = new Array(...)
const serie = Serie.create({array: array as IArray, itemSize: 3})
```

### From a TypedArray
```ts
const typedArray = new Float32Array(...)
const serie = Serie.create({array: typedArray as IArray, itemSize: 3})
```

### From a BufferAttribute (Three.js)
```ts
const bufferAttribute = new THREE.BufferAttribute(...)
const serie = Serie.create({array: bufferAttribute.array as IArray, itemSize: 3})
```
