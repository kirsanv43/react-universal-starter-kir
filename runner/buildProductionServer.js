import configDev from '../configs/webpack.node.watch';
import webpack from 'webpack';
var log = require('debug-logger')('app:server-builder');
const compiler = webpack(configDev);

const buildProductionServer = () => {
    return new Promise((success, reject) => {
        compiler.run((err, stats) => {
            if (err || stats.hasErrors()) {
                log.error(err, stats);
                reject(err)
            }

            log.info("Server build success")
            success()
        });
    });
}

export default buildProductionServer;