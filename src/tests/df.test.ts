
import { DataFrame, createEmptySerie, exists, info, createTyped, Serie, append, insertSerie, getNameSeries }    from '../lib'

test('dataframe test 1', () => {

    const df = DataFrame.create({
        series:{
            a: createEmptySerie({Type: Float32Array, count:2, itemSize:3, shared: true }),
            b: createEmptySerie({Type: Float64Array, count:2, itemSize:3, shared: false}),
            c: Serie.create({array: [0,1,2,3,4,5,6,7,8,9], itemSize: 5}),
            d: Serie.create({array: createTyped(Float32Array, [1, 2, 3, 4, 5, 6], true), itemSize: 3})
        }
    })

    df.forEach( (name, serie, i) => {
        console.log(name, i, serie.itemSize, serie.count)
    })

    expect( exists(df, 'a') ).toBeTruthy()
    expect( exists(df, 'b') ).toBeTruthy()
    expect( exists(df, 'c') ).toBeTruthy()
    expect( exists(df, 'd') ).toBeTruthy()

    expect( df.series.a.isArray ).toBeFalsy()
    expect( df.series.b.isArray ).toBeFalsy()
    expect( df.series.c.isArray ).toBeTruthy()
    expect( df.series.d.isArray ).toBeFalsy()
})

test('dataframe test 2', () => {

    const df = DataFrame.create(
        {
            series:{'a': Serie.create( {array: new Array(21).fill(2), itemSize: 3} )},
            userData: {
                info: "some info"
            }
        })

    expect( exists(df, 'a') ).toBeTruthy()
    expect(df.userData).toBeDefined()
    expect(df.userData).toStrictEqual({'info': 'some info'})

    const i = info(df)
    expect(i.series.length).toEqual(1)
    expect(i.series[0].name).toEqual('a')
    expect(i.series[0].userData).toEqual({})
    expect(i.series[0].array).toBeDefined()
    expect(i.series[0].itemSize).toEqual(3)
    expect(i.series[0].shared).toBeFalsy()
    expect(i.series[0].length).toEqual(21)
    expect(i.series[0].count).toEqual(7)

    const ii = info(df.series.a)
    expect(ii.isArray).toBeTruthy()
    expect(ii.isBuffer).toBeFalsy()
    expect(ii.isShared).toBeFalsy()
    expect(ii.length).toEqual(21)
    expect(ii.count).toEqual(7)
    expect(ii.itemSize).toEqual(3)
})

test('dataframe test append', () => {

    let df = DataFrame.create(
        {
            series:{'a': Serie.create( {array: new Array(21).fill(2), itemSize: 3} )},
            userData: {
                info: "some info"
            }
        })

    expect(df.series.a).toBeTruthy()
    expect(df.series.b).toBeFalsy()

    df = append( df, {
        b:  Serie.create( {array: [1,2,3], itemSize: 1})
    })
    expect(df.series.a).toBeTruthy()
    expect(df.series.b).toBeTruthy()
})

test('dataframe test insertSerie', () => {

    let df = DataFrame.create({
        series: {
            'a': Serie.create( {array: new Array(21).fill(2), itemSize: 3} )
        }
    })

    // Same count
    insertSerie({df: df, serie: Serie.create({array: new Array(21).fill(3), itemSize: 3}), name: ''})

    // Different count
    expect(() => {insertSerie({df: df, serie: Serie.create({array: new Array(24).fill(3), itemSize: 3}), name: ''})}).toThrow(Error);
})

test('dataframe test name of series', () => {

    let df = DataFrame.create({
        series: {
            'a': Serie.create( {array: new Array(21).fill(2), itemSize: 3} ),
            'b': Serie.create( {array: new Array(21).fill(2), itemSize: 3} )
        }
    })

    const names = getNameSeries(df)
    expect(names.length).toEqual(2)
    expect(names[0]).toEqual('a')
    expect(names[1]).toEqual('b')
})
