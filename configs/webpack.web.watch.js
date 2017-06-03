const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const nodeExternals = require('webpack-node-externals');


const config = require('./webpack.web.js');

config.entry.unshift('webpack/hot/only-dev-server');

config.entry.unshift('webpack-dev-server/client?http://localhost:3003');

config.entry.unshift('react-hot-loader/patch');

config.module.rules =
[{
  test: /\.jsx?$/,
  use: ['react-hot-loader/webpack', {
    loader: 'babel-loader',
    query: {
      babelrc: false,
      presets: [
        'es2015',
        'stage-2',
        'react',
      ],
      plugins: ['transform-decorators-legacy', 'transform-react-display-name', 'add-module-exports'],

    },
  }],
  exclude: /node_modules/,
},
{
  test: /\.(gif|ico|jpg|jpeg|png|svg|webp)$/,
  loaders: ['file-loader'],
}, {
  test: /\.(eot|ttf|woff|woff2)(\?.*)?$/,
  loaders: ['file-loader'],
}, {
  test: /\.css$/, 
  use: [{
    loader: 'style-loader',
  },{
    loader: 'css-loader',
  }],
}, {
  test: /\.scss/,
  use: [{
    loader: 'style-loader',
  },{
    loader: 'css-loader',
  }, {
    loader: 'sass-loader',
  }],
}];
config.output.publicPath = `http://localhost:${3003}/`;
config.devServer = {
  publicPath: 'http://localhost:3003/',
  contentBase: 'public',
  hot: true,
  inline: false,
  lazy: false,
  quiet: true,
  noInfo: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
  host: 'localhost',
  port: 3003,
};

const webDevConfig = {
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __PRODUCTION__: false,
      __DEV__: true,
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        WEBPACK: true,
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = Object.assign(config, webDevConfig);
