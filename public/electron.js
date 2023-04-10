// Module to control the application lifecycle and the native browser window.
const { app, BrowserWindow, protocol, ipcMain, shell } = require('electron')
const path = require('path')
const url = require('url')
const os = require('os')
const fs = require('fs')
const resizeImg = require('resize-img')

// Create the native browser window.
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    title: 'Toolbox',
    // Set the path of an additional "preload" script that can be used to
    // communicate between node-land and browser-land.
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })
  /* Here is the explanation for the code above:
1. The ipcMain.on() method listens to the 'get-system-info' event.
2. It then replies to that event with the 'system-info' event and passes some data in the form of an object.
3. The process.platform and process.version properties are used to get the platform and version of the operating system. */
  ipcMain.on('get-system-info', event => {
    event.reply('system-info', {
      platform: process.platform,
      version: process.version,
      cpuUsage: process.getCPUUsage(),
      memoryUsage: process.getSystemMemoryInfo(),
      systemVersion: process.getSystemVersion()
    })
  })

  // Respond to the resize image event
  ipcMain.on('image:resize', (e, options) => {
    // console.log(options);
    options.dest = path.join(os.homedir(), 'imageresizer')
    resizeImage(options)
  })

  // Resize and save image
  async function resizeImage({ imgPath, height, width, dest }) {
    try {
      // console.log(imgPath, height, width, dest);

      // Resize image
      const newPath = await resizeImg(fs.readFileSync(imgPath), {
        width: +width,
        height: +height
      })

      // Get filename
      const filename = path.basename(imgPath)

      // Create destination folder if it doesn't exist
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest)
      }

      // Write the file to the destination folder
      fs.writeFileSync(path.join(dest, filename), newPath)

      // Send success to renderer
      mainWindow.webContents.send('image:done')

      // Open the folder in the file explorer
      shell.openPath(dest)
    } catch (err) {
      console.log(err)
    }
  }
  // workaround for windows 10 notifications
  app.setAppUserModelId(process.execPath)

  // In production, set the initial browser path to the local bundle generated
  // by the Create React App build process.
  // In development, set it to localhost to allow live/hot-reloading.
  const appURL = app.isPackaged
    ? url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      })
    : 'http://localhost:3000'
  mainWindow.loadURL(appURL)

  // Automatically open Chrome's DevTools in development mode.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools()
  }
}

// Setup a local proxy to adjust the paths of requested files when loading
// them from the local production bundle (e.g.: local fonts, etc...).
function setupLocalFilesNormalizerProxy() {
  protocol.registerHttpProtocol(
    'file',
    (request, callback) => {
      const url = request.url.substr(8)
      callback({ path: path.normalize(`${__dirname}/${url}`) })
    },
    error => {
      if (error) console.error('Failed to register protocol')
    }
  )
}

// This method will be called when Electron has finished its initialization and
// is ready to create the browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  setupLocalFilesNormalizerProxy()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Quit when all windows are closed, except on macOS.
// There, it's common for applications and their menu bar to stay active until
// the user quits  explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// If your app has no need to navigate or only needs to navigate to known pages,
// it is a good idea to limit navigation outright to that known scope,
// disallowing any other kinds of navigation.
const allowedNavigationDestinations = 'https://my-electron-app.com'
app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)

    if (!allowedNavigationDestinations.includes(parsedUrl.origin)) {
      event.preventDefault()
    }
  })
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
