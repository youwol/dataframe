import { sub, mult } from "../math"
import { ASerie } from "../serie"
import { mean } from "./mean"

/**
 * Compute covariance with Series.
 * 
 * Except from Wikipedia:
 * > In probability theory and statistics, covariance is a measure of the joint variability
 * of two random variables. If the greater values of one variable mainly correspond with
 * the greater values of the other variable, and the same holds for the lesser values
 * (that is, the variables tend to show similar behavior), the covariance is positive.
 * In the opposite case, when the greater values of one variable mainly correspond to
 * the lesser values of the other, (that is, the variables tend to show opposite behavior),
 * the covariance is negative. The sign of the covariance therefore shows the tendency in the
 * linear relationship between the variables. The magnitude of the covariance is not easy to
 * interpret because it is not normalized and hence depends on the magnitudes of the variables.
 * The normalized version of the covariance, the correlation coefficient, however, shows
 * by its magnitude the strength of the linear relation.
 * @category Stats
 */
export const covariance = (x: ASerie, y: ASerie): number => {
    if (x.length!==y.length) throw new Error('x and y must have the same length')
    if (x.itemSize !==1) throw new Error('x must have itemSize = 1')
    if (y.itemSize !==1) throw new Error('y must have itemSize = 1')

    const N = x.length
    const xb = mean(x) as number
    const yb = mean(y) as number
    return mult(sub(x,xb), sub(y,yb)).array.reduce( (acc, value) => acc+value/N, 0 )
}
