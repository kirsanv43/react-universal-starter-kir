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
var webpackDevServer = require('webpack-dev-server');
var app = express();
var expressProxy = require("express-http-proxy");
var devExpressServer = express();
const compiler = webpack(devConfig);


const server = new webpackDevServer(compiler, {
  publicPath: "/static/",
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  host: 'localhost',
  port: 3003,
  inline: true,
  hot: true,
  public: 'localhost:3003',
  stats: {
    progress: true,
    colors: true,
    noInfo: true
  },
  setup: (app) => {
    app.use(require('webpack-hot-middleware')(compiler, {}));
  }
});
server.listen(3003, "localhost", function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('Listening at http://localhost:3003/');
});

var httpProxy = require('http-proxy');

var apiProxy = httpProxy.createProxyServer();

app.get("/static/*", function(req, res){ 
  apiProxy.web(req, res, { target: 'http://localhost:3003/' });
});
 
 
app.get('/', function (req, res) {
  const appString = ReactDOMServer.renderToString( < App / > );
  const page = template({
    body: appString,
    title: 'Hello World from the server'
  });
  res
    .send(page)
    .status(200);
});
app.listen(3000, "localhost", function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('Listening at http://localhost:3000/');
});

// devExpressServer.use(require('webpack-dev-middleware')(compiler, {
//   publicPath: devConfig.output.publicPath,
//   headers: {
//     'Access-Control-Allow-Origin': '*'
//   },
//   host: 'localhost',
//   port: 3003,
//   inline:true,
//   public:'localhost:3003',
//   progress: true,
//   stats: {
//     progress: true,
//     colors: true,
//     noInfo: true
//   }, 
// }));

// devExpressServer.use(require('webpack-hot-middleware')(compiler, {}));

// devExpressServer.get('/', function (req, res) {

//   const appString = ReactDOMServer.renderToString( < App / > );
//   const page = template({
//     body: appString,
//     title: 'Hello World from the server'
//   });
//   res
//     .send(page)
//     .status(200);
// });

// devExpressServer.listen(3000, "localhost", function (err) {
//   if (err) {
//     return console.error(err);
//   }
//   console.log('Listening at http://localhost:3000/');
// });