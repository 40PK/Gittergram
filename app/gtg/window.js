'use strict'
const path = require('path')
const {BrowserWindow} = require('electron')
const config = require('./config')

const isDev = process.env.NODE_ENV === 'development'

class Window {
  createWindow({
    homepage = `file://${path.join(__dirname, '../index.html')}`,
    windowState = {}
  } = {}) {
    const win = new BrowserWindow(Object.assign({
      name: 'Gittergram',
      width: 800,
      height: 600,
      minWidth: 430,
      minHeight: 250
      // titleBarStyle: 'hidden-inset'
    }, windowState))

    win.loadURL(homepage)

    if (isDev) {
      const installExtension = require('electron-devtools-installer')
      installExtension.default(installExtension.VUEJS_DEVTOOLS)
        .then(name => console.log(`Added Extension:  ${name}`))
        .catch(err => console.log('An error occurred: ', err))
    }

    win.$config = config

    return win
  }
}

module.exports = new Window()
