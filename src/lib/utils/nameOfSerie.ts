import { DataFrame } from '../dataframe'
import { Serie } from '../serie'

/**
 * Get the name of a [[Serie]] in a [[Dataframe]]. Returns undefined if the serie in not present
 * in the passed [[Dataframe]]
 * @category Utils
 */
export const nameOfSerie = (df: DataFrame, s: Serie) => {
    return Object.entries(df.series).reduce( (acc, [name, serie]) => s === serie ? name : acc, undefined)
}
