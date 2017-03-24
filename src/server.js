const React = require('react')
const ReactDOMServer = require('react-dom/server')
import App from 'src/components/App';
import Template from './components/Template';
var log = require('debug-logger')('app:page-server');
var path = require('path');
import {Switch, StaticRouter, Route} from 'react-router-dom';
import routes from './routes';

var koa = require('koa');
var proxy = require('koa-proxy');
var mount = require('koa-mount');

const app = new koa();
const assets = new koa();
var router = require('koa-router')();
const serve = require('koa-static');
var staticCache = require('koa-static-cache')

// var jsdom = require('jsdom');
// global.document = jsdom.jsdom('<!DOCTYPE html><head></head><html><body></body></html>');
// global.window = document.defaultView;
// global.window.document = global.document;
// // fix
// global.self = global.window;
console.log(path.resolve(__dirname, '../public'));
console.log(__dirname);
app.use(staticCache(path.resolve(__dirname, '../public'), {
    maxAge: 365 * 24 * 60 * 60
}))

assets.use(serve(path.resolve(__dirname, '../public')));

app.use(mount('/static', assets))

router.get('/*', function(ctx, next) {
    const context = {};
    const appString = ReactDOMServer.renderToString(
        <StaticRouter location={ctx.url} context={context}>
            {routes}
        </StaticRouter>
    );
    const page = '<!DOCTYPE html>' + ReactDOMServer.renderToString(<Template title='Hello World from the server' content={appString}/>)
    if (context.url) {
        ctx.status = 302;
    } else {
        ctx.body = page;
        ctx.status = 200;
    }
});
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, "localhost", function(err) {
    if (err) {
        return log.error(err);
    }
    log.log('Listening at http://localhost:3000/');
});

if (__DEV__) {
    if (module.hot) {
        log.info('Server-side HMR enable')

        module.hot.accept('src/components/App', () => {
            require('src/components/App') // eslint-disable-line global-require
        })
        module.hot.addStatusHandler((status) => {
            if (status === 'abort') {
                setTimeout(() => process.exit(0), 0)
            }
        })
    }
}
