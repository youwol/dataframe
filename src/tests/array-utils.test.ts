import { array } from "../lib/utils/arrayUtils"
import { createArray, createTyped } from "../lib/utils/create"

test('test min array', () => {
    let a = createArray(10, i => i+2)
    console.log(a)
    expect(array.min(a)).toEqual(2)
})

test('test max array', () => {
    let a = createArray(10, i => i+2)
    expect(array.max(a)).toEqual(11)
})

test('test min/max array', () => {
    let a = createArray(10, i => i+2)
    expect(array.minMax(a)).toEqual([2, 11])
})

test('test normalize array', () => {
    let a = createArray(4, i => i)
    expect(array.normalize(a)).toEqual([0, 1/3, 2/3, 3/3])
})

test('test scale array', () => {
    let a = createArray(4, i => i)
    expect(array.scale(a, 10)).toEqual([0, 10, 20, 30])
})

test('test detect NaN in array', () => {
    let a = [1, Number.NaN, 2, 3, Number.NaN]
    expect(array.dectectNan(a)).toEqual([1, 4])
})

test('test flatten array', () => {
    let a = [[1,2,3], [4,5,6]]
    expect(array.flatten(a)).toEqual([1,2,3,4,5,6])
})
