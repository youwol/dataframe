import { Serie } from '../lib'

test('serie newInstance (similar to image)', () => {
    {
        const s1 = Serie.create({
            array: new Array(21).fill(0).map((_, i) => i - 10),
            itemSize: 3,
        })
        const s2 = s1.newInstance({ count: 10, itemSize: 1 })
        expect(s2.count).toBe(10)
        expect(s2.itemSize).toBe(1)
        expect(s2.array instanceof Array).toBeTruthy()
    }
    {
        const s1 = Serie.create({
            array: new Float32Array(21).fill(0).map((_, i) => i - 10),
            itemSize: 3,
        })
        const s2 = s1.newInstance({ count: 10, itemSize: 1 })
        expect(s2.count).toBe(10)
        expect(s2.itemSize).toBe(1)
        expect(s2.array instanceof Float32Array).toBeTruthy()
    }
})

test('serie image (similar to newImage)', () => {
    {
        const s1 = Serie.create({
            array: new Array(21).fill(0).map((_, i) => i - 10),
            itemSize: 3,
        })
        const s2 = s1.image(10, 1)
        expect(s2.count).toBe(10)
        expect(s2.itemSize).toBe(1)
        expect(s2.array instanceof Array).toBeTruthy()
    }
    {
        const s1 = Serie.create({
            array: new Float32Array(21).fill(0).map((_, i) => i - 10),
            itemSize: 3,
        })
        const s2 = s1.image(10, 1)
        expect(s2.count).toBe(10)
        expect(s2.itemSize).toBe(1)
        expect(s2.array instanceof Float32Array).toBeTruthy()
    }
})

test('serie newInstance', () => {
    // itemSize: 1
    {
        const s1 = Serie.create({
            array: new Array(3).fill(0).map((_, i) => i + 1),
            itemSize: 1,
        })

        const s2 = s1.newInstance({ count: 6, itemSize: 2 })
        for (let i = 0; i < s2.count; ++i) {
            s2.setItemAt(i, [i + 1, i + 1])
        }

        expect(s2.isArray).toBeTruthy()
        expect(s2.isArrayBuffer).toBeFalsy()
        expect(s2.isTypedArray).toBeFalsy()
        expect(s2.shared).toBeFalsy()

        const sol = [
            [1, 1],
            [2, 2],
            [3, 3],
            [4, 4],
            [5, 5],
            [6, 6],
        ]
        s2.forEach((v, i) => expect(v).toEqual(sol[i]))
    }

    // itemSize: 3
    {
        const s1 = Serie.create({
            array: new Float32Array(9).fill(0).map((_, i) => i + 1),
            itemSize: 3,
        })

        const s2 = s1.newInstance({ count: 6, itemSize: 1 })
        for (let i = 0; i < s2.count; ++i) {
            s2.setItemAt(i, i + 1)
        }

        expect(s2.isArray).toBeFalsy()
        expect(s2.isArrayBuffer).toBeTruthy()
        expect(s2.isTypedArray).toBeTruthy()
        expect(s2.shared).toBeFalsy()

        const sol = [1, 2, 3, 4, 5, 6]
        s2.forEach((v, i) => expect(v).toEqual(sol[i]))
    }
})

test('newInstance initialize', () => {
    const s1 = Serie.create({
        array: new Array(9).fill(0).map((_, i) => i + 1),
        itemSize: 3,
    })

    const s2 = s1.newInstance({ count: 6, itemSize: 2, initialize: false })
    s2.array.forEach((v) => expect(v).toBeUndefined())

    const s3 = s1.newInstance({ count: 6, itemSize: 2, initialize: true })
    s3.array.forEach((v) => expect(v).toBe(0))
})
