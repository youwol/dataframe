# DataFrame library

## Functional schemes

We would like to be able to do the following

```ts
const s = add(abs(serie1.dot(serie2)), -1)
  .squared()
  .div(serieWeights)
  .div(sumWeights)
```

instead of

```ts
const s = div(
  div(square(sub(abs(dot(serie1, serie2)), 1)), serieWeights),
  sumWeights,
)
```

The idea is to extend the prototype of `Serie` abd `DataFrame`

```ts
class Serie {}

Serie.prototype.add = (a, b) => a + b

const serie = new Serie()
console.log(serie.add(1, 2))
```

## Refactoring Attribute library

In order to work with a dataframe, and which allows

- any attribute (scalar, vector2, vector3, symMatrix3...)
- attribute converters
- symbolic attribute
- functional attribute
- implicite attribute (gaussian curvature, coordinate...)
- operation on attributes (add, sub, mult, div...)
- public/private ?

## References

### Math optim

- https://stackoverflow.com/questions/54328275/math-js-is-slow-to-multiply-2-big-matrices
