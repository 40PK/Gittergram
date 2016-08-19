'use strict'
const Config = require('electron-config')
const config = new Config({
  defaults: {
    token: null
  }
})

module.exports = config
