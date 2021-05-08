- `check`
- `_if`
- `checkNaN`
- `tagNaN`
- `nan`
- `notNan`
- `ge`
- `gt`
- `le`
- `lt`
- `ne`
- `interpolate`
- `rand`
- `median`
- `pipe`
- `pow`
- `round`
- `trunc`
- `std`
- `view` (transform a Serie from a given type to another)
- `where`

```ts
const s = createSerie({data: [1,2,3,4,5,6,7,8,9]})

_if( check(s, item => item<3 ), item => {}, item => {} )
```