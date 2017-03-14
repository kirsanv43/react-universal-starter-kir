const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = require('./webpack.node.js')

config.cache = true;

config.entry.unshift(
    'webpack/hot/poll?1000'
)

config.plugins = [

    new webpack.DefinePlugin({
        __CLIENT__: false,
        __SERVER__: true,
        __PRODUCTION__: false,
        __DEV__: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
     new ExtractTextPlugin('../public/[name].css')
]
module.exports = config