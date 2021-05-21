import { Serie } from '../lib'
import { createArray } from '../lib/utils'

Serie.create( {array: createArray(10, i=>i), itemSize: 3})
