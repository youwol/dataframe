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

test('test serie setItemAt', () => {
    // itemSize: 1
    {
        const s1 = Serie.create({ array: new Array(3).fill(0), itemSize:1 })
        s1.setItemAt(0, 7)
        expect(s1.itemAt(0)).toEqual(7)
        s1.setItemAt(2, 17)
        expect(s1.itemAt(2)).toEqual(17)
    }
    // itemSize: 3
    {
        const s1 = Serie.create({ array: new Float32Array(9).fill(0), itemSize:3 })
        s1.setItemAt(0, [1,2,3])
        expect(s1.itemAt(0)).toEqual([1,2,3])
        s1.setItemAt(2, [10, 20, 30])
        expect(s1.itemAt(2)).toEqual([10, 20, 30])
    }
})
