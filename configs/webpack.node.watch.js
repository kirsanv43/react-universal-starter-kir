const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('./webpack.node.js');

config.cache = true;

config.entry.unshift(
    'webpack/hot/poll?1000',
);


config.plugins = [

  new webpack.DefinePlugin({
    IS_CLIENT: false,
    IS_SERVER: true,
    IS_PRODUCTION: false,
    IS_DEV: true,
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new ExtractTextPlugin('../public/[name].css'),
];
module.exports = config;
