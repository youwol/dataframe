import { Serie } from '../lib'

test('test serie newInstance (similar to image)', () => {
    {
        const s1 = Serie.create({ array: new Array(21).fill(0).map((_,i) => i-10), itemSize:3 })
        const s2 = s1.newInstance({count: 10, itemSize: 1})
        expect(s2.count).toEqual(10)
        expect(s2.itemSize).toEqual(1)
        expect(s2.array instanceof Array).toBeTruthy()
    }
    {
        const s1 = Serie.create({ array: new Float32Array(21).fill(0).map((_,i) => i-10), itemSize:3 })
        const s2 = s1.newInstance({count: 10, itemSize: 1})
        expect(s2.count).toEqual(10)
        expect(s2.itemSize).toEqual(1)
        expect(s2.array instanceof Float32Array).toBeTruthy()
    }
})


test('test serie image (similar to newImage)', () => {
    {
        const s1 = Serie.create({ array: new Array(21).fill(0).map((_,i) => i-10), itemSize:3 })
        const s2 = s1.image(10, 1)
        expect(s2.count).toEqual(10)
        expect(s2.itemSize).toEqual(1)
        expect(s2.array instanceof Array).toBeTruthy()
    }
    {
        const s1 = Serie.create({ array: new Float32Array(21).fill(0).map((_,i) => i-10), itemSize:3 })
        const s2 = s1.image(10, 1)
        expect(s2.count).toEqual(10)
        expect(s2.itemSize).toEqual(1)
        expect(s2.array instanceof Float32Array).toBeTruthy()
    }
})
