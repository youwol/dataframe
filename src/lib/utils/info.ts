import { DataFrame } from '../dataframe'
import { IArray, Serie } from '../serie'

/**
 * @category Utils
 */
export const info = (df: DataFrame | Serie): any => {
    if (Serie.isSerie(df)) {
        const s = df as Serie
        return {
            isArray: s.isArray,
            isBuffer: s.isArrayBuffer,
            isShared: s.shared,
            length: s.length,
            count: s.count,
            itemSize: s.itemSize,
            dimension: s.dimension,
            array: s.array,
        }
    }

    const DF = df as DataFrame

    return {
        userData: DF.userData,
        series: Object.entries(DF.series).map(([name, serie]) => {
            return {
                name,
                userData: serie.userData,
                isArray: serie.isArray,
                isBuffer: serie.isArrayBuffer,
                isShared: serie.shared,
                length: serie.length,
                count: serie.count,
                itemSize: serie.itemSize,
                dimension: serie.dimension,
                array: serie.array,
            }
        }),
    }
}
