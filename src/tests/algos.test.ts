import { DataFrame } from '../lib/dataframe'

import { filter, forEach, map, reduce } from '../lib/algorithms'
import { Serie } from '../lib'

test('dataframe algo map', () => {

    let df = DataFrame.create({
        series:{
            a: Serie.create( {array: new Array(20).fill(2), itemSize:1})
        }
    })

    const a1 = df.series.a.map( v => v**3)
    a1.array.forEach( (v,i) => expect(v).toEqual(8) )

    const a2 = map(df.series.a, v => v**3)
    a2.array.forEach( (v,i) => expect(v).toEqual(8) )
})

test('dataframe algo forEach', () => {

    let df = DataFrame.create({
        series:{
            a: Serie.create( {array: new Array(20).fill(2), itemSize:1})
        }
    })

    forEach(df.series.a, v => expect(v).toEqual(2) )
})

test('dataframe algo filter', () => {

    let df = DataFrame.create({
        series:{
            a: Serie.create( {array: new Array(20).fill(0).map( (v,i) => i*i ), itemSize:1})
        }
    })

    const a = filter(df.series.a, v => v<10 )
    // 0, 1, 2, 3 => 4 values
    expect(a.count).toEqual(4)
    expect(a.array[0]).toEqual(0)
    expect(a.array[1]).toEqual(1)
    expect(a.array[2]).toEqual(4)
    expect(a.array[3]).toEqual(9)
})

test('dataframe algo reduce', () => {

    let df = DataFrame.create({
        series:{
            a: Serie.create( {array: [1,2,3,4,5,6,7,8,9], itemSize:3})
        }
    })

    const traces = reduce( [df.series.a], ([v]) => v[0]+v[1]+v[2])
    expect(traces.array[0]).toEqual(6)
    expect(traces.array[1]).toEqual(15)
    expect(traces.array[2]).toEqual(24)

    const trace = reduce( df.series.a, (v) => v[0]+v[1]+v[2])
    expect(trace.array[0]).toEqual(6)
    expect(trace.array[1]).toEqual(15)
    expect(trace.array[2]).toEqual(24)
})
