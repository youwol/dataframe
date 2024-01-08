import { reduce, Serie } from '../lib'

test('reduce test with array', () => {
    const S1 = Serie.create({ array: [1, 2, 3, 4], itemSize: 1 })
    const S2 = Serie.create({ array: [1, 2, 3, 4], itemSize: 1 })
    const S3 = Serie.create({ array: [1, 2, 3, 4], itemSize: 1 })

    const r = reduce(
        [S1, S2, S3],
        (cur, [s1, s2, s3]) => [cur[0] + s1, cur[1] + s2, cur[2] + s3],
        [0, 1, 2],
    )

    expect(r).toEqual([10, 11, 12])
})

// ----------------------------------------------------------------------

const equals = (s1: Serie, s2: Serie): boolean => {
    if (s1 === undefined) throw new Error('serie s1 is undefined')
    if (s2 === undefined) throw new Error('serie s2 is undefined')

    if (s1.itemSize !== s2.itemSize) return false
    if (s1.count !== s2.count) return false

    return reduce([s1, s2], (acc, [x, y]) => acc && x === y, true)
}

test('reduce test with boolean', () => {
    {
        const S1 = Serie.create({ array: [1, 2, 3], itemSize: 1 })
        const S2 = Serie.create({ array: [1, 2, 3], itemSize: 1 })
        const r = reduce(
            [S1, S2],
            (acc, [s1, s2]) => {
                return acc && s1 === s2
            },
            true,
        )

        expect(r).toBeTruthy()
        expect(equals(S1, S2)).toBeTruthy()
    }
})
