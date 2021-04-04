import { DataFrame } from '../lib/dataframe'
import { createSerie } from '../lib/serie'
import { exists, info } from '../lib/utils'
import { add, mult, eigenValues, trace, sub, norm, mean, div } from '../lib/math'

const gen = (n: number, v: number) => new Array(n).fill(0).map( _ => v )

test('dataframe operation add', () => {
    let df = new DataFrame()
        .set('a', createSerie(new Array(20).fill(2), 2))
        .set('b', createSerie(new Array(20).fill(3), 2))

    expect( exists(df, 'a') ).toBeTruthy()
    expect( exists(df, 'b') ).toBeTruthy()

    // ---------------------------------

    df = df.set('sum', add(
        df.get('a'),
        df.get('b')
    ))
    let sum = df.get('sum')
    sum.array.forEach( _ => expect(_).toEqual(5) )

    // ---------------------------------

    df = df.set('sum', add(
        mult( df.get('a'), 10 ),
        mult( df.get('b'), 20 )
    ))
    sum = df.get('sum')
    sum.array.forEach( _ => expect(_).toEqual(80) )

    // ---------------------------------

    df = df.set('sum', add(
        mult( df.get('a'), 10 ),
        mult( df.get('b'), 20 ),
        mult( df.get('a'), 1 )
    ))
    sum = df.get('sum')
    sum.array.forEach( _ => expect(_).toEqual(82) )

    // ---------------------------------

    df = df.set('sum', add(
        df.get('a'),
        100
    ))
    sum = df.get('sum')
    sum.array.forEach( _ => expect(_).toEqual(102) )
})

test('dataframe operation mult', () => {
    let df = new DataFrame()
        .set('a', createSerie(new Array(20).fill(2), 2))
        .set('b', createSerie(new Array(20).fill(3), 2))
        .set('c', createSerie(new Array(20).fill(4), 2))

    expect( exists(df, 'a') ).toBeTruthy()
    expect( exists(df, 'b') ).toBeTruthy()

    const a = mult( df.get('a'), 100 )
    a.array.forEach( _ => expect(_).toEqual(200) )

    const b = mult( df.get('a'), df.get('b') )
    b.array.forEach( _ => expect(_).toEqual(6) )

    const c = mult( df.get('b'), df.get('a'), df.get('c') )
    c.array.forEach( _ => expect(_).toEqual(24) )
    
})
test('dataframe operation div', () => {
    let df = new DataFrame()
        .set('a', createSerie(new Array(20).fill(2), 2))
        .set('b', createSerie(new Array(20).fill(3), 2))
        .set('c', createSerie(new Array(20).fill(2), 2))

    const a = div( df.get('b'), df.get('a') )
    a.array.forEach( _ => expect(_).toEqual(1.5) )

    const b = div( df.get('a'), 2 )
    b.array.forEach( _ => expect(_).toEqual(1) )

    const c = div( df.get('b'), df.get('a'), df.get('c') )
    c.array.forEach( _ => expect(_).toEqual(0.75) )
    
})

test('dataframe operation sub', () => {
    let df = new DataFrame()
        .set('a', createSerie(new Array(20).fill(2), 1))
        .set('b', createSerie(new Array(20).fill(3), 1))
        .set('c', createSerie(new Array(20).fill(2), 2))

    {
        const a = sub( df.get('b'), df.get('a') )
        a.array.forEach( _ => expect(_).toEqual(1) )
    }
    {
        const a = sub( df.get('b'), 2 )
        a.array.forEach( _ => expect(_).toEqual(1) )
    }
    {
        const a = sub( df.get('b'), df.get('a'), df.get('c') )
        a.array.forEach( _ => expect(_).toEqual(-1) )
    }
})

test('dataframe operation norm', () => {
    let df = new DataFrame().set('a', createSerie(new Array(9).fill(2), 3))
    const a = norm( df.get('a') )
    a.array.forEach( _ => expect(_).toEqual(Math.sqrt(12)) )
})

test('dataframe operation mean', () => {
    let df = new DataFrame().set('a', createSerie(new Array(9).fill(0).map ( (_,i) => i), 3 ) )
    const a = mean( df.get('a') )
    const sol = [1, 4, 7]
    a.array.forEach( (_,i) => expect(_).toEqual(sol[i]) )
})

test('dataframe operation superposition', () => {
    let df = new DataFrame()
        .set('a', createSerie(new Array(20).fill(2), 2))
        .set('b', createSerie(new Array(20).fill(3), 2))

    df = df.set('ab', add(
        mult( df.get('a'), 10),
        mult( df.get('b'), 20)
    ))

    console.log( info(df.get('ab')) )
})

test('dataframe operation eigen', () => {
    {
        let df = new DataFrame().set('a', createSerie(new Array(12).fill(2), 6))
        const ev = eigenValues( df.get('a') )
        expect( ev[0] ).toEqual(6)
        expect( ev[1] ).toEqual(0)
        expect( ev[2] ).toEqual(0)
        expect( ev[3] ).toEqual(6)
        expect( ev[4] ).toEqual(0)
        expect( ev[5] ).toEqual(0)
    }

    {
        let df = new DataFrame().set('a', createSerie(new Array(18).fill(2), 9))
        const ev = eigenValues( df.get('a') )
        console.log(ev)
        expect( ev[0] ).toEqual(6)
        expect( ev[1] ).toEqual(0)
        expect( ev[2] ).toEqual(0)
        expect( ev[3] ).toEqual(6)
        expect( ev[4] ).toEqual(0)
        expect( ev[5] ).toEqual(0)
    }
})

test('dataframe operation trace', () => {
    {
        let df = new DataFrame().set('a', createSerie([1,2,3,4,5,6, 6,5,4,3,2,1], 6))
        const ev = trace( df.get('a') )
        expect( ev[0] ).toEqual(11)
        expect( ev[1] ).toEqual(10)
    }
    {
        let df = new DataFrame().set('a', createSerie([1,2,3,4,5,6,7,8,9, 9,8,7,6,5,4,3,2,1], 9))
        const ev = trace( df.get('a') )
        expect( ev[0] ).toEqual(15)
        expect( ev[1] ).toEqual(15)
    }
    {
        let df = new DataFrame().set('a', createSerie([1,2,3,4,5,6], 1))
        const ev = trace( df.get('a') )
        expect( ev[0] ).toEqual(1)
        expect( ev[1] ).toEqual(2)
        expect( ev[5] ).toEqual(6)
    }
    {
        const ev = trace( undefined )
        expect( ev.length ).toEqual(0)
    }
})
