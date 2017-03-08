// import React from 'react'; import webpack from 'webpack' import devConfig
// from '../webpack.config' import ReactDOMServer from 'react-dom/server';
// import App from '../common/components/App'; import template from
// '../common/template';

const React = require('react')
const webpack = require('webpack')
const devConfig = require('../webpack.config')
const ReactDOMServer = require('react-dom/server')
import App from '../common/components/App'; //const App = require('../common/components/App');
import template from './template';
var express = require('express'); 
var app = express();
var devExpressServer = express();
const compiler = webpack(devConfig);

devExpressServer.use(require('webpack-dev-middleware')(compiler, {
  publicPath: devConfig.output.publicPath,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  stats: {
    colors: true
  },
  //hot: true
}));

devExpressServer.use(require('webpack-hot-middleware')(compiler, {}));

devExpressServer.get('/', function (req, res) {

  const appString = ReactDOMServer.renderToString( < App / > );
  const page = template({
    body: appString,
    title: 'Hello World from the server'
  });
  res
    .send(page)
    .status(200);
});

devExpressServer.listen(3000, require("ip").address(), function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('Listening at http://localhost:3000/');
});