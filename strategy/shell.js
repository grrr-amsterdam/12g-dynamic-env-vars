#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
const errorMsg  = {
    'VARS_NOT_FOUND': 'The required env vars were not found in the current shell'
}

var shellConfig = module.exports = {
    load: function(configKeys) {
        return new Promise(
            function (resolve, reject) {
                if (shellConfig._isComplete(configKeys, process.env)) {
                    return resolve(shellConfig._filter(configKeys, process.env))
                }

                return reject(errorMsg.VARS_NOT_FOUND)
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

    _isComplete: function(configKeys, configVars) {
        for (var v in configKeys) {
            if (!(configKeys[v] in configVars)) {
                return false
            }
        }

        return true
    }
}
