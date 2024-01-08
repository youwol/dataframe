import { DataFrame, Serie } from '../lib'
import { createEmptySerie } from '../lib/utils'

test('serie test', () => {
    const df = DataFrame.create({
        series: {
            a: createEmptySerie({
                Type: Float32Array,
                count: 2,
                itemSize: 3,
                shared: true,
            }),
            b: createEmptySerie({
                Type: Float64Array,
                count: 2,
                itemSize: 3,
                shared: false,
            }),
            c: Serie.create({
                array: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                itemSize: 5,
            }),
        },
    })

    expect(df.series.a.isArray).toBeFalsy()
    expect(df.series.b.isArray).toBeFalsy()
    expect(df.series.c.isArray).toBeTruthy()
})
