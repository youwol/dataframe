import { DataFrame } from '../dataframe'

/**
 * Check if a TypedArray exist in the DataFrame
 * @category Utils
 */
export const exists = (df: DataFrame, name: string) => df.series[name] !== undefined
