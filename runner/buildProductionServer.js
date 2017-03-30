import configDev from '../configs/webpack.node.watch';
import webpack from 'webpack';
var log = require('debug-logger')('app:server-builder');
const compiler = webpack(configDev);

const buildProductionServer = () => {
    return new Promise((success, reject) => {
        compiler.run((err, stats) => {
            if (err || stats.hasErrors()) {
                if(err) log.error(err );


                log.error(1111111111111111111111111111111111 );
                 log.error( Object.keys(stats.compilation));
                log.error(stats.errors);
                
                reject(err)
            }

            log.info("Server build success")
            success()
        });
    });
}

export default buildProductionServer;