const React = require('react');
const ReactDOMServer = require('react-dom/server');

import App from '../components/App';
import Template from '../components/Template';
const log = require('debug-logger')('app:page-server');
const path = require('path');

import createHistory from 'history/createMemoryHistory';

import { matchPath } from 'react-router';
import { Switch, StaticRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
const koa = require('koa');
const proxy = require('koa-proxy');
const mount = require('koa-mount');

import renderRoutes from '../utils/renderRoutes';
const app = new koa();
const assets = new koa();
const router = require('koa-router')();
const serve = require('koa-static');
const staticCache = require('koa-static-cache');

import createAppStore from '../redux/createAppStore';
let routes = require('../routes');

app.use(staticCache(path.resolve(__dirname, '../public'), {
  maxAge: 365 * 24 * 60 * 60,
}));

assets.use(serve(path.resolve(__dirname, '../public')));
const promiseAllWrapper = promises => {
  return new Promise((success, reject) => {
    Promise.all(promises).then(data => {
      console.log('success!!!!!!!!!');
      success(data);
    }).catch(error => reject(error));
  });
};

app.use(mount('/static', assets));

router.get('/*', async (ctx, next) => {
  const context = {};
  let initialState = { filter: { qwe: 'www' } };
  const appStore = createAppStore(createHistory(), initialState);

  console.log(appStore);
  appStore.dispatch({ type: 'INCREASE' });
  const promises = [];

  routes.some(route => {
    const match = matchPath(ctx.url, route);

    if (match && route.preload) promises.push(route.preload(match, appStore.dispatch));

    return match;
  });
  const data = await promiseAllWrapper(promises);

  const appString = ReactDOMServer.renderToString(
    <Provider store={appStore} key="provider">
      <StaticRouter location={ctx.url} context={context}>
        {renderRoutes(routes)}
      </StaticRouter>
    </Provider>,
    );

  initialState = appStore.getState();
  console.log('initialState', initialState);
  const page = `<!DOCTYPE html>${ReactDOMServer.renderToString(<Template title='Hello World from the server' content={appString} initialState={initialState} />)}`;

  if (context.url) {
    ctx.status = 302;
  } else {
    ctx.body = page;
    ctx.status = 200;
  }
});
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, 'localhost', err => {
  if (err) {
    return log.error(err);
  }
  log.log('Listening at http://localhost:3000/');
});
if (__DEV__) {
  if (module.hot) {
    log.info('Server-side HMR enable');

    module.hot.accept('src/routes', () => {
      routes = require('src/routes');
    });
        // module.hot.accept('src/components/App', () => {
        //     require('src/components/App')
        // })

        // module.hot.accept('src/routes/index.js', () => {
        //     require('src/routes/index.js') // eslint-disable-line global-require
        // })

    module.hot.addStatusHandler(status => {
      if (status === 'abort') {
        setTimeout(() => process.exit(0), 0);
      }
    });
  }
}
