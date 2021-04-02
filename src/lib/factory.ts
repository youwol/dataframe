import { DataFrame } from "./dataframe"
import { DType, Series } from "./series"

export function createSeries(data: any, itemSize: number = 1, dtype: DType = DType.Float32) {
    return new Series(data, itemSize, dtype, false)
}

export function createSharedSeries(data: any, itemSize: number = 1, dtype: DType = DType.Float32) {
    return new Series(data, itemSize, dtype, true)
}
