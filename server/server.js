// import React from 'react'; import webpack from 'webpack' import devConfig
// from '../webpack.config' import ReactDOMServer from 'react-dom/server';
// import App from '../common/components/App'; import template from
// '../common/template';

const React = require('react')
const webpack = require('webpack')
const devConfig = require('../webpack.config')
const ReactDOMServer = require('react-dom/server')
const App = require('../common/components/App');
const template = require('../common/template');
const devServer = require('webpack-dev-server');
var express = require('express');
var http = require('http');
var app = express();
var devExpressServer = express();
const compiler = webpack(devConfig);

// const devServer1 = new devServer(compiler, {
//   publicPath: devConfig.output.publicPath,
//   headers: {
//     'Access-Control-Allow-Origin': '*'
//   },
//   hot: true,
//   port: 3001,
//   public: '0.0.0.0:3001',
//   serverSideRender: true,
//   stats: {
//     assets: false,
//     colors: true,
//     version: false,
//     hash: false,
//     timings: false,
//     chunks: false,
//     chunkModules: false
//   }
// });
 

devExpressServer.use(require('webpack-dev-middleware')(compiler, {
  publicPath: devConfig.output.publicPath,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  public:'0.0.0.0:9081',
 //inline: true,
    hot: true,
  //   quiet: false,
  //   noInfo: true,
   stats: {
  //   assets: false,
      colors: true,
  //   version: false,
  //   hash: false,
  //   timings: false,
  //   chunks: false,
  //   chunkModules: false
   }
}));

devExpressServer.use(require('webpack-hot-middleware')(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
})); 
  


devExpressServer.get('/', function (req, res) {

  const appString = ReactDOMServer.renderToString( <App/> );
  const page = template({
    body: appString,
    title: 'Hello World from the server'
  });
  res
    .send(page)
    .status(200);
});

  // devServer1.listen(3000, function() {
  //   console.log("Listening on %j", devServer1);
  // });

//var server = http.createServer(devExpressServer);
 devExpressServer.listen(3000, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
}); 
/*router.get('/', function (ctx, next) {
  const appString = ReactDOMServer.renderToString( < App / > );
  const page = template({
    body: appString,
    title: 'Hello World from the server'
  });
  ctx.body = page
  ctx.status = 200;
});
 */