const { app, BrowserWindow, Menu } = require('electron');
const electronLog = require('electron-log');
const electronStore = require('electron-store');
const contextMenu = require('electron-context-menu');
const path = require('path');
const url = require('url');

// Initialize Electron remote module
require('@electron/remote/main').initialize();

function createWindow () {
    let mainWindow = new BrowserWindow({
      title: 'Universal Paperclips',
      resizable: true,
      maximizable: true,
      width: 1024,
      height: 900,
      icon: path.join(__dirname, 'icon64.png'),
      webPreferences: {
        nodeIntegration: false,
        nodeIntegrationInWorker: false,
        contextIsolation: false,
        sandbox: false,
        experimentalFeatures: true,
        webviewTag: true,
        devTools: true,
        javascript: true,
        plugins: true,
        enableRemoteModule: true,
        // Preload before renderer processes
        preload: path.join(__dirname, 'preload.js')
      }
    });
    require("@electron/remote/main").enable(mainWindow.webContents);

    // Load the index.html of the app.
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }));
    mainWindow.setMenuBarVisibility(true);
    mainWindow.setResizable(true);
}

contextMenu({
    showSelectAll: true,
    showCopyImage: true,
    showCopyImageAddress: true,
    showSaveImageAs: true,
    showCopyVideoAddress: true,
    showSaveVideoAs: true,
    showCopyLink: true,
    showSaveLinkAs: true,
    showInspectElement: true,
    showLookUpSelection: true,
    showSearchWithGoogle: true
});

app.whenReady().then(createWindow);

// Get app version from package.json
var appVersion = app.getVersion();
// Get Electron versions
var electronVersion = process.versions.electron;
var chromeVersion = process.versions.chrome;
var nodeVersion = process.versions.node;
var v8Version = process.versions.v8;

electronLog.info('Welcome to Universal Paperclips!');
electronLog.info('App Version: ' + [ appVersion ]);
electronLog.info('Electron Version: ' + [ electronVersion ]);
electronLog.info('Chromium Version: ' + [ chromeVersion ]);
electronLog.info('NodeJS Version: ' + [ nodeVersion ]);
electronLog.info('V8 Version: ' + [ v8Version ]);

// app.commandLine.appendSwitch('enable-experimental-web-platform-features');
app.commandLine.appendSwitch('allow-file-access-from-files');
app.commandLine.appendSwitch('enable-local-file-accesses');
app.commandLine.appendSwitch('enable-quic');
app.commandLine.appendSwitch('enable-ui-devtools');
app.commandLine.appendSwitch('ignore-gpu-blocklist');
app.commandLine.appendSwitch('enable-gpu-rasterization');
