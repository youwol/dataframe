import { reduce, Serie } from "../lib"

test('reduce', () => {
    const S1 = Serie.create({ array: [1,2,3,4], itemSize: 1 })
    const S2 = Serie.create({ array: [1,2,3,4], itemSize: 1 })
    const S3 = Serie.create({ array: [1,2,3,4], itemSize: 1 })

    const r = reduce([S1, S2, S3], (cur, [s1, s2, s3]) => [cur[0]+s1, cur[1]+s2, cur[2]+s3], [0,1,2] )
    
    expect(r).toEqual([ 10, 11, 12 ])
})
