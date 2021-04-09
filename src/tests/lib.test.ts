import { DataFrame } from "../lib"
import { createEmptySerie, createSerie } from '../lib/utils'

test('serie test', () => {

    const df = new DataFrame({
        columns: {
            a: createEmptySerie({Type: Float32Array, count:2, itemSize:3, shared: true }),
            b: createEmptySerie({Type: Float64Array, count:2, itemSize:3, shared: false}),
            c: createSerie([0,1,2,3,4,5,6,7,8,9], 5),
        }
    })

    expect( df.get('a').isArray ).toBeFalsy()
    expect( df.get('b').isArray ).toBeFalsy()
    expect( df.get('c').isArray ).toBeTruthy()
})