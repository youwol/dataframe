import { symSquaredMatrix, squaredMatrix, vector } from '../lib'
import { reduce } from '../lib/algorithms'
import { createSerie, ASerie } from '../lib/serie'

test('views squared matrix * vector', () => {
    const M = createSerie(new Array(27).fill(0).map( (_,i)=>i ), 9)
    const V = createSerie(new Array( 9).fill(0).map( (_,i)=>i ), 3)
    
    const reduced = reduce([M,V], ([m, v]) => {
        const A = squaredMatrix(m, 3)
        const x = vector(v)
        return A.multVec(x).array
    })

    expect(reduced.count).toEqual(3)
    expect(reduced.itemSize).toEqual(3)

    const sol = [
        [  5,  14,  23], 
        [122, 158, 194], 
        [401, 464, 527]
    ]

    reduced.forEachItem( (v,i) => {
        expect(v).toEqual(sol[i])
    })
})

test('views symmetric squared smatrix * vector', () => {
    const M = createSerie(new Array(18).fill(0).map( (_,i)=>i ), 6) // [0,1,2...17]
    const V = createSerie(new Array( 9).fill(0).map( (_,i)=>i ), 3) // [0,1,2...8]
    
    const reduced = reduce([M, V], ([m, v]) => {
        const A = symSquaredMatrix(m, 3)
        const x = vector(v)
        return A.multVec(x).array
    })

    expect(reduced.count).toEqual(3)
    expect(reduced.itemSize).toEqual(3)

    const sol = [
        [  5,  11,  14],
        [ 86, 107, 119],
        [275, 311, 332]
    ]

    reduced.forEachItem( (v,i) => {
        expect(v).toEqual(sol[i])
    })
})

test('views complex operation', () => {
    const M = createSerie(new Array(27).fill(0).map( (_,i)=>i ), 9) // [0,1,2...17]
    const V = createSerie(new Array( 9).fill(0).map( (_,i)=>i ), 3) // [0,1,2...8]
    
    const reduced = reduce([M, V], ([m, v]) => {
        const A = squaredMatrix(m, 3)
        return A.transpose().multVec( vector(v).normalize() ).array
    })

    expect(reduced.count).toEqual(3)
    expect(reduced.itemSize).toEqual(3)

    const sol = [
         6.7082037925720215, 8.049844741821289,  9.391485214233398,
        21.21320343017578,  22.910259246826172, 24.607315063476562,
        36.619667053222656, 38.34005355834961,  40.06044006347656
    ]

     console.log(reduced)

    reduced.array.forEach( (v,i) => {
        expect(v).toBeCloseTo(sol[i])
    })
})

// NOT using math views (matrix and vector)
test('views superposition', () => {
    const S1 = createSerie(new Array(18).fill(0).map( (_,i)=>i   ), 6)
    const S2 = createSerie(new Array(18).fill(0).map( (_,i)=>i+1 ), 6)
    const S3 = createSerie(new Array(18).fill(0).map( (_,i)=>i+2 ), 6)

    const alpha = [1, 2, 3]
    const reduced = reduce( [S1, S2, S3], (stresses) => {
        // stresses is [[---6--], ..., [---6--]] with length = allStresses.length
        return stresses
            .map( (s, i) => s.map( v => v*alpha[i] ) )
            .reduce( (acc, stress) => stress.map( (v,j) => v+acc[j] ), [0,0,0,0,0,0])
    })

    const sol = [
         8, 14, 20, 26,  32,  38,
        44, 50, 56, 62,  68,  74,
        80, 86, 92, 98, 104, 110
    ]
    reduced.array.forEach( (v,i) => expect(v).toEqual(sol[i]) )
})
