const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

// http://jlongster.com/Backend-Apps-with-Webpack--Part-I
var nodeExternals = require('webpack-node-externals')




var config = {
    target: 'node',
    cache: false,
    context: __dirname,
 
    entry: [
        //'webpack/hot/poll',
        '../src/server/index.js'
    ],
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'server.js',
        publicPath: '/www/'
    },
    externals: [nodeExternals({
        whitelist: ['webpack/hot/poll?1000']
    })],

    devtool: 'source-map',
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
                    } ]
                })

            }
        ]


    },
    plugins: [
        new webpack.DefinePlugin({
            __CLIENT__: false,
            __SERVER__: true,
            __PRODUCTION__: false,
            __DEV__: true,
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                WEBPACK: true
            }
        }),
        //new webpack.HotModuleReplacementPlugin(),
        new webpack.ExtendedAPIPlugin(), // for __webpack_hash__
        new ExtractTextPlugin('../www/[name].css')
    ],
    resolve: {
        modules: [
            path.resolve(__dirname, '../node_modules'),
            'web_modules'
        ],
        alias: {
            src: path.resolve(__dirname, '../src'),
        },
        extensions: ['.json', '.js']
    }
};
module.exports = config