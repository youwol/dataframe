import { createArray, createTyped } from "../lib"

test('test create array', () => {
    const array1 = createArray(100, i => i**2)
    expect(array1.length).toEqual(100)
    array1.forEach( (v,i) => expect(v).toEqual(i**2))

    const array2 = createArray(100, 0)
    expect(array2.length).toEqual(100)
    array2.forEach( v => expect(v).toEqual(0))

    const array3 = createArray(100)
    expect(array3.length).toEqual(100)
    array3.forEach( v => expect(v).toBeUndefined())
})

test('test create shared array', () => {
    const sharedArray = createTyped(Float32Array, 100, true)
    expect(sharedArray.length).toEqual(100)
    expect(sharedArray.buffer instanceof SharedArrayBuffer).toBeTruthy()
    sharedArray.forEach( v => expect(v).toEqual(0))
})
