/**
 * ## Manager: a first example
 * Using `Manager` with `DataFrame` to access implicit decompositions of series
 *
 * ```ts
 * import { DataFrame, Serie, Manager } from '@youwol/dataframe'
 * import {
 *   PositionDecomposer, ComponentDecomposer,
 *   EigenValuesDecomposer, EigenVectorsDecomposer
 * } from '@youwol/math/decompose'
 *
 * const  df = new DataFrale.create({
 *   series: {
 *       S: Serie.create({
 *           array: new Array(18).fill(0).map((v,i)=>i*2),
 *           itemSize: 6
 *       })
 *   }
 * })
 *
 * const mng = new Manager(df, {
 *   decomposers: [
 *       new PositionDecomposer,
 *       new ComponentDecomposer,
 *       new EigenValuesDecomposer,
 *       new EigenVectorsDecomposer
 *   ],
 *   dimension: 3
 * })
 *
 * // Gather possible scalar series name
 * console.log( mng.names(1) )
 * // Display: Sxx, Sxy, Sxz, Syy, Syz, Szz, S1, S2, S3
 *
 * // Gather possible vector3 series name
 * console.log( mng.names(3) )
 * // Display: S1, S2, S3
 *
 * const scalar = mng.serie(1, 'S1')
 * const vector = mng.serie(3, 'S1')
 * ```
 *
 * ## Manager: a second example
 * ```ts
 * import { createSerie, DataFrame } from '@youwol/dataframe'
 * import {
 *   AttributeManager, PositionDecomposer,
 *   EigenValuesDecomposer, EigenVectorsDecomposer,
 *   NormalsDecomposer, FunctionalDecomposer
 * } from '@youwol/attribute'
 *
 * const df = new DataFrame({
 *   positions: createSerie( {data: [...], itemSize: 3} ),
 *   indices:   createSerie( {data: [...], itemSize: 3} ),
 *   a: createSerie( {data: [...], itemSize: 1} ),
 *   U: createSerie( {data: [...], itemSize: 3} ),
 *   S: createSerie( {data: [...], itemSize: 6} )
 * })
 *
 * const mng = new AttributeManager(df, {
 *   decomposers= [
 *       new PositionDecomposer,
 *       new ComponentDecomposer,
 *       new EigenValuesDecomposer,
 *       new EigenVectorDecomposer,
 *       new NormalsDecomposer('n'),
 *       new FunctionalDecomposer(1, 'MyAttr', (df: DataFrame) => {
 *           const fct = (x,y,z) => x**2 - y***3 + Math.abs(z)
 *           const positions = df.get('positions')
 *           positions.map( p => fct(p[0], p[1], p[2]) )
 *       })
 *   ],
 *   dimension: 3
 * })
 *
 * // ['x','y','z',
 * //  'a',
 * //  'Ux','Uy','Uz',
 * //  'Sxx','Sxy','Sxz','Syy', 'Syz','Szz',
 * //  'S1', 'S2', 'S3',
 * //  'nx', 'ny', 'nz',
 * //  'MyAttr'
 * // ]
 * console.log( mng.names(1) ) // itemSize=1
 *
 * // ['positions','U', 'S1', 'S2', 'S3', 'n']
 * console.log( mng.names(3) ) // itemSize=3
 *
 * // ['S']
 * console.log( mng.names(6) ) // itemSize=6
 *
 * // [] nothing...
 * console.log( mng.names(9) ) // itemSize=9
 *
 * // First eigen value
 * console.assert( mng.serie(1, 'S1') !== undefined )
 *
 * // First eigen vector
 * console.assert( mng.serie(3, 'S1') !== undefined )
 *
 * // z-component of the normals
 * console.assert( mng.serie(1, 'nz') !== undefined )
 *
 * // normal vectors
 * console.assert( mng.serie(3, 'n') !== undefined )
 * ```
 *
 * ## Manager: a third example
 * Create a decomposer in order to have the norm of any vector3 series
 * ```ts
 * import { DataFrame, ASerie } from '@youwol/dataframe'
 * import { norm }              from '@youwol/math'
 * import { Decomposer }        from '@youwol/attribute'
 *
 * class VectorNormDecomposer implements Decomposer {
 *   names(df: DataFrame, itemSize: number, serie: ASerie, name: string) {
 *       if (serie.itemSize !== 3 || itemSize !== 1) return []
 *       return [name] // same name as the vector3 but will be a scalar (itemSize=1)
 *   }
 *
 *   serie(df: DataFrame, itemSize: number, name: string): ASerie {
 *       if (itemSize !== 1) return undefined
 *
 *       let serie = df.get(name) // since same name
 *       if (serie === undefined)  return undefined
 *       if (serie.itemSize !== 3) return undefined
 *
 *       return norm(serie).setName(name)
 *   }
 * }
 * ```
 */
export namespace Example_6 {}
