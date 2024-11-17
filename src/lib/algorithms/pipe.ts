import { Serie } from '../serie'

/**
 * Type for a function that operates on Series and returns a Serie or Serie[]
 */
export type SerieOperator = (input: Serie | Serie[]) => Serie | Serie[]


/**
 * Creates a pipeline of Serie operations
 * @param operators Array of functions that transform Series
 * @returns A function that applies all operations in sequence
 * @category Algorithms
 * @example
 */
export function pipe(...operators: SerieOperator[]) {
    return (input: Serie | Serie[]): Serie | Serie[] => {
        return operators.reduce((result, op) => op(result), input)
    }
}
