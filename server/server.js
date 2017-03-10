 

const React = require('react')
const webpack = require('webpack')
const devConfig = require('../webpack.config')
const ReactDOMServer = require('react-dom/server')
import App from '../common/components/App'; //const App = require('../common/components/App');
import Template from './template';
const devServer = require('webpack-dev-server');
var express = require('express');
var path = require('path');
var app = express();
var devExpressServer = express();
const compiler = webpack(devConfig);

 
devExpressServer.use(require('webpack-dev-middleware')(compiler, {
  publicPath: devConfig.output.publicPath,
  hot: true,
  stats: { 
    colors: true, 
    hash: true, 
    chunks: false,
    chunkModules: false
  }
}));

devExpressServer.use(require('webpack-hot-middleware')(compiler, {}));

devExpressServer.get('/', function (req, res) {
  const NewApp = require('../common/components/App');
  const appString = ReactDOMServer.renderToString(<NewApp/>);

  console.log(appString);
  const page = '<!DOCTYPE html>' + ReactDOMServer.renderToString(<Template title='Hello World from the server' content={appString}/>)

  res
    .send(page)
    .status(200);
});
 
devExpressServer.listen(3000, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});
  