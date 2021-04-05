import { DataFrame } from '../lib/dataframe'
import { createEmptySerie, createSerie } from '../lib/serie'
import { exists } from '../lib/utils'
import { add, mult, eigenValue, trace, sub, norm, mean, div, transpose } from '../lib/math'
import { map } from '../lib'

test('dataframe operation add', () => {
    let df = new DataFrame()
        .set('a', createSerie(new Array(20).fill(2), 2))
        .set('b', createSerie(new Array(20).fill(3), 2))

    expect( exists(df, 'a') ).toBeTruthy()
    expect( exists(df, 'b') ).toBeTruthy()

    // ---------------------------------

    let sum = add(
        df.get('a'),
        df.get('b')
    )
    sum.array.forEach( _ => expect(_).toEqual(5) )

    // ---------------------------------

    const aa = add(
        df.get('a'),
        100
    )
    aa.array.forEach( _ => expect(_).toEqual(102) )

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

})

test('dataframe operation add multiple', () => {
    let df = new DataFrame()
        .set('a', createSerie(new Array(20).fill(2), 2))
        .set('b', createSerie(new Array(20).fill(3), 2))
        .set('c', createSerie(new Array(20).fill(4), 2))
        .set('d', createSerie(new Array(20).fill(5), 2))
        .set('e', createSerie(new Array(20).fill(6), 2))

    const all = [df.get('b'), df.get('c'), df.get('d'), df.get('e')]
    const a = add( df.get('a'), ...all )
    a.array.forEach( _ => expect(_).toEqual(20) )
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
    //console.log(a)
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
})

test('dataframe operation eigen', () => {
    {
        let df = new DataFrame().set('a', createSerie(new Array(12).fill(2), 6))
        const ev = eigenValue( df.get('a') )
        expect( ev.array[0] ).toEqual(6)
        expect( ev.array[1] ).toEqual(0)
        expect( ev.array[2] ).toEqual(0)
        expect( ev.array[3] ).toEqual(6)
        expect( ev.array[4] ).toEqual(0)
        expect( ev.array[5] ).toEqual(0)
    }

    {
        let df = new DataFrame().set('a', createSerie(new Array(18).fill(2), 9))
        const ev = eigenValue( df.get('a') )
        expect( ev.array[0] ).toEqual(6)
        expect( ev.array[1] ).toEqual(0)
        expect( ev.array[2] ).toEqual(0)
        expect( ev.array[3] ).toEqual(6)
        expect( ev.array[4] ).toEqual(0)
        expect( ev.array[5] ).toEqual(0)
    }
})

test('dataframe operation trace', () => {
    {
        let df = new DataFrame().set('a', createSerie([1,2,3,4,5,6, 6,5,4,3,2,1], 6))
        const t = trace( df.get('a') )
        expect( t.array[0] ).toEqual(11)
        expect( t.array[1] ).toEqual(10)
    }
    {
        let df = new DataFrame().set('a', createSerie([1,2,3,4,5,6,7,8,9, 9,8,7,6,5,4,3,2,1], 9))
        const t = trace( df.get('a') )
        expect( t.array[0] ).toEqual(15)
        expect( t.array[1] ).toEqual(15)
    }
    {
        let df = new DataFrame().set('a', createSerie([1,2,3,4,5,6], 1))
        const t = trace( df.get('a') )
        expect( t.array[0] ).toEqual(1)
        expect( t.array[1] ).toEqual(2)
        expect( t.array[5] ).toEqual(6)
    }
})

test('dataframe operation transpose', () => {
    let df = new DataFrame().set('a', createSerie([1,2,3,4,5,6,7,8,9, 9,8,7,6,5,4,3,2,1], 9))
    const t = transpose( df.get('a') )
    expect( t.itemAt(0) ).toEqual([1,4,7,2,5,8,3,6,9])
    expect( t.itemAt(1) ).toEqual([9,6,3,8,5,2,7,4,1])
})

test('dataframe operation composition', () => {
    let df = new DataFrame()
        .set('stress1', createEmptySerie({Type: Float32Array, count: 3, itemSize: 6, shared: true}) )
        .set('stress2', createEmptySerie({Type: Float32Array, count: 3, itemSize: 6, shared: true}) )
        .set('stress3', createEmptySerie({Type: Float32Array, count: 3, itemSize: 6, shared: true}) )
    
    let stress1 = df.get('stress1')
    let stress2 = df.get('stress2')
    let stress3 = df.get('stress3')

    expect(stress1.count).toEqual(3)
    expect(stress1.itemSize).toEqual(6)
    expect(stress1.length).toEqual(18)

    //stress1 = map(stress1, (_,i) => [i,i,i,i,i,i])

    const values = eigenValue( add(
        mult( stress1, 0.1 ),
        mult( stress2, 1.2 ),
        mult( stress3, -3.2 )
    ) )

    expect(values.count).toEqual(3)
    expect(values.itemSize).toEqual(3)
    expect(values.length).toEqual(9)

    // values.forEachItem( item => {
    //     expect(item[0]).toEqual(0)
    //     expect(item[1]).toEqual(0)
    //     expect(item[2]).toBeCloseTo(-7.8)
    // })
})
