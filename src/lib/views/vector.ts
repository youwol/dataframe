
/**
 * @brief Create a new [[Vector]]
 * @category Views
 */
export const vector = (v: number[]) => new Vector(v)

/**
 * @category Views
 */
export class Vector {
    constructor(private v: number[]) {
    }

    at(i: number) {
        return this.v[i]
    }

    get length() {
        return this.v.length
    }

    get array() {
        return this.v
    }

    /**
     * Normalize this vector
     * @returns this
     */
    normalize() {
        const n = this.norm()
        this.v = this.v.map( v => v/n )
        return this
    }

    norm() {
        return Math.sqrt(this.v.reduce( (acc, v) => acc + v**2, 0))
    }

    /**
     * 
     * @param s scaling parameter
     * @returns this vector
     */
    mult(s: number) {
        this.v = this.v.map( v => v*s )
        return this
    }

    dot(v: Vector) {
        return this.array.reduce( (acc, a, i) => acc + a*v.array[i] )
    }

    toString() {
        let s = ''
        for (let i=0; i<this.length; ++i) {
            s += this.at(i) + '\t'
        }
        return s
    }
}
