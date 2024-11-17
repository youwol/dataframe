import { Serie } from '../serie'

/**
 * Zip multiple Series together, similar to Python's zip.
 * The resulting iterable will have length equal to the minimum count among all series
 * @param series Array of Series to zip together
 * @returns An iterator that yields arrays containing one item from each serie
 * @category Algorithms
 * @example
 * // Example usage:
const serie1 = Serie.create({ array: new Float32Array([1, 2, 3]), itemSize: 1 })
const serie2 = Serie.create({ array: new Float32Array([4, 5, 6]), itemSize: 1 })
const serie3 = Serie.create({ array: new Float32Array([7, 8, 9]), itemSize: 1 })

// Using forEach
zip(serie1, serie2, serie3).forEach((items, index) => {
    console.log(`Index ${index}:`, items)
})

// Using map
const results = zip(serie1, serie2, serie3).map(items => {
    return items.reduce((a, b) => Number(a) + Number(b), 0)
})

// Using for...of
for (const items of zip(serie1, serie2, serie3)) {
    console.log(items)
}

// Example with different itemSizes
const serie4 = Serie.create({ array: new Float32Array([1,2, 3,4, 5,6]), itemSize: 2 })
const serie5 = Serie.create({ array: new Float32Array([7,8,9, 10,11,12]), itemSize: 2 })

zip(serie4, serie5).forEach((items, index) => {
    console.log(`Index ${index}:`, items) // Each item will be an array of 2 numbers
})

// ----------------

// Create a new Serie from zipped results
const combinedSerie = zip(serie1, serie2).toSerie(items => {
    const [a, b] = items
    return Number(a) + Number(b)
})

// Get all zipped items as array
const allItems = zip(serie1, serie2).toArray()
 */
export function zip(...series: Serie[]) {
    // Validate that we have at least one serie
    if (series.length === 0) {
        throw new Error('At least one Serie must be provided')
    }

    // Get the minimum count among all series to avoid undefined values
    const minCount = Math.min(...series.map(s => s.count))

    return {
        // Make it iterable
        [Symbol.iterator]() {
            let index = 0
            
            return {
                next() {
                    if (index >= minCount) {
                        return { done: true, value: undefined }
                    }

                    // Get one item from each serie at current index
                    const value = series.map(s => s.itemAt(index))
                    index++
                    
                    return { done: false, value }
                }
            }
        },

        // Helper methods for common operations
        forEach(callback: (items: (number|number[])[], index: number) => void) {
            for (let i = 0; i < minCount; i++) {
                callback(series.map(s => s.itemAt(i)), i)
            }
        },

        map<T>(callback: (items: (number|number[])[], index: number) => T): T[] {
            const result: T[] = []
            for (let i = 0; i < minCount; i++) {
                result.push(callback(series.map(s => s.itemAt(i)), i))
            }
            return result
        },

        // Create a new Serie from the zipped result
        toSerie(callback: (items: (number|number[])[], index: number) => number|number[]) {
            const firstSerie = series[0]
            const results = []
            let firstItem: number|number[] = undefined
            
            // Get first item to determine itemSize
            for (const items of this) {
                const result = callback(items, results.length)
                if (firstItem === undefined) firstItem = result
                if (Array.isArray(result)) {
                    results.push(...result)
                } else {
                    results.push(result)
                }
            }
            
            const itemSize = Array.isArray(firstItem) ? firstItem.length : 1
            return Serie.create({
                array: firstSerie.isArray ? 
                    results : 
                    new (firstSerie.array.constructor as any)(results),
                itemSize
            })
        },

        // Get result as array of arrays
        toArray() {
            return Array.from(this)
        }
    }
}

