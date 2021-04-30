import { map } from '../algorithms'
import { ASerie } from '../serie'
import { vector } from '../views'

/**
 * @category Math
 */
export const dot = (a: ASerie, b: ASerie) => map([a, b], ([v1, v2]) => vector(v1).dot( vector(v2) ) )

//  export const dot = (a: ASerie, b: ASerie) => {
//     if (a===undefined) throw new Error ('serie a is undefined')
//     if (b===undefined) throw new Error ('serie b is undefined')

//     a.forEach( (i1: number[], i: number) => {
//         const i2 = b.itemAt(i)

//     })

//     // We want to do someting like:
//     // map([a,b], ([x,y], i) => {

//     // })
// }
