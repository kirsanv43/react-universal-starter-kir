import configProd from '../configs/webpack.node';
import configDev from '../configs/webpack.node.watch';
import webpack from 'webpack';

var log = require('debug-logger')('app:server-builder');

import buildProductionServer from './buildProductionServer';
import startWatchServerSide from './startWatchServerSide';
import clearTempFilders from './clearTempFilders';

const runBuildAsync = async () => {
    await clearTempFilders();
    await buildProductionServer();
    await startWatchServerSide();
    log.info("Watch server run success");
    require('../dist/server');
}
runBuildAsync().catch(e => log.error(e));
