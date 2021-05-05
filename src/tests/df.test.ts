import { DataFrame, createSerie, createEmptySerie, exists, info, createTyped }    from '../lib'

test('dataframe test 1', () => {

    const df = new DataFrame({
        a: createEmptySerie({Type: Float32Array, count:2, itemSize:3, shared: true }),
        b: createEmptySerie({Type: Float64Array, count:2, itemSize:3, shared: false}),
        c: createSerie({data: [0,1,2,3,4,5,6,7,8,9], itemSize: 5}),
        d: createSerie({data: createTyped(Float32Array, [1, 2, 3, 4, 5, 6], true), itemSize: 3})
    })

    expect( exists(df, 'a') ).toBeTruthy()
    expect( exists(df, 'b') ).toBeTruthy()
    expect( exists(df, 'c') ).toBeTruthy()
    expect( exists(df, 'd') ).toBeTruthy()

    expect( df.get('a').isArray ).toBeFalsy()
    expect( df.get('b').isArray ).toBeFalsy()
    expect( df.get('c').isArray ).toBeTruthy()
    expect( df.get('d').isArray ).toBeFalsy()
})

test('dataframe test 2', () => {

    const df = new DataFrame(
        {
            'a': createSerie( {data: new Array(21).fill(2), itemSize: 3} )
        },
        {
            info: "some info"
        })

    expect( exists(df, 'a') ).toBeTruthy()
    expect(df.userData).toBeDefined()
    expect(df.userData).toStrictEqual({'info': 'some info'})

    const i = info(df)
    expect(i.series.length).toEqual(1)
    expect(i.series[0].name).toEqual('a')
    expect(i.series[0].userData).toBeUndefined()
    expect(i.series[0].transfertPolicy).toBeUndefined()
    expect(i.series[0].array).toBeDefined()
    expect(i.series[0].itemSize).toEqual(3)
    expect(i.series[0].shared).toBeFalsy()
    expect(i.series[0].length).toEqual(21)
    expect(i.series[0].count).toEqual(7)

    const ii = info(df.get('a'))
    expect(ii.isArray).toBeTruthy()
    expect(ii.isBuffer).toBeFalsy()
    expect(ii.isShared).toBeFalsy()
    expect(ii.length).toEqual(21)
    expect(ii.count).toEqual(7)
    expect(ii.itemSize).toEqual(3)
})
