const { app, BrowserWindow } = require('electron')

const path = require('path')
const isDev = require('electron-is-dev')
const { ipcMain } = require('electron')
const childProcess = require('child_process')

// script for our twitch plays arknights node app
const scriptFilename = path.join(__dirname, '../backend', 'index.js')

const runScript = (scriptPath, args, callback) => {
  const { stage, allowUndeploy, undepTimeout, twitchChannel } = args

  console.log(stage.title, allowUndeploy, undepTimeout, twitchChannel)

  // keep track of whether callback has been invoked to prevent multiple invocations
  var invoked = false

  var process = childProcess.fork(scriptPath, [stage.file_path, twitchChannel, allowUndeploy, undepTimeout])

  // listen for errors as they may prevent the exit event from firing
  process.on('error', function (err) {
    if (invoked) return
    invoked = true
    callback(err)
  })

  // execute the callback once the process has finished running
  process.on('exit', function (code) {
    if (invoked) return
    invoked = true
    var err = code === 0 ? null : new Error('exit code ' + code)
    callback(err)
  })
}

require('@electron/remote/main').initialize()

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
  })

  win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Listen event through runCommand channel
// And return the result to Renderer.
ipcMain.on('runCommand', async (event, args) => {
  console.log('lolol')
  process.stdout.write('your output to command prompt console or node js ')

  // Now we can run a script and invoke a callback when complete, e.g.
  runScript(scriptFilename, args, err => {
    if (err) throw err
    console.log('finished running some-script.js')
  })

  // event.returnValue = await runCommand(arg)
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
