import { Vector } from './vector'

/**
 * It can be demonstrated that n(n+1)/2 = n^2 for n in N*, if and only if n=1.
 * That is to say, they's no ambiguity about the length of the passed flatten array
 * to determine if it is a bad, a symmetric or a full matrix
 * ```ts
 * const m = array.length
 * const m1 = Math.sqrt(m)
 * const m2 = (Math.sqrt(8*v.length+1)-1)/2
 * ```
 */

/**
 * Equivalent to [[squaredMatrix]]
 * @param v
 * @category Views
 */
export const matrix = (v: number[]) => squaredMatrix(v)

/**
 * @brief Create a new squared [[Matrix]]
 * @category Views
 */
export const squaredMatrix = (v: number[]) => {
    const m = Math.sqrt(v.length)
    if (!Number.isInteger(m))
        throw new Error(
            `squared matrix requires m*m coefficients (got m=${v.length})`,
        )
    return new Matrix(v, m)
}

/**
 * @brief Create a new squared symmetric [[Matrix]]
 * @category Views
 */
export const symSquaredMatrix = (v: number[]) => {
    const m = (Math.sqrt(8 * v.length + 1) - 1) / 2
    if (!Number.isInteger(m))
        throw new Error(
            `symmetric squared matrix of dim m requires (m*(m+1)/2) coefficients (got ${v.length}`,
        )

    const index = (i: number, j: number) => i * m + j
    const indexS = (i: number, j: number) =>
        j < i ? 0.5 * j * (2 * m - 1 - j) + i : 0.5 * i * (2 * m - 1 - i) + j

    const w = new Array(m * m).fill(0)
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < m; ++j) {
            w[index(j, i)] = v[indexS(i, j)]
        }
    }
    const M = new Matrix(w, m)
    return M
}

/**
 * Full matrix of dim (m x m)
 * @category Views
 */
export class Matrix {
    constructor(
        protected v: number[],
        readonly m: number,
    ) {}

    index(i: number, j: number) {
        return i * this.m + j
    }

    get isSymmetric() {
        let ok = true
        for (let i = 0; i < this.m; ++i) {
            for (let j = i; j < this.m; ++j) {
                ok = ok && this.at(i, j) === this.at(j, i)
            }
        }
        return ok
    }

    copy() {
        return new Matrix([...this.v], this.m)
    }

    at(i: number, j: number) {
        return this.v[this.index(i, j)]
    }

    trace() {
        let t = 0
        for (let i = 0; i < this.m; ++i) t += this.at(i, i)
        return t
    }

    set(i: number, j: number, v: number) {
        this.v[this.index(i, j)] = v
        return this
    }

    add(i: number, j: number, v: number) {
        this.v[this.index(i, j)] += v
        return this
    }

    /**
     * Scale this matrix
     * @returns this
     */
    scale(s: number) {
        this.v = this.v.map((v) => v * s)
        return this
    }

    get length() {
        return this.v.length
    }

    /**
     * Return a copy of the underlaying array (flatten components). If the matrix
     * is symmetric, a compressed array is returned.
     */
    get array() {
        if (this.isSymmetric) {
            const a = new Array((this.m * (this.m + 1)) / 2).fill(0)
            let k = 0
            for (let i = 0; i < this.m; ++i) {
                for (let j = i; j < this.m; ++j) {
                    a[k++] = this.at(i, j)
                }
            }
            return a
        }
        return [...this.v]
    }

    /**
     * Transpose this matrix and return a new one
     * @returns a new [[Matrix]]
     */
    transpose() {
        const v = new Array(this.v.length).fill(0)
        let id = 0
        for (let j = 0; j < this.m; ++j) {
            for (let i = 0; i < this.m; ++i) {
                v[id++] = this.at(i, j)
            }
        }
        return new Matrix(v, this.m)
    }

    /**
     * @returns a new [[Vector]]
     */
    multVec(v: Vector | number[]): Vector {
        if (v.length !== this.m)
            throw new Error('size mismatch for product matrix vector')
        const t = new Array(v.length).fill(0)

        const a = v instanceof Vector ? v.array : v
        for (let i = 0; i < this.m; ++i) {
            for (let j = 0; j < this.m; ++j) {
                t[i] += this.at(i, j) * a[j]
            }
        }
        return new Vector(t)
    }

    /**
     * @returns a new [[Matrix]]
     */
    multMat(m: Matrix): Matrix {
        if (m.m !== this.m)
            throw new Error('size mismatch for product matrix matrix')
        const t = new Array(m.length).fill(0)

        for (let i = 0; i < this.m; ++i) {
            for (let j = 0; j < this.m; ++j) {
                for (let k = 0; k < this.m; ++k) {
                    t[this.index(i, j)] += this.at(i, k) * m.at(k, j)
                }
            }
        }

        return new Matrix(t, this.m)
    }

    /**
     * Add a new matrix to this (element-wise)
     * @returns this
     */
    addMat(m: Matrix) {
        if (m.m !== this.m) throw new Error('sizes mismatch for adding matrix')

        for (let i = 0; i < this.v.length; ++i) {
            this.v[i] += m.v[i]
        }

        return this
    }

    toString() {
        let s = ''
        for (let i = 0; i < this.m; ++i) {
            for (let j = 0; j < this.m; ++j) {
                s += this.at(i, j) + '\t'
            }
            s += '\n'
        }
        return s
    }
}
