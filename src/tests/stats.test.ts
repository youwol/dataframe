import { ASerie, covariance, mean, weightedMean } from '../lib'
import { createSerie } from '../lib/utils'

test('operation mean itemSize=3', () => {
    const serie = createSerie({data: new Array(9).fill(0).map ( (_,i) => i), itemSize: 3})
    const a = mean(serie) as number[]
    const sol = [3, 4, 5]
    a.forEach( (_,i) => expect(_).toEqual(sol[i]) )
})

test('operation mean itemSize=1', () => {
    const serie = createSerie({data: new Array(9).fill(0).map ( (_,i) => i), itemSize: 1})
    const a = mean(serie) as number
    const sol = ( 9*(9-1)/2 )/9
    expect(a).toEqual(sol)
})

test('operation weoghtedMean itemSize=1', () => {
    const serie = createSerie({data: [1, 2, 3], itemSize: 1})
    const w     = createSerie({data: [7, 1, 11], itemSize: 1})
    
    const a = weightedMean(serie, w)

    let W   = 0
    let sol = 0
    for (let i=0; i<w.array.length; ++i) {
        sol += serie.array[i] * w.array[i]
        W += w.array[i]
    }
    sol /= W

    expect(a).toEqual(sol)
})

test('stats cov', () => {
    let x: ASerie, y: ASerie, c: number

    x = createSerie( {data: [1, 2, 3, 4]})
    y = createSerie( {data: [5, 6, 7 ,8]})
    c = covariance(x,y)
    expect(c).toEqual(1.25)

    x = createSerie( {data: [0.90010907, 0.13484424, 0.62036035]})
    y = createSerie( {data: [0.12528585, 0.26962463, 0.51111198]})
    c = covariance(x,y)
    expect(c).toBeCloseTo(-0.011238)
    
})
