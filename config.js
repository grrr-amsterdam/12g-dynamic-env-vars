#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
const fileConfig  = require('./strategy/file.js')
const shellConfig = require('./strategy/shell.js')

module.exports = {
    load: function(configKeys) {
        return new Promise(
            function (resolve, reject) {
                fileConfig.load(configKeys).then(result => {
                    return resolve(result)
                })
                .catch(fileErr => {
                    shellConfig.load(configKeys).then(result => {
                        return resolve(result)
                    })
                    .catch(shellErr => {
                        return reject(fileErr + "\n" + shellErr)
                    })
                })
            }
        )
    }
}
