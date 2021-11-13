import { DataFrame } from '../lib/dataframe'
import { Serie } from '../lib'

class A {
  count() {return 10}
}

test('serie isSerie', () => {
    const s1 = Serie.create({ array: new Array(20).fill(0).map((_,i) => i-10), itemSize:1 })
    const s2 = Serie.create({ array: new Array(20).fill(0).map((_,i) => i-10), itemSize:1 })

    expect( Serie.isSerie(s1) ).toBeTruthy()
    expect( Serie.isSerie(s2) ).toBeTruthy()
    expect( Serie.isSerie(new Array(1)) ).toBeFalsy()
    expect( Serie.isSerie([1,2,3]) ).toBeFalsy()
    expect( Serie.isSerie(new A) ).toBeFalsy()

    expect( Serie.isSerie([s1, s2]) ).toBeFalsy()
})
