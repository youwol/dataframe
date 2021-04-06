import { Matrix } from "./matrix"

/**
 * @brief Create a new squared symmetric [[Matrix]]
 * @category Views
 */
export const symSquaredMatrix = (v: number[], m: number) => new SMatrix(v, m)

/**
 * Full matrix of dim (m x n)
 * @category Views
 */
export class SMatrix extends Matrix {
    constructor(protected v: number[], readonly m: number) {
        super(v, m, m)

        const n = m*(m+1)/2
        if (v.length !== n) throw new Error(`wrong length for the array. Should be ${n} and got ${v.length}`)
    }

    at(i: number, j: number) {
        if (j<i) return this.v[this.index(j,i)]
        return this.v[this.index(i,j)]
    }

    index(i: number, j: number) {
        return 0.5 * i * (2 * this.m - 1 - i) + j
    }
}
