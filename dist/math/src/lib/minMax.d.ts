/**
 * @example
 * ```ts
 * const array = [1,6,3,2,8,9,5]
 * const mm = new MinMax(array)
 * console.log( mm.min ) // 1
 * console.log( mm.max ) // 9
 *
 * mm.reset()
 * mm.add([7,2,0,6])
 * mm.add(8)
 * console.log( mm.min ) // 0
 * console.log( mm.max ) // 8
 * ```
 */
export declare class MinMax {
    private m_;
    constructor(values?: any);
    reset(): void;
    get min(): number;
    get max(): number;
    get length(): number;
    get value(): number[];
    add(values: any): this;
}
