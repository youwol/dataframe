import { Series } from './series'

/**
 * Add several Series to generate a new one
 * @example
 * ```ts
 * // perform: a = b + c
 * const a = add(
 *     df.get('b'),
 *     df.get('c'),
 * )
 * ```
 * @example
 * ```ts
 * // perform: a = 0.1*b + 0.3*c + 0.7*d
 * const a = add(
 *     mult( df.get('b'), 0.1),
 *     mult( df.get('c'), 0.3),
 *     mult( df.get('d'), 0.7)
 * )
 * ```
 * @category Operations
 */
export const add = (s1: Series, s2: Series | number, ...others: (Series)[]): Series => {
    if (s1===undefined) return s1
    
    const r  = s1.deepClone()
    if (s2 === undefined) return r

    const size = s1.length

    if (typeof(s2) === 'number') {
        s1.typedArray.forEach( (v: number, i: number) => {
            r.typedArray[i] += s2 as number
        })
    } else {
        s2.typedArray.forEach( (v: number, i: number) => {
            r.typedArray[i] += v
        })
    }

    // rest
    if (others) {
        others.forEach (o => {
            if (o !== undefined) {
                if (o.length !== size) {
                    throw new Error(`size mistmatch. Cannot add 2 Series of different sizes (${o.length} != ${size})`)
                }
                o.typedArray.forEach( (v: number, i: number) => {
                    r.typedArray[i] += v
                })
            }
        })
    }

    return r
}

/**
 * Subtract several Series to generate a new one
 * @example
 * ```ts
 * // perform: a = b - c
 * const a = sub(
 *     df.get('b'),
 *     df.get('c'),
 * )
 * ```
 * @category Operations
 */
export const sub = (s1: Series, s2: Series | number, ...others: (Series)[]): Series => {
    if (s1===undefined) return s1
    
    const r  = s1.deepClone()
    if (s2 === undefined) return r

    const size = s1.length

    if (typeof(s2) === 'number') {
        s1.typedArray.forEach( (v: number, i: number) => {
            r.typedArray[i] -= s2 as number
        })
    } else {
        s2.typedArray.forEach( (v: number, i: number) => {
            r.typedArray[i] -= v
        })
    }

    // rest
    if (others) {
        others.forEach (o => {
            if (o !== undefined) {
                if (o.length !== size) {
                    throw new Error(`size mistmatch. Cannot add 2 Series of different sizes (${o.length} != ${size})`)
                }
                o.typedArray.forEach( (v: number, i: number) => {
                    r.typedArray[i] -= v
                })
            }
        })
    }

    return r
}

/**
 * @example
 * ```ts
 * const a = mult( df.get('b'), df.get('c'), df.get('d') )
 * ```
 * @example
 * ```ts
 * // perform: a = 0.1*b + 0.3*c + 0.7*d
 * const a = add(
 *     mult( df.get('b'), 0.1),
 *     mult( df.get('c'), 0.3),
 *     mult( df.get('d'), 0.7)
 * )
 * ```
 * @category Operations
 */
 export const mult = (s1: Series, s2: Series | number, ...others: (Series)[]): Series => {
    if (s1===undefined) return undefined

    const r  = s1.deepClone()
    if (s2===undefined) return r

    const size = s1.length

    if (typeof(s2) === 'number') {
        s1.typedArray.forEach( (v: number, i: number) => {
            r.typedArray[i] *= s2 as number
        })
    } else {
        s2.typedArray.forEach( (v: number, i: number) => {
            r.typedArray[i] *= v
        })
    }

    // rest
    if (others) {
        others.forEach (o => {
            if (o !== undefined) {
                if (o.length !== size) {
                    throw new Error(`size mistmatch. Cannot add 2 Series of different sizes (${o.length} != ${size})`)
                }
                o.typedArray.forEach( (v: number, i: number) => {
                    r[i] *= v
                })
            }
        })
    }

    return r
}

/**
 * @example
 * ```ts
 * // perform a = b/c/d
 * const a = div( df.get('b'), df.get('c'), df.get('d') )
 * ```
 * @category Operations
 */
 export const div = (s1: Series, s2: Series | number, ...others: (Series)[]): Series => {
    if (s1===undefined) return undefined

    const r  = s1.deepClone()
    if (s2===undefined) return r

    const size = s1.length

    if (typeof(s2) === 'number') {
        s1.typedArray.forEach( (v: number, i: number) => {
            r.typedArray[i] /= s2 as number
        })
    } else {
        s2.typedArray.forEach( (v: number, i: number) => {
            r.typedArray[i] /= v
        })
    }

    // rest
    if (others) {
        others.forEach (o => {
            if (o !== undefined) {
                if (o.length !== size) {
                    throw new Error(`size mistmatch. Cannot add 2 Series of different sizes (${o.length} != ${size})`)
                }
                o.typedArray.forEach( (v: number, i: number) => {
                    r[i] /= v
                })
            }
        })
    }

    return r
}