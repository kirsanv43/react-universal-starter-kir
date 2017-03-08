const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        entry: [
            'webpack-hot-middleware/client',
            './common/index.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: ['react-hot-loader', 'babel-loader'],
                exclude: /node_modules/,
            },
            {
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

/*

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
                        //"react-hot-loader/babel",
                    ]
                }
                */