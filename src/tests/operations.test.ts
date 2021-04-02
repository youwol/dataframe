import { DataFrame } from '../lib/dataframe'
import { exists } from '../lib/info'
import { add, mult } from '../lib/operations'
import { createSeries } from '../lib/factory'
import { eigenValues } from '../lib/eigen'
import { trace } from '../lib/trace'

const gen = (n: number, v: number) => new Array(n).fill(0).map( _ => v )

test('dataframe operation add', () => {
    let df = new DataFrame()
        .set('a', createSeries(10, 2).initialize(2) )
        .set('b', createSeries(10, 3).initialize(3) )

    expect( exists(df, 'a') ).toBeTruthy()
    expect( exists(df, 'b') ).toBeTruthy()

    // ---------------------------------

    df = df.set('sum', add(
        df.get('a'),
        df.get('b')
    ))
    let sum = df.get('sum')
    sum.typedArray.forEach( _ => expect(_).toEqual(5) )

    // ---------------------------------

    df = df.set('sum', add(
        mult( df.get('a'), 10 ),
        mult( df.get('b'), 20 )
    ))
    sum = df.get('sum')
    sum.typedArray.forEach( _ => expect(_).toEqual(80) )

    // ---------------------------------

    df = df.set('sum', add(
        mult( df.get('a'), 10 ),
        mult( df.get('b'), 20 ),
        mult( df.get('a'), 1 )
    ))
    sum = df.get('sum')
    sum.typedArray.forEach( _ => expect(_).toEqual(82) )

    // ---------------------------------

    df = df.set('sum', add(
        df.get('a'),
        100
    ))
    sum = df.get('sum')
    sum.typedArray.forEach( _ => expect(_).toEqual(102) )
})

test('dataframe operation mult', () => {
    let df = new DataFrame()
        .set('a', createSeries(10, 2).initialize(2) )
        .set('b', createSeries(10, 3).initialize(3) )

    expect( exists(df, 'a') ).toBeTruthy()
    expect( exists(df, 'b') ).toBeTruthy()

    const a = mult( df.get('a'), 100 )
    a.forEach( _ => expect(_).toEqual(200) )
    
})

test('dataframe operation superposition', () => {
    let df = new DataFrame()
        .set('a', createSeries(10, 2).initialize(2) )
        .set('b', createSeries(10, 3).initialize(3) )

    df = df.set('ab', add(
        mult( df.get('a'), 10),
        mult( df.get('b'), 20)
    ))
})


test('dataframe operation eigen', () => {
    let df = new DataFrame().set('a', createSeries(2, 6).initialize(2))

    const ev = eigenValues( df.get('a') )

    expect( ev[0] ).toEqual(6)
    expect( ev[1] ).toEqual(0)
    expect( ev[2] ).toEqual(0)
    expect( ev[3] ).toEqual(6)
    expect( ev[4] ).toEqual(0)
    expect( ev[5] ).toEqual(0)
})

test('dataframe operation trace', () => {
    let df = new DataFrame().set('a', createSeries(2, 6).initialize([1,2,3,4,5,6, 6,5,4,3,2,1]))
    const ev = trace(df.get('a'))
    expect(ev[0]).toEqual(11)
    expect(ev[1]).toEqual(10)
})
