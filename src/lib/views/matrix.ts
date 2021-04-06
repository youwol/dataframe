import { vector, Vector } from "./vector"
import { index }  from './utils'

/**
 * @brief Create a new squared [[Matrix]]
 * @category Views
 */
export const squaredMatrix = (v: number[], m: number) => new Matrix(v, m, m)

/**
 * Full matrix of dim (m x n)
 * @category Views
 */
export class Matrix {
    constructor(protected v: number[], readonly m: number, readonly n: number) {
    }

    index(i: number, j: number) {
        return index(this.m, i, j)
    }

    copy() {
        return new Matrix([...this.v], this.m, this.n)
    }

    at(i: number, j: number) {
        return this.v[ this.index(i,j) ]
    }

    trace() {
        if (this.m !== this.n) throw new Error('Cannot give the trace of a rectangular matrix')
        let t = 0
        for (let i=0; i<this.m; ++i) t += this.at(i,i)
        return t
    }
    
    set(i: number, j: number, v: number) {
        this.v[ this.index(i, j) ] = v
        return this
    }

    add(i: number, j: number, v: number) {
        this.v[ this.index(i, j) ] += v
        return this
    }

    /**
     * Scale this matrix
     * @returns this
     */
     scale(s: number) {
        this.v = this.v.map( v => v*s )
        return this
    }

    get length() {
        return this.v.length
    }

    get array() {
        return this.v
    }

    /**
     * Transpose this matrix and return a new one
     * @returns a new [[Matrix]]
     */
    transpose() {
        const v = new Array(this.v.length).fill(0)
        let id = 0
        for (let j=0; j<this.n; ++j) {
            for (let i=0; i<this.m; ++i) {
                v[id++] = this.at(i,j)
            }
        }
        return new Matrix(v, this.m, this.n)
    }

    /**
     * @returns a new [[Vector]]
     */
    multVec(v: Vector | number[]): Vector {
        if (v.length !== this.n) throw new Error('size mismatch for product matrix vector')
        const t = new Array(v.length).fill(0)

        const a = (v instanceof Vector ? v.array : v)
        for (let i=0; i<this.m; ++i) {
            for (let j=0; j<this.n; ++j) {
                t[i] += this.at(i,j) * a[j]
            }
        }
        return new Vector(t)
    }

    /**
     * @returns a new [[Matrix]]
     */
    multMat(m: Matrix): Matrix {
        if (m.m !== this.n) throw new Error('size mismatch for product matrix matrix')
        const t = new Array(m.length).fill(0)

        for (let i=0; i<this.m; ++i) {
            for (let j=0; j<this.n; ++j) {
                for (let k=0; k<this.n; ++k) {
                    t[ this.index(i,j) ] += this.at(i,k) * m.at(k,j)
                }
            }
        }

        return new Matrix(t, this.m, this.m)
    }

    /**
     * Add a new matrix to this (element-wise)
     * @returns this
     */
    addMat(m: Matrix) {
        if (m.m !== this.m || m.n !== this.n) throw new Error('sizes mismatch for adding matrix')

        for (let i=0; i<this.v.length; ++i) {
            this.v[i] += m.v[i]
        }

        return this
    }

    toString() {
        let s = ''
        for (let i=0; i<this.m; ++i) {
            for (let j=0; j<this.n; ++j) {
                s += this.at(i,j) + '\t'
            }
            s += '\n'
        }
        return s
    }
}
