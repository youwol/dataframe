import { createSerie } from '../lib/utils'
import { rand, round, tagNaN } from '../lib/math'
import { check, isNaN } from '../lib/conditional'


// const doit = (a: string[], cb: Function) => {
//     return cb(a)
// }
// const A = ['a1', 'b2', 'c3']
// doit(A, ([a,...rest]) => {
//     console.log(a,...rest)
// })
// doit(A, a => {
//     console.log(a)
// })

test('test test', () => {
    const a = createSerie( {data: [1, 2, 3, 4, 5, 6]} )
    const b = createSerie( {data: [1, 2, 3, 4, 5, 6], itemSize: 3} )
    
    console.log( isNaN(tagNaN(a, v => v%2===0 )).array )
    console.log( rand(a, -1, 2 ).array )
    console.log( round( rand(a, -10, 20 ) ).array )

    console.log( check(a, v => v%2===0 ).array )
    console.log( check(b, v => v[0]===v[1]-1 && v[0]%2===0 ).array )
})
