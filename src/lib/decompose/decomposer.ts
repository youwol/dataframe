import { DataFrame, Serie } from '..'

/**
 * Interface for serie decomposition
 * @category Decomposition
 */
export interface Decomposer {
    /**
     * Get the potential names decomposition
     * @param df The dataframe supporting the series
     * @param itemSize The itemSize (1 for scalar, 3 for vectors...)
     * @param serie The current serie involved
     * @param name The name of the serie (refact: the same name of the serie? Check!!!)
     * @see todo
     */
    names(df: DataFrame, itemSize: number, serie: Serie, name: string): string[]

    /**
     * Get the serie decomposed (or not)
     * @param df The dataframe
     * @param itemSize The itemSize of the serie that we want
     * @param name The querying name
     */
    serie(df: DataFrame, itemSize: number, name: string): Serie
}
