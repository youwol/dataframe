import { symSquaredMatrix, squaredMatrix, vector, Serie } from '../lib'
import { map } from '../lib/algorithms'

test('views test vector', () => {
    const v = vector([1, 2, 3])
    expect(v.at(0)).toBe(1)
    expect(v.at(1)).toBe(2)
    expect(v.at(2)).toBe(3)
    expect(v.length).toBe(3)
    const n = Math.sqrt(1 + 4 + 9)
    expect(v.norm()).toBeCloseTo(n)

    const w = vector([3, 2, 1])
    expect(v.dot(w)).toBeCloseTo(1 * 3 + 2 * 2 + 3 * 1)

    v.mult(2)
    expect(v.at(0)).toBeCloseTo(2)
    expect(v.at(1)).toBeCloseTo(4)
    expect(v.at(2)).toBeCloseTo(6)

    v.normalize()

    expect(v.at(0)).toBeCloseTo(1 / n)
    expect(v.at(1)).toBeCloseTo(2 / n)
    expect(v.at(2)).toBeCloseTo(3 / n)
    expect(v.norm()).toBeCloseTo(1)
})

test('views test isSymmetric', () => {
    expect(squaredMatrix([1, 2, 3, 4, 5, 6, 7, 8, 9]).isSymmetric).toBeFalsy()
    expect(squaredMatrix([1, 2, 3, 2, 4, 5, 3, 5, 6]).isSymmetric).toBeTruthy()
    expect(squaredMatrix([1, 2, 3, 4]).isSymmetric).toBeFalsy()
    expect(squaredMatrix([1, 2, 2, 3]).isSymmetric).toBeTruthy()

    expect(
        symSquaredMatrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).isSymmetric,
    ).toBeTruthy()
    expect(symSquaredMatrix([1, 2, 3, 4, 5, 6]).isSymmetric).toBeTruthy()
    expect(symSquaredMatrix([1, 2, 3]).isSymmetric).toBeTruthy()
})

test('views test squared matrix', () => {
    const m = squaredMatrix([1, 2, 3, 4, 5, 6, 7, 8, 9])
    expect(m.at(0, 0)).toBe(1)
    expect(m.at(0, 1)).toBe(2)
    expect(m.at(0, 2)).toBe(3)
    expect(m.at(1, 0)).toBe(4)
    expect(m.at(1, 1)).toBe(5)
    expect(m.at(1, 2)).toBe(6)
    expect(m.at(2, 0)).toBe(7)
    expect(m.at(2, 1)).toBe(8)
    expect(m.at(2, 2)).toBe(9)

    expect(m.trace()).toBe(15)

    const v = m.multVec([1, 1, 1])
    expect(v.array).toEqual([6, 15, 24])

    expect(() => m.multVec([1, 1, 1, 1])).toThrow(Error) // bad dim vector

    const w = m.multMat(squaredMatrix([9, 8, 7, 6, 5, 4, 3, 2, 1]))
    expect(w.array).toEqual([30, 24, 18, 84, 69, 54, 138, 114, 90])

    expect(() => m.multMat(squaredMatrix([9, 8, 7, 6]))).toThrow(Error) // bad dim matrix

    const t = m.transpose()
    expect(t.array).toEqual([1, 4, 7, 2, 5, 8, 3, 6, 9])

    const tt = t.copy()
    expect(tt.array).toEqual([1, 4, 7, 2, 5, 8, 3, 6, 9])

    const m1 = squaredMatrix([1, 2, 3, 4, 5, 6, 7, 8, 9])
    const m2 = squaredMatrix([9, 8, 7, 6, 5, 4, 3, 2, 1])
    m1.addMat(m2)
    expect(m1.array).toEqual([10, 10, 10, 10, 10, 10]) // because symmetric

    expect(() => m.addMat(squaredMatrix([9, 8, 7, 6]))).toThrow(Error) // bad dim matrix

    m1.add(2, 2, 10)
    expect(m1.at(2, 2)).toBe(20)

    m1.set(2, 2, 10)
    expect(m1.at(2, 2)).toBe(10)

    m1.scale(2)
    expect(m1.array).toEqual([20, 20, 20, 20, 20, 20]) // because symmetric

    expect(() => squaredMatrix([1, 2, 3, 4, 5, 6, 7, 8, 9])).not.toThrow(Error)
    expect(() => squaredMatrix([1, 2, 3, 4, 5, 6, 7, 8])).toThrow(Error)
    expect(() => squaredMatrix([1, 2, 3, 4, 5, 6, 7])).toThrow(Error)
    expect(() => squaredMatrix([1, 2, 3, 4, 5, 6])).toThrow(Error)
    expect(() => squaredMatrix([1, 2, 3, 4, 5])).toThrow(Error)
    expect(() => squaredMatrix([1, 2, 3, 4])).not.toThrow(Error)

    expect(() => symSquaredMatrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).not.toThrow(
        Error,
    )
    expect(() => symSquaredMatrix([1, 2, 3, 4, 5, 6, 7, 8, 9])).toThrow(Error)
    expect(() => symSquaredMatrix([1, 2, 3, 4, 5, 6, 7, 8])).toThrow(Error)
    expect(() => symSquaredMatrix([1, 2, 3, 4, 5, 6, 7])).toThrow(Error)
    expect(() => symSquaredMatrix([1, 2, 3, 4, 5, 6])).not.toThrow(Error)
    expect(() => symSquaredMatrix([1, 2, 3, 4, 5])).toThrow(Error)
    expect(() => symSquaredMatrix([1, 2, 3, 4])).toThrow(Error)
    expect(() => symSquaredMatrix([1, 2, 3])).not.toThrow(Error)
})

test('views test symmetric squared matrix', () => {
    const m = symSquaredMatrix([1, 2, 3, 4, 5, 6])

    expect(m.at(0, 0)).toBe(1)
    expect(m.at(0, 1)).toBe(2)
    expect(m.at(0, 2)).toBe(3)
    expect(m.at(1, 0)).toBe(m.at(0, 1))
    expect(m.at(1, 1)).toBe(4)
    expect(m.at(1, 2)).toBe(5)
    expect(m.at(2, 0)).toBe(m.at(0, 2))
    expect(m.at(2, 1)).toBe(m.at(1, 2))
    expect(m.at(2, 2)).toBe(6)

    expect(m.trace()).toBe(11)

    const v = m.multVec([1, 1, 1])
    expect(v.array).toEqual([6, 11, 14])
})

test('views squared matrix * vector', () => {
    const M = Serie.create({
        array: new Array(27).fill(0).map((_, i) => i),
        itemSize: 9,
    })
    const V = Serie.create({
        array: new Array(9).fill(0).map((_, i) => i),
        itemSize: 3,
    })

    const reduced = map([M, V], ([m, v]) => {
        const A = squaredMatrix(m)
        const x = vector(v)
        return A.multVec(x).array
    })

    expect(reduced.count).toBe(3)
    expect(reduced.itemSize).toBe(3)

    const sol = [
        [5, 14, 23],
        [122, 158, 194],
        [401, 464, 527],
    ]

    reduced.forEach((v, i) => {
        expect(v).toEqual(sol[i])
    })
})

test('views symmetric squared smatrix * vector', () => {
    const M = Serie.create({
        array: new Array(18).fill(0).map((_, i) => i),
        itemSize: 6,
    }) // [0,1,2...17]
    const V = Serie.create({
        array: new Array(9).fill(0).map((_, i) => i),
        itemSize: 3,
    }) // [0,1,2...8]

    const reduced = map([M, V], ([m, v]) => {
        const A = symSquaredMatrix(m)
        const x = vector(v)
        return A.multVec(x).array
    })

    expect(reduced.count).toBe(3)
    expect(reduced.itemSize).toBe(3)

    const sol = [
        [5, 11, 14],
        [86, 107, 119],
        [275, 311, 332],
    ]

    reduced.forEach((v, i) => {
        expect(v).toEqual(sol[i])
    })
})

test('views complex operation', () => {
    const M = Serie.create({
        array: new Array(27).fill(0).map((_, i) => i),
        itemSize: 9,
    }) // [0,1,2...17]
    const V = Serie.create({
        array: new Array(9).fill(0).map((_, i) => i),
        itemSize: 3,
    }) // [0,1,2...8]

    const reduced = map([M, V], ([m, v]) => {
        const A = squaredMatrix(m)
        return A.transpose().multVec(vector(v).normalize()).array
    })

    expect(reduced.count).toBe(3)
    expect(reduced.itemSize).toBe(3)

    const sol = [
        6.7082037925720215, 8.049844741821289, 9.391485214233398,
        21.21320343017578, 22.910259246826172, 24.607315063476562,
        36.619667053222656, 38.34005355834961, 40.06044006347656,
    ]

    reduced.array.forEach((v, i) => {
        expect(v).toBeCloseTo(sol[i])
    })
})

// NOT using math views (matrix and vector)
test('views superposition', () => {
    const S1 = Serie.create({
        array: new Array(18).fill(0).map((_, i) => i),
        itemSize: 6,
    })
    const S2 = Serie.create({
        array: new Array(18).fill(0).map((_, i) => i + 1),
        itemSize: 6,
    })
    const S3 = Serie.create({
        array: new Array(18).fill(0).map((_, i) => i + 2),
        itemSize: 6,
    })

    const alpha = [1, 2, 3]

    const reduced = map([S1, S2, S3], (stresses) => {
        const s = stresses.map((stress, i) =>
            stress.map((value) => value * alpha[i]),
        )
        return s.reduce(
            (cur, s) => cur.map((v, j) => v + s[j]),
            [0, 0, 0, 0, 0, 0],
        )
    })

    const sol = [
        8, 14, 20, 26, 32, 38, 44, 50, 56, 62, 68, 74, 80, 86, 92, 98, 104, 110,
    ]
    reduced.array.forEach((v, i) => expect(v).toEqual(sol[i]))
})
