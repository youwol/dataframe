const DF = require('../dist/@youwol/dataframe')

const df = DF.DataFrame.create({
    series: {
        positions: DF.Serie.create({
            array: [1, 2, 3, 1, 4, 3, 7, 2, 5],
            itemSize: 3,
        })
    },
})

console.log(df)

const mng = new DF.Manager(df, {
    decomposers: [
        new DF.FunctionalDecomposer(1, 'f', df => {
            const fct = (x, y, z) => x ** 2 - y ** 3 + Math.abs(z)
            const positions = df.series['positions']
            return positions.map((p) => fct(p[0], p[1], p[2]))
        }),
    ],
    dimension: 3
})
