import { map } from '../algorithms'
import { ASerie, Serie } from '../serie'
import { vector } from '../views'
import { IVector } from '../../../../math/src/lib'

/**
 * @category Math
 */
export const dot = (a: ASerie, b: ASerie | IVector) => {
    if (a===undefined) throw new Error ('serie a is undefined')
    if (b===undefined) throw new Error ('serie or Vector b is undefined')

    if (b instanceof Serie) {
        return map( [a, b], ([v1, v2]) => vector(v1).dot( vector(v2) ) )
    }
    return map( a, v1 => vector(v1).dot( vector(b as number[]) ) )
}
