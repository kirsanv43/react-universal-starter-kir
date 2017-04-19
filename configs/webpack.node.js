const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

// http://jlongster.com/Backend-Apps-with-Webpack--Part-I
const nodeExternals = require('webpack-node-externals');


const config = require('./webpack.common.js');

const nodeConfig = {
  target: 'node',
  cache: false,
  context: __dirname,

  entry: [
    '../src/page-server/index.js',
  ],
  externals: [nodeExternals({
    whitelist: ['webpack/hot/poll?1000'],
  })],

  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true,
      __PRODUCTION__: true,
      __DEV__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        WEBPACK: true,
      },
    }),
        // new webpack.ExtendedAPIPlugin(), // for __webpack_hash__
    new ExtractTextPlugin('../public/[name].css'),
  ],
};

module.exports = Object.assign(config, nodeConfig);
