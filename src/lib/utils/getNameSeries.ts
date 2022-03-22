import { DataFrame } from '../dataframe'
import { Serie } from '../serie'

/**
 * Get name of all series in the passed [[Dataframe]]
 * @category Utils
 */
export const getNameSeries = (df: DataFrame) => {
    return Object.entries(df.series).map( ([name, serie]) => name )
}
