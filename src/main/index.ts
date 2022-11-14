import { app, BrowserWindow, protocol } from 'electron'

let winURL: string = process.env.NODE_ENV === 'development' ? 'http://localhost:9080' : `file://${__dirname}/index.html`

function createWindow()
{
    app.allowRendererProcessReuse = false
    global.electronMainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            webSecurity: false,
            allowRunningInsecureContent: false,
            devTools: true,
            experimentalFeatures: true,
            contextIsolation: false
        }
    })

    global.electronMainWindow.loadURL(winURL)

    global.electronMainWindow.on('closed', () => {
        delete global.electronMainWindow
    })
    process.on('uncaughtException', (error) => {
        if (global.electronMainWindow == undefined) return
        global.electronMainWindow.webContents.send('uncaughtException', JSON.stringify(error))
    })
}

app.on('ready', createWindow)
// Register 'file://' URL's
app.on('ready', () => {
    protocol.registerFileProtocol('file', (request, callback) => {
        const pathname = decodeURI(request.url.replace('file:///', ''))
        callback(pathname)
    })
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', () => {
    if (global.electronMainWindow === null) {
        createWindow()
    }
})