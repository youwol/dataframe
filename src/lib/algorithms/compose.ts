import { Serie } from '../serie'
import { SerieOperator } from './pipe'


/**
 * It’s just pipe in the other direction.
 * @param operators Array of functions that transform Series
 * @returns A function that applies all operations in sequence in reverse order
 * @category Algorithms
 * @example
 */
export function compose(...operators: SerieOperator[]) {
    return (input: Serie | Serie[]): Serie | Serie[] => {
        return operators.reduceRight((result, op) => op(result), input)
    }
}
