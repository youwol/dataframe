/**
 * Given a symmetric matrix of rank 2 and dim nxn,
 * provide the index in a flat array gien the indices (i,j).
 * Index j should be in [0..i] and i in [0..n]
 * @category Views
 */
export const indexSym = (n: number, i: number, j: number): number => {
    return 0.5 * i * (2 * n - 1 - i) + j
}

/**
 * @category Views
 */
export const index = (n: number, i: number, j: number): number => {
    return i * n + j
}
