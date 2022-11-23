import { DataFrame, Serie, Manager, FunctionalDecomposer } from '../lib'

test('test functional on AttributeManager', () => {
    const df = DataFrame.create({
        series: {
            positions: Serie.create( {array: [1,2,3, 1,4,3, 7,2,5], itemSize: 3} )
        }
    })

    const mng = new Manager(df, {
        decomposers: [
            new FunctionalDecomposer(1, 'f', (df: DataFrame) => {
                const fct = (x,y,z) => x**2-y**3+Math.abs(z)
                const positions = df.series['positions']
                return positions.map( p => fct(p[0], p[1], p[2]) )
            })
        ],
        dimension: 3
    })

    expect(mng.names(1)).toEqual(['f'])

    const fct = (x,y,z) => x**2-y**3+Math.abs(z)
    expect( mng.serie(1, 'f').array            ).toEqual( [fct(1,2,3), fct(1,4,3), fct(7,2,5)] )
    //expect( nameOfSerie(df, mng.serie(1, 'f')) ).toEqual('f')
})
