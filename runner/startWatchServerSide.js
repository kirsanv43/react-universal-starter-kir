import configDev from '../configs/webpack.node.watch';
import webpack from 'webpack';
var log = require('debug-logger')('app:watch-server-side');
const compiler = webpack(configDev);




const startWatchServerSide = () => {
    return new Promise((success, reject) => {
        const watching = compiler.watch(configDev, (err, stats) => {
            if (err || stats.hasErrors()) {
                log.error(err, stats);
                reject({err, stats, watching})
            } else {
                //log.info("Watch server run success");
                success(watching);
            }
        });
    });
}

export default startWatchServerSide;