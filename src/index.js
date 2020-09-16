const { app, BrowserWindow, screen, Menu, Tray } = require('electron')

const notifier = require('node-notifier')
const path = require('path')
const url = require('url')

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    // darwin = MacOS
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    // Create the browser window.
    win = new BrowserWindow({
        width: 1280,
        height: 800,
        // x: width - bear.width,
        // y: height - bear.height,
        // transparent: true,
        frame: false,
        // skipTaskbar: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        },
    })

    win.loadURL(
        url.format({
            pathname: path.join(__dirname, '../public/index.html'),
            protocol: 'file:',
            slashes: true,
        })
    )

    // Open DevTools.
    // win.webContents.openDevTools()

    // When Window Close.
    win.on('closed', () => {
        win = null
    })

    win.on('minimize', function(event) {
        event.preventDefault()
        // win.hide()
    })
}
