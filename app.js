const {app, BrowserWindow, session} = require('electron') // http://electron.atom.io/docs/api

let window = null

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', 'true')
  app.commandLine.appendSwitch('force-device-scale-factor', '1')
}

// session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
//   details.requestHeaders['User-Agent'] = 'SuperDuperAgent'
//
//   callback({ cancel: false, requestHeaders: details.requestHeaders })
// })

// Wait until the app is ready
app.once('ready', () => {
  // Create a new window
  window = new BrowserWindow({
    // Set the initial width to 800px
    width: 375,
    // Set the initial height to 600px
    height: 667,
    // Don't show the window until it ready, this prevents any white flickering
    show: false,
    webPreferences: {
      // Disable node integration in remote page
      nodeIntegration: false
    }
  })

  // URL is argument to npm start
  const url = 'https://instagram.com' // process.argv[2]
  
  // Query all cookies associated with a specific url.
  session.defaultSession.cookies.get({}, (error, cookies) => {
    console.log(error, cookies)
  })

  window.loadURL(url, {userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B137 Safari/601.1'})

  // Show window when page is ready
  window.once('ready-to-show', () => {
    // window.maximize()
    window.show()
    
    // Open the DevTools.
    if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV.trim() === 'dev') {
      window.webContents.openDevTools()
    }
  })
})
