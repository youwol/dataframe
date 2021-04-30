import { ASerie } from '../serie'

/**
 * Only transpose matrix in the form of arrays of size 9
 * @category Math
 */
 export const transpose = (s: ASerie) => {
    if (s === undefined) return undefined
    if (s.itemSize!==9) throw new Error('items size should be 9 only (for now)')

    const r = s.clone()
    const a = r.array

    let id = 0
    s.forEach( (item) => {
        a[id++] = item[0]; a[id++] = item[3]; a[id++] = item[6]
        a[id++] = item[1]; a[id++] = item[4]; a[id++] = item[7]
        a[id++] = item[2]; a[id++] = item[5]; a[id++] = item[8]
    })

    return r
}

// ---------------------------------------------------
// !!! private

// IN DEV...
/*
class Matrix {
    n: number = 0
    full: boolean
    tmp: number[][]

    constructor(private s: ASerie) {
        if (s.itemSize<=1) throw new Error('items size are <= 1')

        this.n = Math.sqrt(s.length)
        if (Number.isInteger(this.n)) {
            this.full = true
        }
        else {
            this.n = ( Math.sqrt(8*s.length+1)-1 )/2
            if (!Number.isInteger(this.n)) throw new Error(`items are not matrices (itemSize: ${s.itemSize})`)
            this.full = false
        }
        this.tmp = new Array(this.n).fill(undefined).map( _ => new Array(this.n).fill(0))
    }

    get count() {return this.s.count}

    get length() {return this.s.length}

    at(i: number): Array<number[]> {
        const r = this.tmp

        if (this.full) {
            let l = 0
            const v = this.s.itemAt(i) as number[]
            for (let k=0; k<this.n; ++k) {
                for (let j=0; j<this.n; ++j) {
                    r[k][j] = v[l++]
                }
            }
            return r
        }

        let l = 0
        const v = this.s.itemAt(i) as number[]
        for (let k=0; k<this.n; ++k) {
            for (let j=k; j<this.n; ++j) {
                r[k][j] = v[l++]
                r[j][k] = r[k][j] // The lower part
            }
        }
        return r
    }

    multVec(i: number, v: number[]) {
        const r = new Array(v.length).fill(0)
        const m = this.at(i)
        for (let j=0; j<v.length; ++j) {
            for (let k=0; k<v.length; ++k) {
                r[j] = m[j][k]*v[k]
            }
        }
        return r
    }

    multMat(i: number, M: Matrix) {
        //const r = new Array(this.s.length).fill(0)
        const m  = this.at(i)
        const mm = M.at(i)

        const row = M.count
        const col = M.count
        
        for (let i = 0; i < row; ++i) {
            for (let j = 0; j < col; ++j) {
               for (let k = 0; k < col; ++k) {
                  r[i][j] += first[i][k] * second[k][j];
               }
            }
        }

        return r
    }
}

function mulMatVec(M: ASerie, v: ASerie) {
    if (M.count !== v.count ) throw new Error('matrix/vector size mismatch')

    const r = v.clone(true)
    const vv = r.array 
    const MM = M.array

    let id = 0
    const matrix = new Matrix(M) // will check if matrix (symm or not)
    for (let i=0; i<matrix.count; ++i) {
        const rr = matrix.multVec(i, v.itemAt(i) as number[])
        for (let j=0; j<rr.length; ++j) {
            r[id++] = rr[j]
        }
    }

    return r
}

function multMatMat(M1: ASerie, M2: ASerie) {
    
    
    //return result;
}
*/