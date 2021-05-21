import { DataFrame } from '../dataframe'
import { IArray, Serie } from '../serie'

/**
 * @category Utils
 */
export const info = (df: DataFrame | Serie<IArray>): any => {
    if (df instanceof Serie) {
        const s = df as Serie<IArray>
        return {
            isArray: s.isArray,
            isBuffer: s.isArrayBuffer,
            isShared: s.shared,
            length: s.length,
            count: s.count,
            itemSize: s.itemSize,
            array: s.array
        }
    }
    
    return {
        userData: df.userData,
        series: Object.entries(df.series).map( ([name, serie]) =>  {
            return {
                name,
                userData: serie.userData,
                isArray: serie.isArray,
                isBuffer: serie.isArrayBuffer,
                isShared: serie.shared,
                length: serie.length,
                count: serie.count,
                itemSize: serie.itemSize,
                array: serie.array
            }
        })
    }
}