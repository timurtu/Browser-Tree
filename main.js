import {app, BrowserWindow} from 'electron'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var window

function createWindow() {

  // Create the browser window.
  window = new BrowserWindow({width: 1080, height: 675})

  // and load the window.html of the app.
  window.loadURL('file://' + __dirname + '/index.jade')


  // Open the DevTools.
  // window.webContents.openDevTools()

  // Emitted when the window is closed.
  window.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    window = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser-tree windows.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (window === null) {
    createWindow()
  }
})
