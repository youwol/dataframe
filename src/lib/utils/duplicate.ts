import { Serie } from '../serie'

/**
 * Return a duplicate of the passed serie (same type, same count, same itemSize and same values)
 * @category Utils
 */
export const duplicate = (serie: Serie): Serie => {
    return serie.clone(false)
}
