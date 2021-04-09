import { DataFrame } from '../lib/dataframe'
import { createSerie } from '../lib/utils'
import { filter, forEach, map, reduce } from '../lib/algorithms'

test('dataframe algo map', () => {
    let df = new DataFrame()
        .set('a', createSerie(new Array(20).fill(2), 1))

    const a = map(df.get('a'), v => v**3)
    a.array.forEach( (_,i) => expect(_).toEqual(8) )
})

test('dataframe algo forEach', () => {
    let df = new DataFrame()
        .set('a', createSerie(new Array(20).fill(2), 1))

    forEach(df.get('a'), v => expect(v).toEqual(2) )
})

test('dataframe algo filter', () => {
    let df = new DataFrame()
        .set('a', createSerie(new Array(20).fill(0).map( (v,i) => i*i ) ) )

    const a = filter(df.get('a'), v => v<10 )
    // 0, 1, 2, 3 => 4 values
    expect(a.count).toEqual(4)
    expect(a.array[0]).toEqual(0)
    expect(a.array[1]).toEqual(1)
    expect(a.array[2]).toEqual(4)
    expect(a.array[3]).toEqual(9)
})

test('dataframe algo reduce', () => {
    const df = new DataFrame().set( 'a', createSerie([1,2,3,4,5,6,7,8,9], 3))

    const traces = reduce( [df.get('a')], ([v]) => v[0]+v[1]+v[2])
    expect(traces.array[0]).toEqual(6)
    expect(traces.array[1]).toEqual(15)
    expect(traces.array[2]).toEqual(24)

    const trace = reduce( df.get('a'), (v) => v[0]+v[1]+v[2])
    expect(trace.array[0]).toEqual(6)
    expect(trace.array[1]).toEqual(15)
    expect(trace.array[2]).toEqual(24)
})
