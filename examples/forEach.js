const df = require('../dist/@youwol/dataframe')

const array = [1,2,3,4]

const S1 = df.Serie.create({ array, itemSize: 1 })
const S2 = df.Serie.create({ array, itemSize: 1 })
const S3 = df.Serie.create({ array, itemSize: 1 })

df.forEach([S1, S2, S3], ([s1, s2, s3]) => {
    console.log(s1, s2, s3)
})

// create a serie with itemSize = 3
const s = df.map([S1, S2, S3], ([s1, s2, s3]) => [s1, s2, s3] )
