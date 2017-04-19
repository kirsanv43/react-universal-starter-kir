import configProd from '../configs/webpack.node';
import configDev from '../configs/webpack.node.watch';
import webpack from 'webpack';
import nodeDevConfig from '../configs/webpack.node.watch';
//import webDevConfig from '../configs/webpack.web.watch';

var log = require('debug-logger')('app:server-builder');

import buildServer from './buildServer';
import startWatchServerSide from './startWatchServerSide';
import clearTempFilders from './clearTempFilders';

const runBuildAsync = async () => {
    await clearTempFilders();
    await buildServer(nodeDevConfig);
    await startWatchServerSide(nodeDevConfig);
   log.info("Watch server run success");
    require('../dist/server');
}
runBuildAsync().catch(e => log.error(e));
