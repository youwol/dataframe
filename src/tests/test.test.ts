import { createSerie } from '../lib/utils'

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
})
