import { DataFrame } from '../lib/dataframe'
import { createSerie } from '../lib/serie'
import { exists, info } from '../lib/utils'
import { map } from '../lib/algorithms'

const gen = (n: number, v: number) => new Array(n).fill(0).map( _ => v )

test('dataframe algo map', () => {
    let df = new DataFrame()
        .set('a', createSerie(new Array(20).fill(2), 1))

    const a = map(df.get('a'), (_) => _**3)
    a.array.forEach( (_,i) => expect(_).toEqual(8) )
})
