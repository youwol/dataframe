declare type V2 = [number, number];
declare type V3 = [number, number, number];
/**
 *
 * @param x Where to evaluate
 * @param x1 min point
 * @param x2 max point
 * @param q00 scalar value at x1
 * @param q01 scalar value at x2
 * @category Interpolation
 */
export declare function lerp(x: number, x1: number, x2: number, q00: number, q01: number): number;
/**
 * Bilinear interpolation
 * @param p Where to evaluate
 * @param p1 min point
 * @param p2 max point
 * @param q11 scalar value at (x1, y1)
 * @param q12 scalar value at (x1, y2)
 * @param q21 scalar value at (x2, y1)
 * @param q22 scalar value at (x2, y2)
 * @category Interpolation
 */
export declare function biLerp(p: V2, p1: V2, p2: V2, q11: number, q12: number, q21: number, q22: number): number;
/**
 * Trilinear interpolation
 * @param p Where to evaluate
 * @param p1 min point
 * @param p2 max point
 * @param q000 scalar value at (0,0,0)
 * @param q001 scalar value at (0,0,1)
 * @param q010 scalar value at (0,1,0)
 * @param q011 scalar value at (0,1,1)
 * @param q100 scalar value at (1,0,0)
 * @param q101 scalar value at (1,0,1)
 * @param q110 scalar value at (1,1,0)
 * @param q111 scalar value at (1,1,1)
 * @category Interpolation
 */
export declare function triLerp(p: V3, p1: V3, p2: V3, q000: number, q001: number, q010: number, q011: number, q100: number, q101: number, q110: number, q111: number): number;
/**
 * @param q1 Either a number or an array of size 3, 6 or 9 defined at point p1
 * @param q2 Either a number or an array of size 3, 6 or 9 defined at point p2
 * @param q3 Either a number or an array of size 3, 6 or 9 defined at point p3
 * @category Interpolation
 */
export declare function triangleLerp2D(p: V2, p1: V2, p2: V2, p3: V2, q1: any, q2: any, q3: any): any;
/**
 * @param q1 Either a number or an array of size 3, 6 or 9 defined at point p1
 * @param q2 Either a number or an array of size 3, 6 or 9 defined at point p2
 * @param q3 Either a number or an array of size 3, 6 or 9 defined at point p3
 * @category Interpolation
 */
export declare function triangleLerp3D(p: V3, p1: V3, p2: V3, p3: V3, q1: any, q2: any, q3: any): any;
/**
 * @param q1 Either a number or an array of size 3, 6 or 9 defined at point p1
 * @param q2 Either a number or an array of size 3, 6 or 9 defined at point p2
 * @param q3 Either a number or an array of size 3, 6 or 9 defined at point p3
 * @param q4 Either a number or an array of size 3, 6 or 9 defined at point p4
 * @category Interpolation
 */
export declare function tetraLerp(p: V3, p1: V3, p2: V3, p3: V3, p4: V3, q1: any, q2: any, q3: any, q4: any): any;
/**
 * The direction for function [[meshInterpolate]]
 * @category Interpolation
 */
export declare enum InterpolateDirection {
    INCREASING = 0,
    DECREASING = 1
}
/**
 * Convert an attribute defined at combel of dim A to
 * a new attribute defined at a combel of dim B using a topological relationship.
 * If A<B, the direction is INCREASING (A -> B).
 *
 * A combel made of 1 vertex (also called node) is of dim 0 (0-dimensional space).
 *
 * A combel made of 2 connected vertices is a segment and is of dim 1 (1-dimensional space or line).
 *
 * A combel made of 3 or more connected planar vertices (convex polygon) is of dim 2 (2-dimensional space or surface).
 *
 * A combel made of 4 or more non-planar connected vertices is a tetrahedron and is of dim 3 (3-dimensional space or voluime).
 *
 * @param attribute The starting attribute (combel A). An attribute can be an array of number or
 * an array of array of number (). For example:
 * <ul>
 * <li> scalar  : [0, 0, 0 ...]
 * <li> vector2 : [[0,0], [0,0] ...]
 * <li> vector3 : [[0,0,0], [0,0,0] ...]
 * <li> smatrix3: [[0,0,0,0,0,0], [0,0,0,0,0,0] ...] symetric 3x3 matrices
 * <li> matrix3 : [[0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0] ...] full 3x3 matrices
 * <li> Any Array<Array<number>>
 * </ul>
 * The return attribute is noted combel B.
 * @param topology The topological relationship bitween the underlaying combels A and B.
 * Topology is given as an array of arrays or an array of number (example: [[0,1,2], [0,2,6], [10,34], [1,8,9,4]...]).
 * For the later (array of number) you can provide the chunk size (default 3 for 3 nodes therefore for triangles)
 * of the combels.
 * @param size The chunk size of topology if an array of number is provided. Default value is 3
 * @param direction The direction of the interpolation. INCREASING direction means from combels
 * of lower to higher degree (e.g., from vertex to triangle or to segment or to tetrahedron or to ...).
 * DECREASING direction means from combels of higher to lower degree (e.g., from triangle to vertex).
 * Default value is INCREASING direction
 * @returns The new interpolated attribute for the underlaying combels defined in topology
 * @note We only interpolate from combel of dim 0 (vertex) to dim N, and from dim N to dim 0,
 * never from dim N to dim M.
 * @example
 * ```js
 * // interpolate node attributes to 2 triangles and 1 segment
 * // The first triangle is made of nodes index 0, 2 and 1
 * // The second triangle is made of nodes index 0, 3 and 2
 * // The segment is made of nodes index 2 and 3
 * const nodes    = [1.2, 5.9, 4.2, 7.2]
 * const topology = [[0,2,1], [0,3,2], [2,3]] // 2 triangles and 1 segment
 * const result   = interpolate({attribute: nodes, topology, direction: Direction.INCREASING})
 * // Return the value for the first and second triangle and the segment
 * // Expected return values [3.7666, 4.2, 6.2]
 * //   3.7666 = (1.2 + 4.2 + 5.9) / 3
 * //   4.2    = (1.2 + 7.2 + 4.2) / 3
 * //   6.2    = (4.2 + 7.2) / 2
 * ```
 * @category Interpolation
 */
export declare function meshInterpolate({ attribute, topology, size, direction }: {
    attribute: Array<any>;
    topology: Array<any>;
    size?: number;
    direction?: InterpolateDirection;
}): Array<any>;
export {};
