import webpack from 'webpack';

const log = require('debug-logger')('app:watch-server-side');

const startWatchServerSide = config => {
  const compiler = webpack(config);

  return new Promise((success, reject) => {
    const watching = compiler.watch(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        log.error(err, stats);
        reject(new Error({ err, stats, watching }));
      } else {
                // log.info("Watch server run success");
        success(watching);
      }
    });
  });
};

export default startWatchServerSide;
