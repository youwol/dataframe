const df = require('../dist/@youwol/dataframe')

const S1 = df.Serie.create({ array: [1,2,3,4], itemSize: 1 })
const S2 = df.Serie.create({ array: [1,2,3,4], itemSize: 1 })
const S3 = df.Serie.create({ array: [1,2,3,4], itemSize: 1 })

const r = df.reduce([S1, S2, S3], (cur, [s1, s2, s3]) => [cur[0]+s1, cur[1]+s2, cur[2]+s3], [0,1,2] )

console.log(r) // [ 10, 11, 12 ]