/**
 * @param mat The symmetric matrix in a packed array of the form
 * of 6 components [xx, xy, xz, yy, yz, zz] or 9 components
 * [xx, xy, xz, yx, yy, yz, zx, zy, zz]
 * @returns {values, vectors} where values=[v1, v2, v3] and
 * vectors=[v1x, v1y, v1z,  v2x, v2y, v2z,  v3x, v3y, v3z]
 * @note Eigen values and vectors are ordered from the highest to the lowest
 *
 * @category Eigen
 */
export declare function eigen(mat: Array<number>): {
    values: number[];
    vectors: number[];
};
/**
 * Computes the eigen values and eigen vectors of a semi definite symmetric matrix
 * @param {number[]} mat Format: [00, 01, 02, 11, 12, 22]
 * @returns {{number[], Array.<Array.<number>>}} The eigen values and eigen vectors
 * @note Eigen -values and -vectors are ordered from the highest to the lowest
 * @see [[eigen]]
 * @category Eigen
 * @ignore
 */
export declare class Eigen {
    private eigenValues;
    private eigenVectors;
    constructor();
    /**
     * @see eigen()
     */
    compute(mat: Array<number>): any;
    vector(i: number): Array<number>;
    get vectors(): Array<number>;
    value(i: number): number;
    get values(): Array<number>;
}
