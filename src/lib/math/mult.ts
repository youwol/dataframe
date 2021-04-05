import { IArray, ASerie, Serie } from '../serie'

/**
 * @example
 * Perform: `a = b + b + d` where b, c and d are vectors of size 3
 * ```ts
 * let df = new DataFrame()
 *      .set('b', createSerie(new Array(20).fill(2), 3))
 *      .set('c', createSerie(new Array(20).fill(3), 3))
 *      .set('d', createSerie(new Array(20).fill(3), 3))
 * 
 * const a = mult( df.get('b'), df.get('c'), df.get('d') )
 * ```
 * @example
 * Perform: `a = 0.1*b + 0.3*c + 0.7*d`
 * ```ts
 * let df = new DataFrame()
 *      .set('b', createSerie(new Array(20).fill(2), 6))
 *      .set('c', createSerie(new Array(20).fill(3), 6))
 *      .set('d', createSerie(new Array(20).fill(3), 6))
 * 
 * const a = add(
 *     mult( df.get('b'), 0.1),
 *     mult( df.get('c'), 0.3),
 *     mult( df.get('d'), 0.7)
 * )
 * ```
 * @example
 * Perform: `w = M * v, where M are symmetric matrices (size 3x3) and v vectors (size 3)`
 * ```ts
 * let df = new DataFrame()
 *      .set('M', createSerie(new Array(20).fill(2), 6))
 *      .set('v', createSerie(new Array(20).fill(3), 3))
 * 
 * const w = mult( df.get('M'), df.get('v') )
 * ```
 * @example
 * Perform: `M = M1 * M2, where M1 and M2 are non-symmetric matrices of size 9 (3x3)`
 * ```ts
 * let df = new DataFrame()
 *      .set('M1', createSerie(new Array(20).fill(2), 9))
 *      .set('M2', createSerie(new Array(20).fill(3), 9))
 * 
 * const M = mult( df.get('M1'), df.get('M2') )
 * ```
 * @category Math
 */
 export const mult = (s: Serie<IArray>|undefined, ...args: (Serie<IArray>|number)[]) => {
    if (s === undefined) return undefined
    if (!args) throw new Error('cannot multiply undefined to s')

    const r = s.clone()

    if (args) {
        args.forEach (o => {
            if (typeof(o) === 'number') {
                r.array.forEach( (_,i) => r.array[i] *= o )
            }
            else {
                if (o.length !== s.length) {
                    throw new Error(`size mistmatch. Cannot multiply 2 Series of different sizes (${o.length} != ${s.length})`)
                }
                o.array.forEach( (v,i) => r.array[i] *= v )
            }
        })
    }

    return r
}

// ---------------------------------------------------
// !!! private

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