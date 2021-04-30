import { IArray } from "../serie"

export namespace array {
    /**
     * @category Array
     */
    export function min(array: IArray): number {
        let m = Number.POSITIVE_INFINITY
        const n = array.length
        for (let i=0; i<n; ++i) {
            const a = array[i]
            if (a < m) m = a
        }
        return m
    }

    /**
     * @category Array
     */
    export function max(array: IArray): number {
        let m = Number.NEGATIVE_INFINITY
        const n = array.length
        for (let i=0; i<n; ++i) {
            const a = array[i]
            if (a > m) m = a
        }
        return m
    }

    /**
     * @category Array
     */
    export function minMax(array: IArray): Array<number> {
        let m = Number.POSITIVE_INFINITY
        let M = Number.NEGATIVE_INFINITY
        const n = array.length
        for (let i=0; i<n; ++i) {
            const a = array[i]
            if (a < m) m = a
            if (a > M) M = a
        }
        return [m, M]
    }

    /**
     * @category Array
     */
    export function normalize(array: IArray): IArray {
        const m = minMax(array)
        return array.map( v => (v-m[0])/(m[1]-m[0]) )
    }

    /**
     * @category Array
     */
    export function scale(array: IArray, s: number): IArray {
        return array.map( v => v*s )
    }

    /**
     *  Return the indices from array that contain NaN values
     * @param array The array of number
     * @category Array
     */
    export function dectectNan(array: IArray): IArray {
        const values = array.map( (value,i) => {return {value, i}})
        const idx = values.filter( a => Number.isNaN(a.value))
        return idx.map( v => v.i)
    }

    /**
     * @category Array
     */
    export function flatten(array: Array<Array<number>>): Array<number> {
        const r: Array<number> = []
        array.forEach( a => r.push(...a) )
        return r
    }
}
