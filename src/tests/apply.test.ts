import { createSerie } from '../lib/utils'
import { apply } from '../lib/algorithms'

test('"apply" on serie with itemSize=1', () => {
    const s1 = createSerie( {data: new Array(10).fill(0).map( (v,i) => i+1 ), itemSize: 1} )
    const s2 = apply(s1, item => item**2)

    expect(s2.array).toEqual([
        1,
        4,  
        9, 
        16,  
        25, 
        36, 
        49, 
        64, 
        81, 
        100
    ])
})

test('"apply" on serie with itemSize=3', () => {
    const s1 = createSerie( {data: new Array(30).fill(0).map( (v,i) => i+1 ), itemSize: 3} )
    const s2 = apply(s1, (item,i) => item.map( v => v+i) )

    expect(s2.array).toEqual([
        1,  2,  3,
        5,  6,  7,
        9, 10, 11,
        13, 14, 15,
        17, 18, 19, 
        21, 22, 23,
        25, 26, 27, 
        29, 30, 31, 
        33, 34, 35,
        37, 38, 39
    ])
})
