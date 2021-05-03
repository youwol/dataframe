import { ASerie } from "../serie"
import { covariance } from "./covariance"

/**
 * Compute variance of a Serie
 * @category Stats
 */
export const variance = (x: ASerie): number => covariance(x,x)
