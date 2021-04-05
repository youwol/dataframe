## A) Describe items with the following info (in Serie):
- dim:
    - dim = `[1]` | `undefined` <-- rank 0
    - dim = `[n]` <-- rank 1 (vector)
    - dim = `[m, n]` <-- rank 2 (matrix)
- property: `sym` | `anti` | `full` (default)


### 1. Relation between dim, itemSize and rank
| Js | itemSize | rank | Algebra
| ------ | ----------- | -------- | --------- |
| `[] or [0]` | `1` | 0 | scalar
| `[n]` | `n` | 1 | vector
| `[m ,n]` | `m*n` | 2 | matrix

<br>

### 2. Refactorize items accordingly
Change `itemSize` to:
```ts
{
    dim: number[] = [],
    prop: string = 'sym'
}
```

### 3. And now allows linear algebra
- `mat*mat`
- `mat*vec`
- `inv(mat)`
- `transpose(mat)`

=>
```ts

const M = createSerie(...) // a rank 2 squared matrix of dim 3
const R = createSerie(...) // a rotation matrix

const values = eigenValue( mult(R, mult(M, transpose(R) ) )
```
