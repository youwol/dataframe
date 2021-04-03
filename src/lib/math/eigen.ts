import { IArray, Serie } from '../serie'


/**
 * Get eigen values
 * @category Math
 */
export const eigenValues = (s: Serie<IArray>) => {
    if (s===undefined)    throw new Error ('series is undefined')
    if (s.itemSize !== 6) throw new Error('Series does not have itemSize = 6 (symmetric tensor [xx,xy,xz,yy,yz,zz])')

    const count = s.count //ta.length / df.size
    const r = s.array.slice(0, s.count*3).fill(0) // have to use slice

    let k = 0
    for (let i=0; i<count; ++i) {
        let a = s.itemAt(i) as number[]
        const e = eigen(a)
        r[k++] = e.values[0]
        r[k++] = e.values[1]
        r[k++] = e.values[2]
    }

    return r
}

// ---------------------------------------------------------

type EigenSolution = {
    values: [number, number, number], 
    v1: [number, number, number], 
    v2: [number, number, number], 
    v3: [number, number, number]
}

const eigen = (mat: number[]): EigenSolution => {
    const EPS = 0.00001
    const MAX_ITER = 100
    const xcpi = Math.cos(Math.PI / 4)
    const xspi = Math.sin(Math.PI / 4)

    const values : Array<number> = []
    const vectors: Array<number> = []
    const n = 3
    const a: Array<number> = []
    const v: Array<number> = []
    const index: Array<number> = []
    let thrNn
    let nb_iter = 0
    let jj
    let k, ik, im, iq, il
    let a_ij, a_im, a_il
    let v_ilv, v_imv
    let x
    let sinx, cosx

    if (mat.length===6) {
        a[0] = mat[0]
        a[1] = mat[1]
        a[2] = mat[3]
        a[3] = mat[2]
        a[4] = mat[4]
        a[5] = mat[5]
    } else if (mat.length===9) {
        a[0] = mat[0]
        a[1] = mat[1]
        a[2] = mat[4]
        a[3] = mat[2]
        a[4] = mat[5]
        a[5] = mat[8]
    } else {
        throw new Error(`matrix-array should be of size 6 (xx,xy,xz,yy,yz,zz)
        or 9 (xx,xy,xz,yx,yy,yz,zx,zy,zz and symmetric)`)
    }

    const nn = (n * (n + 1)) / 2
    let ij = 0
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
            if (i === j) {
                v[ij++] = 1.0
            } else {
                v[ij++] = 0.0
            }
        }
    }

    ij = 1
    let a_norm = 0.0
    for (let i = 1; i <= n; ++i) {
        for (let j = 1; j <= i; ++j) {
            if (i !== j) {
                a_ij = a[ij - 1]
                a_norm += a_ij * a_ij
            }
            ++ij
        }
    }

    if (a_norm !== 0.0) {
        const a_normEPS = a_norm * EPS
        let thr = a_norm

        while (thr > a_normEPS && nb_iter < MAX_ITER) {
            ++nb_iter
            thrNn = thr / nn
            for (let l = 1; l < n; ++l) {
                for (let m = l + 1; m <= n; ++m) {
                    let lq = (l * l - l) / 2
                    let mq = (m * m - m) / 2
                    let lm = l + mq
                    let a_lm = a[lm - 1]
                    let a_lm_2 = a_lm * a_lm

                    if (a_lm_2 < thrNn) {
                        continue
                    }

                    let ll = l + lq
                    let mm = m + mq
                    let a_ll = a[ll - 1]
                    let a_mm = a[mm - 1]
                    let delta = a_ll - a_mm

                    if (delta === 0.0) {
                        x = -Math.PI / 4
                        sinx = xspi
                        cosx = xcpi
                    } else {
                        x = -Math.atan((a_lm + a_lm) / delta) / 2.0
                        sinx = Math.sin(x)
                        cosx = Math.cos(x)
                    }

                    let sinx_2 = sinx * sinx
                    let cosx_2 = cosx * cosx
                    let sincos = sinx * cosx
                    let ilv = n * (l - 1)
                    let imv = n * (m - 1)

                    for (let i = 1; i <= n; ++i) {
                        if (i !== l && i !== m) {
                            iq = (i * i - i) / 2
                            if (i < m) {
                                im = i + mq
                            } else {
                                im = m + iq
                            }
                            a_im = a[im - 1]
                            if (i < l) {
                                il = i + lq
                            } else {
                                il = l + iq
                            }
                            a_il = a[il - 1]
                            a[il - 1] = a_il * cosx - a_im * sinx
                            a[im - 1] = a_il * sinx + a_im * cosx
                        }
                        ++ilv
                        ++imv
                        v_ilv = v[ilv - 1]
                        v_imv = v[imv - 1]
                        v[ilv - 1] = cosx * v_ilv - sinx * v_imv
                        v[imv - 1] = sinx * v_ilv + cosx * v_imv
                    }

                    x = a_lm * sincos
                    x += x
                    a[ll - 1] = a_ll * cosx_2 + a_mm * sinx_2 - x
                    a[mm - 1] = a_ll * sinx_2 + a_mm * cosx_2 + x
                    a[lm - 1] = 0.0
                    thr = Math.abs(thr - a_lm_2)
                }
            }
        }
    }

    for (let i = 0; i < n; ++i) {
        k = i + (i * (i + 1)) / 2
        values[i] = a[k]
        index[i] = i
    }

    for (let i = 0; i < n - 1; ++i) {
        x = values[i]
        k = i
        for (let j = i + 1; j < n; ++j) {
            if (x < values[j]) {
                k = j
                x = values[j]
            }
        }
        values[k] = values[i]
        values[i] = x
        jj = index[k]
        index[k] = index[i]
        index[i] = jj
    }

    ij = 0
    for (let k = 0; k < n; ++k) {
        ik = index[k] * n
        for (let i = 0; i < n; ++i) {
            vectors[ij++] = v[ik++]
        }
    }

    return {
        v1: [vectors[0], vectors[1], vectors[2]],
        v2: [vectors[3], vectors[4], vectors[5]],
        v3: [vectors[6], vectors[7], vectors[8]],
        values: [values[0], values[1], values[2]]
    }
}
