import { DataFrame } from './dataframe'
import { Series } from './series'

/**
 * @category Info
 */
export const info = (df: DataFrame | Series) => {
    if (df instanceof Series) {
        (df as Series).info()
    }
    return df.info()
}

/**
 * Check if a TypedArray exist in the DataFrame
 * @category Info
 */
export const exists = (df: DataFrame, name: string) => df.get(name) !== undefined
