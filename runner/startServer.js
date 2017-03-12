import configProd from '../configs/webpack.node';
import configDev from '../configs/webpack.node.watch';
import webpack from 'webpack';

var log = require('debug-logger')('app:server-builder');

import buildProductionServer from './buildProductionServer';
import startWatchServerSide from './startWatchServerSide';
import clearTempFilders from './clearTempFilders';

//  webpack(configProd, (err, stats) => {
//   if (err || stats.hasErrors()) {
//     log.error(err,stats)
//   }
//    log.info("Server build success")
// });

// const compiler = webpack(configProd);

// const runBuild = () => {
//     return new Promise((success, reject) => {
//         compiler.run((err, stats) => {
//             if (err || stats.hasErrors()) {
//                 log.error(err, stats);
//                 reject(err)
//             }

//             log.info("Server build success")
//             success()
//         });
//     });
// };

const runBuildAsync = async () => {
    await clearTempFilders();
    await buildProductionServer();
    await startWatchServerSide();
    log.info("Watch server run success");
    require('../dist/server');
}
runBuildAsync().catch(e => log.error(e));
