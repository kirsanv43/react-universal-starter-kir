const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

// http://jlongster.com/Backend-Apps-with-Webpack--Part-I
var nodeExternals = require('webpack-node-externals')



var config = require('./webpack.common.js');

var webConfig = {
    target: 'web', 
    context: __dirname,

    entry: [
        '../src/client.js'
    ],
    output: {
		path: path.join(__dirname, '../www'),
		filename: 'client.js',
		chunkFilename: '[name].[id].js'
	},
 
    plugins: [
        new webpack.DefinePlugin({
            __CLIENT__: true, __SERVER__: false, __PRODUCTION__: true, __DEV__: false,
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            }
        }),
        //new webpack.ExtendedAPIPlugin(), // for __webpack_hash__
        new ExtractTextPlugin('../www/[name].css')
    ]
};
module.exports = Object.assign(config, webConfig);