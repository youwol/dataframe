
import { nameOfSerie } from '../lib/utils'
import { Serie } from '../lib/serie'
import { DataFrame } from '../lib'

test('"apply" on serie with itemSize=1', () => {

    const df = DataFrame.create({
        series: {
            'tutu': Serie.create( {array: new Array(10).fill(0).map( (v,i) => i+1 ), itemSize: 1} )
        }
    })

    const serie = Serie.create( {array: new Array(10).fill(0).map( (v,i) => i+1 ), itemSize: 1} )

    expect( nameOfSerie(df, df.series.tutu) ).toEqual('tutu')
    expect( nameOfSerie(df, serie) ).toBeUndefined()
})
