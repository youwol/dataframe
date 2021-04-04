import { DataFrame } from '../lib/dataframe'
import { createSerie } from '../lib/serie'
import { exists, info } from '../lib/utils'
import { add, mult, eigenValues, trace } from '../lib/math'

const gen = (n: number, v: number) => new Array(n).fill(0).map( _ => v )

test('dataframe operation add', () => {
    let df = new DataFrame()
        .set('a', createSerie(new Array(20).fill(2), 2))
        .set('b', createSerie(new Array(20).fill(3), 2))

    expect( exists(df, 'a') ).toBeTruthy()
    expect( exists(df, 'b') ).toBeTruthy()

    // ---------------------------------

    df = df.set('sum', add(
        df.getSerie('a'),
        df.getSerie('b')
    ))
    let sum = df.getSerie('sum')
    sum.array.forEach( _ => expect(_).toEqual(5) )

    // ---------------------------------

    df = df.set('sum', add(
        mult( df.getSerie('a'), 10 ),
        mult( df.getSerie('b'), 20 )
    ))
    sum = df.getSerie('sum')
    sum.array.forEach( _ => expect(_).toEqual(80) )

    // ---------------------------------

    df = df.set('sum', add(
        mult( df.getSerie('a'), 10 ),
        mult( df.getSerie('b'), 20 ),
        mult( df.getSerie('a'), 1 )
    ))
    sum = df.getSerie('sum')
    sum.array.forEach( _ => expect(_).toEqual(82) )

    // ---------------------------------

    df = df.set('sum', add(
        df.getSerie('a'),
        100
    ))
    sum = df.getSerie('sum')
    sum.array.forEach( _ => expect(_).toEqual(102) )
})

test('dataframe operation mult', () => {
    let df = new DataFrame()
        .set('a', createSerie(new Array(20).fill(2), 2))
        .set('b', createSerie(new Array(20).fill(3), 2))

    expect( exists(df, 'a') ).toBeTruthy()
    expect( exists(df, 'b') ).toBeTruthy()

    const a = mult( df.getSerie('a'), 100 )
    a.array.forEach( _ => expect(_).toEqual(200) )
    
})

test('dataframe operation superposition', () => {
    let df = new DataFrame()
        .set('a', createSerie(new Array(20).fill(2), 2))
        .set('b', createSerie(new Array(20).fill(3), 2))

    df = df.set('ab', add(
        mult( df.getSerie('a'), 10),
        mult( df.getSerie('b'), 20)
    ))

    console.log( info(df.getSerie('ab')) )
})

test('dataframe operation eigen', () => {
    let df = new DataFrame().set('a', createSerie(new Array(12).fill(2), 6))

    const ev = eigenValues( df.getSerie('a') )

    expect( ev[0] ).toEqual(6)
    expect( ev[1] ).toEqual(0)
    expect( ev[2] ).toEqual(0)
    expect( ev[3] ).toEqual(6)
    expect( ev[4] ).toEqual(0)
    expect( ev[5] ).toEqual(0)
})

test('dataframe operation trace', () => {
    let df = new DataFrame().set('a', createSerie([1,2,3,4,5,6, 6,5,4,3,2,1], 6))
    const ev = trace( df.getSerie('a') )
    expect( ev[0] ).toEqual(11)
    expect( ev[1] ).toEqual(10)
})
