const React = require('react')
const ReactDOMServer = require('react-dom/server')
import App from 'src/components/App';
import Template from './components/Template';
var log = require('debug-logger')('app:page-server');
var path = require('path');

var koa = require('koa');
var proxy = require('koa-proxy');
var mount = require('koa-mount');

const app = new koa();
var router = require('koa-router')();
const serve = require('koa-static');
var staticCache = require('koa-static-cache')

app.use(staticCache(path.join(__dirname, '../../www'), {
    maxAge: 365 * 24 * 60 * 60
}))

app.use(mount('/static', serve('../www')))

router.get('/', function (ctx, next) {
    const appString = ReactDOMServer.renderToString(<App/>);
    const page = '<!DOCTYPE html>' + ReactDOMServer.renderToString(<Template title='Hello World from the server' content={appString}/>)
    ctx.body = page;
    ctx.status = 200;
});
app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000, "localhost", function (err) {
    if (err) {
        return log.error(err);
    }
    log.log('Listening at http://localhost:3000/');
});

if (__DEV__) {
    if (module.hot) {
        log.info('Server-side HMR enable')

        module
            .hot
            .accept('src/components/App', () => {
                require('src/components/App') // eslint-disable-line global-require
            })
        module
            .hot
            .addStatusHandler((status) => {
                if (status === 'abort') {
                    setTimeout(() => process.exit(0), 0)
                }
            })
    }
}