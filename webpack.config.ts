import * as path from 'path'
import * as webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
// Do not shorten following import, it will cause webpack.config file to not compile anymore
import { setup } from './src/auto-generated'

const ROOT = path.resolve(__dirname, 'src')
const DESTINATION = path.resolve(__dirname, 'dist')

const webpackConfig: webpack.Configuration = {
    context: ROOT,
    entry: setup.entries,
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: './bundle-analysis.html',
            openAnalyzer: false,
        }),
    ],
    output: {
        path: DESTINATION,
        publicPath: `/api/assets-gateway/raw/package/${setup.assetId}/${setup.version}/dist/`,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        library: `[name]_APIv${setup.apiVersion}`,
        devtoolNamespace: `${setup.name}_APIv${setup.apiVersion}`,
        filename: '[name].js',
        globalObject: `(typeof self !== 'undefined' ? self : this)`,
    },
    resolve: {
        extensions: ['.ts', 'tsx', '.js'],
        modules: [ROOT, 'node_modules'],
    },
    externals: setup.externals,
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{ loader: 'ts-loader' }],
                exclude: /node_modules/,
            },
        ],
    },
    devtool: 'source-map',
}
export default webpackConfig
