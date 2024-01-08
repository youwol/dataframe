import { IArray, Serie } from '../serie'

/**
 * @return the same serie
 * @category Utils
 */
export const copy = (array: Serie | IArray, serie: Serie) => {
    if (Serie.isSerie(array)) {
        const S = array as Serie
        if (serie.array.length !== S.array.length)
            throw new Error('length mismatch for both series')
        S.array.forEach((v, i) => (serie.array[i] = v))
    } else {
        if (serie.array.length !== array.length)
            throw new Error('Array and Serie length mismatch')
        array.forEach((v, i) => (serie.array[i] = v))
    }
    return serie
}
