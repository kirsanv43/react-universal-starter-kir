import path from 'path';
import fs from 'fs';
import rimraf from 'rimraf';
var log = require('debug-logger')('app:clear-temp-folders');


function fsExistsSync(myDir) {
    try {
        fs.accessSync(myDir);
        return true;
    } catch (e) {
        return false;
    }
}

const clearTempFilders = async() => {
    const distPath = path.resolve(__dirname, "../dist");
    if (fsExistsSync(distPath)) {
        await removeDirectory(distPath);
        log.info('"dist" deleted');
    }
    const wwwPath = path.resolve(__dirname, "../public");
    if (fsExistsSync(wwwPath)) {
        await removeDirectory(wwwPath);
        log.info('"public" deleted');
    }


}


const removeDirectory = (path) => {
    return new Promise((success, reject) => {
        try {
            rimraf(path, function () {
                success()
            });
        } catch (error) {
            reject(error);
        }

    })
}

export default clearTempFilders;