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
        series: [...df.series].map( ([name, value]) =>  {
            return {
                name,
                userData: value.userData,
                transfertPolicy: value.transfertPolicy,
                isArray: value.serie.isArray,
                isBuffer: value.serie.isArrayBuffer,
                isShared: value.serie.shared,
                length: value.serie.length,
                count: value.serie.count,
                itemSize: value.serie.itemSize,
                array: value.serie.array
            }
        })
    }
}