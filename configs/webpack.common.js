const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'react-hot-loader/patch',
        // activate HMR for React

        'webpack-dev-server/client?http://localhost:3003',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint

        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        './common/index.js'
    ],
    output: { 
        path: path.join(__dirname, '../dist'), 
        filename: 'server.js', 
        publicPath: '/www/' 
    }, 
    module: {
        rules: [{
                test: /\.js$/,
                use: ['react-hot-loader/webpack', {
                    loader: 'babel-loader',
                    query: {
                        babelrc: false,
                        presets: [
                            ["es2015", {
                                "modules": false
                            }],
                            "stage-2",
                            "react"
                        ]
                    }
                }, ],
                exclude: /node_modules/,
            },
            {
                test: /\.(gif|ico|jpg|jpeg|png|svg|webp)$/,
                loaders: ['file-loader']
            }, {
                test: /\.(eot|ttf|woff|woff2)(\?.*)?$/,
                loaders: ['file-loader']
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader" // translates CSS into CommonJS
                    }]
                })

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
        modules: [
            path.resolve(__dirname, '../node_modules'),
            'web_modules'
        ],
        alias: {
            src: path.resolve(__dirname, '../src'),
        },
        extensions: ['.js', '.jsx', '.json']

    }

}