import { ASerie, IArray, Serie } from "../serie";

/**
 * Return a duplicate of the passed serie (same type, same count, same itemSize and same values)
 * @category Utils
 */
export const duplicate = (serie: ASerie): ASerie => {
    return serie.clone(false)
}
