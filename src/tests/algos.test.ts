import { DataFrame } from '../lib/dataframe'

import { cut, filter, forEach, map, reduce, sort } from '../lib/algorithms'
import { Serie } from '../lib'

test('dataframe algo map', () => {
    let df = DataFrame.create({
        series: {
            a: Serie.create({ array: new Array(20).fill(2), itemSize: 1 }),
        },
    })

    const a1 = df.series.a.map((v) => v ** 3)
    a1.array.forEach((v, i) => expect(v).toEqual(8))

    const a2 = map(df.series.a, (v) => v ** 3)
    a2.array.forEach((v, i) => expect(v).toEqual(8))
})

test('dataframe algo forEach', () => {
    let df = DataFrame.create({
        series: {
            a: Serie.create({ array: new Array(20).fill(2), itemSize: 1 }),
        },
    })

    forEach(df.series.a, (v) => expect(v).toEqual(2))
})

test('dataframe algo filter', () => {
    let df = DataFrame.create({
        series: {
            a: Serie.create({
                array: new Array(20).fill(0).map((v, i) => i * i),
                itemSize: 1,
            }),
        },
    })

    const a = filter(df.series.a, (v) => v < 10)
    // 0, 1, 2, 3 => 4 values
    expect(a.count).toEqual(4)
    expect(a.array[0]).toEqual(0)
    expect(a.array[1]).toEqual(1)
    expect(a.array[2]).toEqual(4)
    expect(a.array[3]).toEqual(9)
})

test('dataframe algo reduce', () => {
    let serie = Serie.create({
        array: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        itemSize: 3,
    })

    // const traces = reduce( [df.series.a], ([v]) => v[0]+v[1]+v[2])
    // expect(traces.array[0]).toEqual(6)
    // expect(traces.array[1]).toEqual(15)
    // expect(traces.array[2]).toEqual(24)

    const trace = reduce(
        serie,
        (cur, v) => [cur[0] + v[0], cur[1] + v[1], cur[2] + v[2]],
        [0, 0, 0],
    )
    // console.log(serie.array)
    // console.log(trace)
    expect(trace[0]).toEqual(12)
    expect(trace[1]).toEqual(15)
    expect(trace[2]).toEqual(18)
})

test('dataframe algo sort', () => {
    const s = Serie.create({ array: [4, 5, 2, 3, 1], itemSize: 1 })

    let a = sort(s)
    expect(a.count).toEqual(5)
    expect(a.array[0]).toEqual(1)
    expect(a.array[1]).toEqual(2)
    expect(a.array[2]).toEqual(3)
    expect(a.array[3]).toEqual(4)
    expect(a.array[4]).toEqual(5)

    a = sort(s, (a, b) => b - a)
    expect(a.count).toEqual(5)
    expect(a.array[0]).toEqual(5)
    expect(a.array[1]).toEqual(4)
    expect(a.array[2]).toEqual(3)
    expect(a.array[3]).toEqual(2)
    expect(a.array[4]).toEqual(1)
})

test('dataframe algo cut', () => {
    const s = Serie.create({ array: [1, 2, 3, 4, 5, 6, 7], itemSize: 1 })

    let a = cut(s, (v) => v >= 3 && v < 6)
    expect(a.count).toEqual(3)
    expect(a.array[0]).toEqual(3)
    expect(a.array[1]).toEqual(4)
    expect(a.array[2]).toEqual(5)
})
