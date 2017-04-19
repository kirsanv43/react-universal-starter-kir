import webpack from 'webpack';

const log = require('debug-logger')('app:server-builder');


const buildServer = config => {
  const compiler = webpack(config);

  return new Promise((success, reject) => {
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        log.error(err, stats);
        reject(err);
      }

      log.info('Server build success');
      success();
    });
  });
};

export default buildServer;
