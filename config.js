#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
const fileConfig  = require('./strategy/file.js')
const shellConfig = require('./strategy/shell.js')

var configKeys = [
    'AUTOSCALE_APP',
    'AUTOSCALE_REGION',
    'AUTOSCALE_KEY',
    'AUTOSCALE_SECRET'
];

fileConfig.load(configKeys).then(result => {
    return result
})
.catch(fileErr => {
    shellConfig.load(configKeys).then(result => {
        return result
    })
    .catch(shellErr => {
        console.log(fileErr)
        console.log(shellErr)
        return false
    })
})
