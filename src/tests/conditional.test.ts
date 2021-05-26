import { DataFrame } from '../lib/dataframe'
import { check } from '../lib/conditional'
import { Serie } from '../lib'
import { _if } from '../lib/conditional/if'

test('serie check', () => {

    const s = Serie.create({ array: new Array(20).fill(0).map((_,i) => i-10), itemSize:1 })

    expect(check(s, item => item<0 ).array).toEqual([
        true,  true,  true,  true,
        true,  true,  true,  true,
        true,  true,  false, false,
        false, false, false, false,
        false, false, false, false
      ])

    expect( _if(s, item => item<0, item => item+100, item => item+10000 ).array ).toEqual([
        90,    91,    92,    93,
        94,    95,    96,    97,
        98,    99, 10000, 10001,
     10002, 10003, 10004, 10005,
     10006, 10007, 10008, 10009
    ])
})
