'use strict'
const os = require('os')
const path = require('path')
const {
  app,
  Menu
} = require('electron')
const windowStateKeeper = require('electron-window-state')
const buildMenu = require('./gtg/menu')
const gtgWindow = require('./gtg/window')

const platform = os.platform()

const appMenu = buildMenu()

const createMainWindow = () => {
  const windowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600
  })
  if (platform === 'linux') {
    windowState.icon = path.join(__dirname, 'resources/icon.png')
  }
  const win = gtgWindow.createWindow({windowState})
  windowState.manage(win)
  return win
}

let mainWindow // eslint-disable-line

const shouldQuit = app.makeSingleInstance(() => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})

if (shouldQuit) {
  app.quit()
}

app.on('ready', () => {
  Menu.setApplicationMenu(appMenu)
  mainWindow = createMainWindow()

  if (platform === 'darwin') {
    mainWindow.setSheetOffset(36)
  }
})

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})
