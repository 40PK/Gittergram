'use strict'
const {
  Menu,
  shell,
  app,
  dialog
} = require('electron')
const axios = require('axios')
const compare = require('semver-compare')
const isDev = process.env.NODE_ENV === 'development'
const version = app.getVersion()
const checkForUpdates = {
  label: 'Check for Updates',
  click(item, focusedWindow) {
    axios.get('https://api.github.com/repos/Perkovec/Gittergram/releases/latest')
      .then(res => {
        const latestVersion = res.data.tag_name.substr(1)
        const hasUpdates = compare(latestVersion, version) === 1
        if (hasUpdates) {
          const answer = dialog.showMessageBox(focusedWindow, {
            type: 'question',
            message: 'Update',
            detail: `A newer version ${latestVersion} is available, are you willing to download the updates?`,
            buttons: ['OK', 'Cancel']
          })
          if (answer === 0) {
            shell.openExternal(`https://github.com/Perkovec/Gittergram/releases/tag/v${latestVersion}`)
          }
        } else {
          dialog.showMessageBox(focusedWindow, {
            type: 'info',
            message: 'No Updates',
            detail: `Current version ${version} is already up to date!`,
            buttons: ['OK']
          })
        }
      })
      .catch(err => {
        dialog.showErrorBox('Update', `${err.name}: ${err.message}`)
      })
  }
}
const about = {
  label: 'About',
  click(item, focusedWindow) {
    dialog.showMessageBox(focusedWindow, {
      message: 'Gittergram',
      type: 'info',
      buttons: ['OK'],
      detail: [
        'Gitter client with Telegram design',
        '',
        `Gittergram: ${version}`,
        `Node.js: ${process.version.substr(1)}`,
        `Electron: ${process.versions.electron}`,
        `Chrome: ${process.versions.chrome}`
      ].join('\n')
    })
  }
}

module.exports = () => {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Example',
          accelerator: 'CmdOrCtrl+T',
          click() {}
        }
      ]
    }
  ]

  if (process.platform === 'darwin') {
    const name = app.getName()
    template.unshift({
      label: name,
      submenu: [
        {
          role: 'about'
        },
        {
          type: 'separator'
        },
        checkForUpdates,
        {
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          role: 'hide'
        },
        {
          role: 'hideothers'
        },
        {
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click() {
            app.exit(0)
          }
        }
      ]
    })
  } else {
    template[template.length - 1].submenu.push(
      {
        type: 'separator'
      },
      checkForUpdates,
      about
    )
  }

  if (isDev) {
    template[template.length - 1].submenu.push(
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.toggleDevTools()
        }
      }
    )
  }

  return Menu.buildFromTemplate(template)
}
