'use strict'
const os = require('os')
const path = require('path')
const {
  app,
  Menu
} = require('electron')
const windowStateKeeper = require('electron-window-state')
const electronOauth2 = require('electron-oauth2')
const buildMenu = require('./gtg/menu')
const gtgWindow = require('./gtg/window')
const config = require('./gtg/config')

const appConfigs = require('./app.json')
const oAuthConfig = {
  clientId: appConfigs.GITTER_KEY,
  clientSecret: appConfigs.GITTER_SECRET,
  authorizationUrl: 'https://gitter.im/login/oauth/authorize',
  tokenUrl: 'https://gitter.im/login/oauth/token',
  useBasicAuthorizationHeader: false,
  redirectUri: 'http://localhost:7788/login'
}

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
  const createAppWindow = () => {
    Menu.setApplicationMenu(appMenu)
    mainWindow = createMainWindow()

    if (platform === 'darwin') {
      mainWindow.setSheetOffset(36)
    }
  }

  if (config.get('token') === null) {
    const myApiOauth = electronOauth2(oAuthConfig, {
      alwaysOnTop: true,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: false
      }
    })

    myApiOauth.getAccessToken().then(token => {
      if (token && token.access_token) {
        config.set('token', token.access_token)
        createAppWindow()
      }
    })
  } else {
    createAppWindow()
  }
})

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})
