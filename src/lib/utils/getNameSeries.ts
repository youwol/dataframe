import { DataFrame } from '../dataframe'

/**
 * Get name of all series in the passed [[DataFrame]]
 * @category Utils
 */
export const getNameSeries = (df: DataFrame) => {
    return Object.entries(df.series).map(([name, serie]) => name)
}
