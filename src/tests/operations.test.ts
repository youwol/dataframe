import { DataFrame } from '../lib/dataframe'
import { createArray, createEmptySerie, createSerie } from '../lib/utils'
import { exists } from '../lib/utils'
import {
    dot, add, mult, eigenValue, trace, sub, norm, div, transpose, 
    eigenVector, square, abs, normalize, cross, addNumber, weight,
    sum
} from '../lib/math'
import { map, reduce } from '../lib'

test('operation add', () => {
    let df = new DataFrame()
        .set('a', createSerie({data: new Array(20).fill(2), itemSize: 2}))
        .set('b', createSerie({data: new Array(20).fill(3), itemSize: 2}))

    expect( exists(df, 'a') ).toBeTruthy()
    expect( exists(df, 'b') ).toBeTruthy()

    // ---------------------------------

    let sum = add( [df.get('a'), df.get('b')] )
    sum.array.forEach( _ => expect(_).toEqual(5) )

    // ---------------------------------

    const aa = addNumber( df.get('a'), 100 )
    aa.array.forEach( _ => expect(_).toEqual(102) )

    // ---------------------------------
    df = df.set('sum', add([
        mult( df.get('a'), 10 ),
        mult( df.get('b'), 20 )
    ] ))
    sum = df.get('sum')
    sum.array.forEach( _ => expect(_).toEqual(80) )

    // ---------------------------------

    df = df.set('sum', add([
        mult( df.get('a'), 10 ),
        mult( df.get('b'), 20 ),
        mult( df.get('a'), 1 )
    ] ))
    sum = df.get('sum')
    sum.array.forEach( _ => expect(_).toEqual(82) )

})

test('operation add multiple', () => {
    let df = new DataFrame()
        .set('a', createSerie({data: new Array(20).fill(2), itemSize: 2}))
        .set('b', createSerie({data: new Array(20).fill(3), itemSize: 2}))
        .set('c', createSerie({data: new Array(20).fill(4), itemSize: 2}))
        .set('d', createSerie({data: new Array(20).fill(5), itemSize: 2}))
        .set('e', createSerie({data: new Array(20).fill(6), itemSize: 2}))

    const all = [df.get('a'), df.get('b'), df.get('c'), df.get('d'), df.get('e')]
    const a = add( all )
    a.array.forEach( _ => expect(_).toEqual(20) )
})

test('operation mult', () => {
    let df = new DataFrame()
        .set('a', createSerie({data: new Array(20).fill(2), itemSize: 2}))
        .set('b', createSerie({data: new Array(20).fill(3), itemSize: 2}))
        .set('c', createSerie({data: new Array(20).fill(4), itemSize: 2}))

    expect( exists(df, 'a') ).toBeTruthy()
    expect( exists(df, 'b') ).toBeTruthy()

    const a = mult( df.get('a'), 100 )
    a.array.forEach( _ => expect(_).toEqual(200) )

    const b = mult( df.get('a'), df.get('b') )
    b.array.forEach( _ => expect(_).toEqual(6) )

    const c = mult( df.get('b'), df.get('a'), df.get('c') )
    c.array.forEach( _ => expect(_).toEqual(24) )
    
})

test('operation div', () => {
    let df = new DataFrame()
        .set('a', createSerie({data: new Array(20).fill(2), itemSize: 2}))
        .set('b', createSerie({data: new Array(20).fill(3), itemSize: 2}))
        .set('c', createSerie({data: new Array(20).fill(2), itemSize: 2}))

    const a = div( df.get('b'), df.get('a') )
    a.array.forEach( _ => expect(_).toEqual(1.5) )

    const b = div( df.get('a'), 2 )
    b.array.forEach( _ => expect(_).toEqual(1) )

    const c = div( df.get('b'), df.get('a'), df.get('c') )
    c.array.forEach( _ => expect(_).toEqual(0.75) )
    
})

test('operation sub', () => {
    let df = new DataFrame()
        .set('a', createSerie({data: new Array(20).fill(2), itemSize: 1}))
        .set('b', createSerie({data: new Array(20).fill(3), itemSize: 1}))
        .set('c', createSerie({data: new Array(20).fill(2), itemSize: 2}))

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

test('operation norm', () => {
    let df = new DataFrame().set('a', createSerie({data: new Array(9).fill(2), itemSize: 3}))
    const a = norm( df.get('a') )
    a.array.forEach( _ => expect(_).toEqual(Math.sqrt(12)) )
})

test('operation superposition', () => {
    let df = new DataFrame()
        .set('a', createSerie({data: new Array(20).fill(2), itemSize: 2}))
        .set('b', createSerie({data: new Array(20).fill(3), itemSize: 2}))

    df = df.set('ab', add([
        mult( df.get('a'), 10),
        mult( df.get('b'), 20)
    ] ))
})

test('operation eigen', () => {
    {
        const a = createSerie({data: new Array(12).fill(2), itemSize: 6})
        const ev = eigenValue( a )
        expect( ev.array[0] ).toEqual(6)
        expect( ev.array[1] ).toEqual(0)
        expect( ev.array[2] ).toEqual(0)
        expect( ev.array[3] ).toEqual(6)
        expect( ev.array[4] ).toEqual(0)
        expect( ev.array[5] ).toEqual(0)

        let vec = eigenVector( a )
        let sol = [
            0.5773502691896257,   0.5773502691896258, 0.5773502691896257,
            0.7071067811865476,  -0.7071067811865475, 0,
           -0.40824829046386296, -0.408248290463863,  0.816496580927726,

            0.5773502691896257,   0.5773502691896258, 0.5773502691896257,
            0.7071067811865476,  -0.7071067811865475, 0,
            -0.40824829046386296,-0.408248290463863,  0.816496580927726
        ]
        vec.array.forEach( (v,i) => expect(v).toBeCloseTo(sol[i]))


        // Get the vector1
        vec = eigenVector(a).map( v => [v[0], v[1], v[2]] )
        sol = [
            0.5773502691896257,   0.5773502691896258, 0.5773502691896257,
            0.5773502691896257,   0.5773502691896258, 0.5773502691896257
        ]
        vec.array.forEach( (v,i) => expect(v).toBeCloseTo(sol[i]))

        // Get the vector2
        vec = eigenVector(a).map( v => [v[3], v[4], v[5]] )
        sol = [
            0.7071067811865476,  -0.7071067811865475, 0,
            0.7071067811865476,  -0.7071067811865475, 0
        ]
        vec.array.forEach( (v,i) => expect(v).toBeCloseTo(sol[i]))

        // Get the vector3
        vec = eigenVector(a).map( v => [v[6], v[7], v[8]] )
        sol = [
            -0.40824829046386296,-0.408248290463863,  0.816496580927726,
            -0.40824829046386296,-0.408248290463863,  0.816496580927726
        ]
        vec.array.forEach( (v,i) => expect(v).toBeCloseTo(sol[i]))
    }

    {
        let df = new DataFrame().set('a', createSerie({data: new Array(18).fill(2), itemSize: 9}))
        const ev = eigenValue( df.get('a') )
        expect( ev.array[0] ).toEqual(6)
        expect( ev.array[1] ).toEqual(0)
        expect( ev.array[2] ).toEqual(0)
        expect( ev.array[3] ).toEqual(6)
        expect( ev.array[4] ).toEqual(0)
        expect( ev.array[5] ).toEqual(0)
    }
})

test('operation trace', () => {
    {
        let df = new DataFrame().set('a', createSerie({data: [1,2,3,4,5,6, 6,5,4,3,2,1], itemSize: 6}))
        const t = trace( df.get('a') )
        expect( t.array[0] ).toEqual(11)
        expect( t.array[1] ).toEqual(10)
    }
    {
        let df = new DataFrame().set('a', createSerie({data: [1,2,3,4,5,6,7,8,9, 9,8,7,6,5,4,3,2,1], itemSize: 9}))
        const t = trace( df.get('a') )
        expect( t.array[0] ).toEqual(15)
        expect( t.array[1] ).toEqual(15)
    }
    {
        let df = new DataFrame().set('a', createSerie({data: [1,2,3,4,5,6]}))
        const t = trace( df.get('a') )
        expect( t.array[0] ).toEqual(1)
        expect( t.array[1] ).toEqual(2)
        expect( t.array[5] ).toEqual(6)
    }
})

test('operation transpose', () => {
    let df = new DataFrame().set('a', createSerie({data: [1,2,3,4,5,6,7,8,9, 9,8,7,6,5,4,3,2,1], itemSize: 9}))
    const t = transpose( df.get('a') )
    expect( t.itemAt(0) ).toEqual([1,4,7,2,5,8,3,6,9])
    expect( t.itemAt(1) ).toEqual([9,6,3,8,5,2,7,4,1])
})

test('operation square', () => {
    let s = createSerie({data: [2,3], itemSize: 1})
    let t = square( s )
    expect( t.itemAt(0) ).toEqual(4)
    expect( t.itemAt(1) ).toEqual(9)

    s = createSerie({data: [2,3,4,5], itemSize: 2})
    t = square( s )
    expect( t.itemAt(0) ).toEqual([4,9])
    expect( t.itemAt(1) ).toEqual([16,25])
})

test('operation normalize', () => {
    let s = createSerie({data: [1,2,3], itemSize: 3})
    let t = normalize( s )
    expect( t.itemAt(0) ).toEqual([0, 1/2, 1])
    

    s = createSerie({data: [1, 2, 3], itemSize: 1})
    t = normalize( s )
    expect( t.itemAt(0) ).toEqual(0)
    expect( t.itemAt(1) ).toEqual(1/2)
    expect( t.itemAt(2) ).toEqual(1)
})

test('operation cross', () => {
    let a = createSerie({data: [2,3,4], itemSize: 3})
    let b = createSerie({data: [5,6,7], itemSize: 3})
    let t = cross(a,b)
    expect( t.itemAt(0) ).toEqual([-3, 6, -3])

    a = createSerie({data: [2,3,4, 5,6,7] , itemSize: 3})
    b = createSerie({data: [5,6,7, -1,4,2], itemSize: 3})
    t = cross(a,b)
    expect( t.itemAt(0) ).toEqual([-3, 6, -3] )
    expect( t.itemAt(1) ).toEqual([-16, -17, 26] )
})

test('operation sum', () => {
    let a = createSerie({data: [2,3,4,5], itemSize: 1})
    let b = createSerie({data: [2,3,4,5], itemSize: 2})

    expect( sum(a) ).toEqual(2+3+4+5)
    expect( sum(b) ).toEqual([2+4, 3+5])

})

test('operation abs', () => {
    let s = createSerie({data: [-2,-3], itemSize: 1})
    let t = abs( s )
    expect( t.itemAt(0) ).toEqual(2)
    expect( t.itemAt(1) ).toEqual(3)

    s = createSerie({data: [-2,-3,-4,-5], itemSize: 2})
    t = abs( s )
    expect( t.itemAt(0) ).toEqual([2,3])
    expect( t.itemAt(1) ).toEqual([4,5])
})

test('operation dot', () => {
    let s1 = createSerie({data: [1,2,3,4,5,6], itemSize: 3})
    const t = dot(s1, s1)
    expect( t.itemAt(0) ).toEqual(1+4+9)
    expect( t.itemAt(1) ).toEqual(16+25+36)
})

test('operation composition', () => {
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

    const values = eigenValue( add([
        mult( stress1, 0.1 ),
        mult( stress2, 1.2 ),
        mult( stress3, -3.2 )
    ] ))

    //console.log(values)
    expect(values.count).toEqual(3)
    expect(values.itemSize).toEqual(3)
    expect(values.length).toEqual(9)

    // values.forEach( item => {
    //     expect(item[0]).toEqual(0)
    //     expect(item[1]).toEqual(0)
    //     expect(item[2]).toBeCloseTo(-7.8)
    // })
})

test('superposition', () => {
    const alpha = [1, 2, 3]

    const S1 = createSerie( {data: createArray(18, i => i  ), itemSize: 6})
    const S2 = createSerie( {data: createArray(18, i => i+1), itemSize: 6})
    const S3 = createSerie( {data: createArray(18, i => i+2), itemSize: 6})

    const sol = [
        8 , 14, 20, 26,  32,  38,
        44, 50, 56, 62,  68,  74,
        80, 86, 92, 98, 104, 110
    ]

    const r1 = reduce( [S1, S2, S3], (stresses) => stresses
        .map( (s, i) => s.map( v => v*alpha[i] ) )
        .reduce( (acc, stress) => stress.map( (v,j) => v+acc[j] ), [0,0,0,0,0,0])
    )
    r1.array.forEach( (v,i) => expect(v).toEqual(sol[i]) )

    const r2 = add([
        mult( S1, alpha[0] ),
        mult( S2, alpha[1] ),
        mult( S3, alpha[2] )
    ] )
    // Note the r.array.forEach and not the r.forEach as below
    r2.array.forEach( (v,i) => expect(v).toEqual(sol[i]) )
})

test('weight', () => {
    const S = [
        createSerie( {data: createArray(18, i => i  ), itemSize: 6}),
        createSerie( {data: createArray(18, i => i+1), itemSize: 6}),
        createSerie( {data: createArray(18, i => i+2), itemSize: 6})
    ]

    const sol = [
        [8 , 14, 20, 26,  32,  38],
        [44, 50, 56, 62,  68,  74],
        [80, 86, 92, 98, 104, 110]
    ]

    const r = weight(S, [1,2,3])
    // Note the r.forEach and not the r.array.forEach as above
    r.forEach( (v,i) => expect(v).toEqual(sol[i]) )
})
