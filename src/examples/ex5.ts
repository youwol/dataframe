/**
 * Iterating over multiple series at the same time
 * ```ts
 * // 3 scalar series
 * const a1 = Serie.create( {array: [1, 2, 3], itemSize: 1})
 * const a2 = Serie.create( {array: [4, 5, 6], itemSize: 1})
 * const a3 = Serie.create( {array: [7, 8, 9], itemSize: 1})
 *
 * // Generate a nes scalar serie
 * const a = reduce( [a1,a2,a3], ([s1, s2, s3]) => (s2-s3)/(s1-s3) )
 * ```
 *
 * Another example
 * ```ts
 * import {Serie, reduce} from '@youwol/dataframe'
 * import {eifenValue}    from '@youwol/math'
 *
 * const stress = Serie.create( {array: new Array(6*5).fill(0).map((v,i)=>i) , itemSize: 6})
 * const toto   = Serie.create( {array: new Array(5).fill(0).map((v,i)=>i**2), itemSize: 1})
 *
 * // Generate a new scalar serie
 * const a = reduce( [eigenValue(stress), toto], ([eigen, value]) => {
 *       return (eigen[0]+eigen[1]±eigen[2])*value
 * })
 * ```
 *
 * A last one: compute the MCSS using a stress field
 * ```ts
 * import {Serie, reduce} from '@youwol/dataframe'
 * import {eifenValue}    from '@youwol/math'
 *
 * const stress = Serie.create( {array: new Array(6*5).fill(0).map((v,i)=>i) , itemSize: 6})
 *
 * const mu = 0.6 // friction coefficient
 *
 * // -------------------------------------------
 * // MCSS = (S1-S3)/2*sqrt(1+mu^2)-mu*(S1+S3)/2
 * // -------------------------------------------
 * const mu2 = Math.sqrt(1+mu**2)
 * const a = reduce( eigenValue(stress), eigen => mu2*(eigen[0]-eigen[2])/2 - mu*(eigen[0]+eigen[2])/2 )
 * ```
 */
export namespace Example_5 {}
