
import { Serie } from "../serie"

/**
 * 
 * @param a The input serie
 * @param check The check function
 * @param True The function called when check returns true for a given item
 * @param False The function called when check returns false for a given item
 * @returns The new serie
 * @example
 * ```ts
 * _if( serie, item => item[0]<0, item => item[2]=1, item => item[2]=-1 )
 * ```
 * @category Conditional
 */
export const _if = (a: Serie, check: Function, True: Function, False: Function) => 
    a.map( (value,i) => check(value)===true ? True(value, i, a) : False(value, i, a) )
