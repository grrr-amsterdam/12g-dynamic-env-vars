#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
const dotenv    = require('12g-cleandotenv')
const fs        = require('fs')
const errorMsg  = {
    'VARS_NOT_FOUND': 'The required config vars were not found in the .env file',
    'FILE_NOT_FOUND': '.env file does not exist'
}

var fileConfig = module.exports = {
    load: function(configKeys) {
        return new Promise(
            function (resolve, reject) {
                fileConfig._loadFile().then(configVars => {
                    if (fileConfig._isComplete(configKeys, configVars)) {
                        return resolve(fileConfig._filter(configKeys, configVars))
                    } else {
                        return reject(errorMsg.VARS_NOT_FOUND)
                    }
                }).catch(err => {
                    return reject(err)
                })
            }
        )
    },

    _filter: function(configKeys, configVars) {
        var output = {}

        for (var v in configKeys) {
            output[configKeys[v]] = configVars[configKeys[v]]
        }

        return output
    },

    _loadFile: function() {
        return new Promise(
            function (resolve, reject) {
                if (!fs.existsSync('.env')) {
                    return reject(errorMsg.FILE_NOT_FOUND)
                }

                dotenv.load().then(localEnv => {
                    return resolve(localEnv)
                }).catch(err => {
                    return reject(err)
                })
            }
        )
    },

    _isComplete: function(configKeys, configVars) {
        for (var v in configKeys) {
            if (!(configKeys[v] in configVars)) {
                return false
            }
        }

        return true
    }
}
