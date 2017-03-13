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
config.output.publicPath = `http://localhost:${3003}/`
config.devServer = {
  publicPath: "http://localhost:3003/",
  contentBase: "www",
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

         new webpack.ExtendedAPIPlugin(), // for __webpack_hash__
        new ExtractTextPlugin('../www/[name].css')
    ]
};
module.exports = Object.assign(config, webDevConfig);