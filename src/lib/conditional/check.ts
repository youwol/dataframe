import { ASerie } from "../serie"

/**
 * @category Conditional
 */
export const check = (a: ASerie, fn: Function) => a.map( v => fn(v) ? true : false )
