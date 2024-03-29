// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron')
const Toastify = require('toastify-js')
const os = require('os')
const path = require('path')

// As an example, here we use the exposeInMainWorld API to expose the browsers
// and node versions to the main window.
// They'll be accessible at "window.versions".
process.once('loaded', () => {
  contextBridge.exposeInMainWorld('versions', process.versions)
  contextBridge.exposeInMainWorld('electron', {
    doThing: 42,
    alertNotification: () =>
      new Notification('Vous utilisez plus de 80% de la ram', {
        body: "Mefiez vous, c'est un conseil d'ami que je vous donne"
      }),
    requestSystemInfo: () => ipcRenderer.send('get-system-info'),
    getSystemInfo: setState =>
      ipcRenderer.on('system-info', (event, info) => {
        console.log('🚀 ~ file: preload.js:19 ~ getSystemInfo: ~ info', info)

        setState(info)
      }),
    cleanSystemInfo: () => ipcRenderer.removeAllListeners('system-info')
  })
  contextBridge.exposeInMainWorld('ipcRenderer', {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) =>
      ipcRenderer.on(channel, (event, ...args) => func(...args))
  })

  contextBridge.exposeInMainWorld('os', {
    homedir: () => os.homedir()
  })

  contextBridge.exposeInMainWorld('path', {
    join: (...args) => path.join(...args)
  })

  contextBridge.exposeInMainWorld('Toastify', {
    toast: options => Toastify(options).showToast()
  })
})
