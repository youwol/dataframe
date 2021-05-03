import { ASerie, IArray, Serie } from "../serie";

/**
 * @return the same serie
 * @category Utils
 */
export const copy = (array: ASerie| IArray, serie: ASerie) => {
    if (array instanceof Serie) {
        if (serie.array.length !== array.array.length) throw new Error('length mismatch for both series')
        array.array.forEach( (v,i) => serie.array[i] = v )
    }
    else {
        if (serie.array.length !== array.length) throw new Error('Array and Serie length mismatch')
        array.forEach( (v,i) => serie.array[i] = v )
    }
    return serie
}
