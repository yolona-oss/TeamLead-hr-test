const path = require('path')
// const ESLintPlugin = require('eslint-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
        entry: './build/index.js',
        module: {
                rules: [
                        {
                                test: /\.(ts|js)x?$/,
                                exclude: /node_modules/,
                                loader: 'babel-loader',
                        },
                        { test: /\.(js)$/, use: 'babel-loader' }
                ]
        },
        resolve: {
                extensions: ['.ts', '.js'],
                plugins: [
                        new TsconfigPathsPlugin({})
                ]
        },

        output: {
                path: path.resolve(__dirname, "../static/"),
                filename: 'bundle.js'
        },
        plugins: [
                // new ESLintPlugin({
                //         extensions: ['js', 'ts']
                // })
                // new HtmlWebpackPlugin()
        ],
        mode: 'development' // production
};
