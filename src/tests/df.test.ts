import { DataFrame }    from '../lib/dataframe'
import { createSeries } from '../lib/factory'
import { info, exists } from '../lib/info'

const gen = (n: number) => new Array(n).fill(0).map( (v,i)=>i+1 )

test('dataframe test', () => {

    const df1 = new DataFrame()

    const df2 = df1.set('fric'  , createSeries(gen(10)) )    // 10 values
    const df3 = df2.set('stress', createSeries(gen(60), 6) ) // 60 values
    const df4 = df3.set('displ' , createSeries(gen(30), 3) ) // 30 values

    console.log( info(df4) )

    expect( exists(df1, 'fric') ).toBeFalsy()
    expect( exists(df2, 'fric') ).toBeTruthy()

    expect( exists(df1, 'stress') ).toBeFalsy()
    expect( exists(df2, 'stress') ).toBeFalsy()
    expect( exists(df3, 'stress') ).toBeTruthy()

    expect( exists(df1, 'displ') ).toBeFalsy()
    expect( exists(df2, 'displ') ).toBeFalsy()
    expect( exists(df3, 'displ') ).toBeFalsy()
    expect( exists(df4, 'displ') ).toBeTruthy()
    
    let fric = df4.get('fric')
    fric[0] = 4/(1+Math.sqrt(5))**2
    expect( df3.get('fric')[0] ).toEqual(fric[0])    
    expect( df2.get('fric')[0] ).toEqual(fric[0])
    expect( df1.get('fric')    ).toBeUndefined()
})
