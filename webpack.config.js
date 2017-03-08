const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './common/index.html',
    filename: 'index.html',
    inject: 'body'
})

module.exports = {
    entry: {
        'index': [
             'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:3000',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates


            './common/index.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: "/static/",
    },
    module: {
        loaders: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    babelrc: false,
                    presets: [
                        ["es2015", {
                            "modules": false
                        }],
                        "stage-2",
                        "react"
                    ],
                    plugins: [
                        "react-hot-loader/babel",
                    ]
                }
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.(gif|ico|jpg|jpeg|png|svg|webp)$/,
                loaders: ['file-loader']
            }, {
                test: /\.(eot|ttf|woff|woff2)(\?.*)?$/,
                loaders: ['file-loader']
            }, {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }
        ]


    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),

        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally

        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates

        new webpack.NoEmitOnErrorsPlugin(),
        // do not emit compiled assets that include errors
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                WEBPACK: true
            }
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    }
}