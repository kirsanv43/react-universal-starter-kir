const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

// http://jlongster.com/Backend-Apps-with-Webpack--Part-I
var nodeExternals = require('webpack-node-externals')



var config = require('./webpack.web.js');
config.entry.unshift(
   'react-hot-loader/patch',
        // activate HMR for React

        'webpack-dev-server/client?http://localhost:3003',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint

        'webpack/hot/only-dev-server'
);
config.module.rules =
[{
                test: /\.jsx?$/,
                use: ['react-hot-loader/webpack', {
                    loader: 'babel-loader',
                    query: {
                        babelrc: false,
                        presets: [
                            "es2015",
                            "stage-2",
                            "react"
                        ],
                        plugins: ["transform-decorators-legacy", "transform-react-display-name", "add-module-exports"]

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
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader?sourceMap&&modules&&importLoaders=1&localIdentName=[name]---[local]---[hash:base64:5]" // translates CSS into CommonJS
                    }
                ]
            }
        ]
config.output.publicPath = `http://localhost:${3003}/`
config.devServer = {
  publicPath: "http://localhost:3003/",
  contentBase: "public",
  hot: true,
  inline: false,
  lazy: false,
  quiet: true,
  noInfo: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
  host: "localhost",
  port: 3003
}

var webDevConfig = {
    plugins: [
        new webpack.DefinePlugin({
            __CLIENT__: true, __SERVER__: false, __PRODUCTION__: false, __DEV__: true,
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                WEBPACK: true
            }
        }),
		  new webpack.HotModuleReplacementPlugin(),

         //new webpack.ExtendedAPIPlugin(), // for __webpack_hash__
        //new ExtractTextPlugin('../public/[name].css')
    ]
};
module.exports = Object.assign(config, webDevConfig);
