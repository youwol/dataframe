import { DataFrame } from './dataframe'

/**
 * @category Info
 */
export const info = (df: DataFrame) => df.info()

/**
 * Check if a TypedArray exist in the DataFrame
 * @category Info
 */
export const exists = (df: DataFrame, name: string) => df.get(name) !== undefined
