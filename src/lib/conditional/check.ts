import { Serie } from '../serie'

/**
 * @category Conditional
 */
export const check = (a: Serie, fn: Function) =>
    a.map((v) => (fn(v) ? true : false))
