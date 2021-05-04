/**
 * In mathematics and statistics, the arithmetic mean, or simply the mean or average when the
 * context is clear, is the central tendency of a collection of numbers taken as the sum of the
 * numbers divided by the size of the collection. The collection is often the sample space of an
 * experiment. The term "arithmetic mean" is preferred in mathematics and statistics because it
 * helps distinguish it from other means such as the geometric and harmonic mean.
 * @category Stats
 */
export declare function mean(attribute: number[]): number;
/**
 * In statistics and probability theory, standard deviation (represented by the symbol sigma)
 * shows how much variation or "dispersion" exists from the average (mean, or expected value).
 * A low standard deviation indicates that the data points tend to be very close to the mean; high
 * standard deviation indicates that the data points are spread out over a large range of values.
 *
 * The standard deviation of a random variable, statistical population, data set, or probability distribution
 * is the square root of its variance. It is algebraically simpler though practically less robust
 * than the average absolute deviation. A useful property of standard deviation is that, unlike
 * variance, it is expressed in the same units as the data.
 * @category Stats
 */
export declare function stdev(attribute: number[]): number;
/**
 * In mathematics, the root mean square (abbreviated RMS or rms), also known as the quadratic mean,
 * is a statistical measure of the magnitude of a varying quantity. It is especially useful when variates
 * are positive and negative, e.g., sinusoids. RMS is used in various fields, including electrical engineering.
 *
 * It can be calculated for a series of discrete values or for a continuously varying function.
 * The name comes from the fact that it is the square root of the mean of the squares of the values.
 * It is a special case of the generalized mean with the exponent p = 2.
 * @category Stats
 */
export declare function rms(attribute: number[]): number;
/**
 * @category Stats
 */
export declare function median(a: number[], doSort?: boolean): number;
/**
 * Detect the outlier boundaries of an array of number.
 *
 * The algorithm is as follow:
 * 1. First, detect points that are close to the faults at threshold*mean_edge_length.
 * 2. Second, apply mustache times the interquartile range to detect outliers.
 * 3. return an array of boolean with true values for outliers
 *
 * **From WIKIPEDIA**:
 * In descriptive statistics, the interquartile range (IQR), also called the midspread or
 * middle fifty, is a measure of statistical dispersion, being equal to the difference
 * between the upper and lower quartiles, `IQR = Q3 − Q1`. In other words, the IQR
 * is the 1st Quartile subtracted from the 3rd Quartile; these quartiles can be clearly
 * seen on a box plot on the data. It is a trimmed estimator, defined as the 25% trimmed
 * mid-range, and is the most significant basic robust measure of scale.
 *
 * @param arr The array of number
 * @param mustache The statistical distance for which a value is considered as outlier.
 * Default value is 6.
 * @returns An array of boolean values describing outliers
 * @category Stats
 */
export declare function iqr(arr: number[], mustache: number): boolean[];
/**
 * Get the percentile of an array.
 *
 * @param arr The array of number
 * @param percent The percentile to use
 * @returns The percentile of the array
 * @category Stats
 */
export declare function percentile(arr: number[], percent: number): number;
