const { app, BrowserWindow, Menu } = require('electron');
const electronLog = require('electron-log');
const contextMenu = require('electron-context-menu');
const path = require('path');
const url = require('url');

// Initialize Electron remote module
require('@electron/remote/main').initialize();

// Get app details from package.json
const appName = app.getName();
const appVersion = app.getVersion();
// Export Electron versions
const electronVer = process.versions.electron;
const chromeVer = process.versions.chrome;
const nodeVer = process.versions.node;
const v8Ver = process.versions.v8;

// Globally export what OS we are on
//const isLinux = process.platform === 'linux';
const isWin = process.platform === 'win32';
const isMac = process.platform === 'darwin';

function createWindow() {
  const mainWindow = new BrowserWindow({
    title: 'Universal Paperclips',
    resizable: true,
    maximizable: true,
    width: 1024,
    height: 900,
    useContentSize: true,
    icon: isWin ? path.join(__dirname, 'icon.ico') : path.join(__dirname, 'icon64.png'),
    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      contextIsolation: false,
      sandbox: false,
      experimentalFeatures: true,
      webviewTag: true,
      devTools: true,
      // Preload before renderer processes
      preload: path.join(__dirname, 'preload.js')
    }
  });
  require('@electron/remote/main').enable(mainWindow.webContents);
  Menu.setApplicationMenu(Menu.buildFromTemplate([
  {
    role: 'fileMenu',
    label: 'App',
    submenu: [
      {
        label: 'Go Back',
        accelerator: 'Alt+Left',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.goBack();
          electronLog.info('Navigated back');
        }
      },
      {
        label: 'Go Forward',
        accelerator: 'Alt+Right',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.goForward();
          electronLog.info('Navigated forward');
        }
      },
      {
        label: 'Close Window',
        accelerator: 'CmdorCtrl+W',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.close();
          electronLog.info('Closed a window');
        }
      },
      { type: 'separator' },
      {
        label: 'Relaunch',
        click() {
          electronLog.warn('Restarting App...');
          app.relaunch();
          app.quit();
        }
      },
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        role: 'quit'
      }
    ]
  },
  {
    role: 'editMenu',
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { type: 'separator' },
      { role: 'selectall' }
    ]
  },
  {
    role: 'viewMenu',
    label: 'View',
    submenu: [
      { role: 'reload' },
      {
        label: 'Reload F5',
        accelerator: 'F5',
        visible: false,
        acceleratorWorksWhenHidden: true,
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.reload();
        }
      },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      {
        label: 'Open Electron DevTools',
        accelerator: isMac ? 'CmdorCtrl+Shift+F12' : 'F12',
        click(item, focusedWindow) {
          focusedWindow.openDevTools({ mode: 'detach' });
        }
      },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    role: 'help',
    label: 'About',
    submenu: [
      { label: 'Universal Paperclips v' + app.getVersion(), enabled: false },
      {
        label: 'Created by Alex313031',
        click() {
          new BrowserWindow({ width: 1024, height: 768, useContentSize: true }).loadURL('https://github.com/Alex313031/Thorium_NetLog_Viewer#readme');
        }
      },
      { type: 'separator' },
      {
        label: 'View Humans.txt',
        accelerator: 'CmdorCtrl+Alt+Shift+H',
        click() {
          const humansWindow = new BrowserWindow({ width: 400, height: 450, useContentSize: true, title: 'humans.txt', darkTheme: true });
          humansWindow.loadFile('./humans.txt');
          electronLog.info('Opened humans.txt :)');
        }
      },
      {
        label: 'View License',
        accelerator: 'CmdorCtrl+Alt+Shift+L',
        click() {
          const licenseWindow = new BrowserWindow({ width: 532, height: 632, useContentSize: true, title: 'License', darkTheme: true });
          licenseWindow.loadFile('./license.md');
          electronLog.info('Opened license.md');
        }
      },
      {
        label: 'About App',
        accelerator: 'CmdorCtrl+Alt+A',
        click() {
          const aboutWindow = new BrowserWindow({
            width: 350,
            height: 300,
            useContentSize: true,
            title: 'About App',
            icon: isWin ? path.join(__dirname, 'icon.ico') : path.join(__dirname, 'icon64.png'),
            darkTheme: true,
            webPreferences: {
              nodeIntegration: false,
              nodeIntegrationInWorker: false,
              contextIsolation: false,
              sandbox: false,
              experimentalFeatures: true,
              webviewTag: true,
              devTools: true,
              preload: path.join(__dirname, 'preload.js')
            }
          });
          require('@electron/remote/main').enable(aboutWindow.webContents);
          aboutWindow.loadFile('./about.html');
          electronLog.info('Opened about.html');
        }
      }
    ]
  }
  ]));

  // Load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
}

contextMenu({
  showSelectAll: false,
  showCopyImage: true,
  showCopyImageAddress: true,
  showSaveImageAs: true,
  showCopyVideoAddress: true,
  showSaveVideoAs: true,
  showCopyLink: true,
  showSaveLinkAs: true,
  showInspectElement: true,
  showLookUpSelection: true,
  showSearchWithGoogle: true,
  prepend: (defaultActions, parameters, browserWindow) => [
  {
    label: 'Open Link in New Window',
    // Only show it when right-clicking a link
    visible: parameters.linkURL.trim().length > 0,
    click: (linkURL) => {
      const newWin = new BrowserWindow({
        title: 'New Window',
        width: 1024,
        height: 768,
        useContentSize: true,
        webPreferences: {
          nodeIntegration: false,
          nodeIntegrationInWorker: false,
          contextIsolation: false,
          sandbox: false,
          experimentalFeatures: true,
          webviewTag: true,
          devTools: true
        }
      });
      const toURL = parameters.linkURL;
      newWin.loadURL(toURL);
      electronLog.info('Opened New Window');
    }
  }]
});

app.whenReady().then(createWindow);

electronLog.info('Welcome to ' + appName + ' v' + appVersion);
electronLog.info('Electron Version: ' + [ electronVer ]);
electronLog.info('Chromium Version: ' + [ chromeVer ]);
electronLog.info('NodeJS Version: ' + [ nodeVer ]);
electronLog.info('V8 Version: ' + [ v8Ver ]);

// app.commandLine.appendSwitch('enable-experimental-web-platform-features');
app.commandLine.appendSwitch('allow-file-access-from-files');
app.commandLine.appendSwitch('enable-local-file-accesses');
app.commandLine.appendSwitch('enable-quic');
app.commandLine.appendSwitch('enable-ui-devtools');
app.commandLine.appendSwitch('ignore-gpu-blocklist');
app.commandLine.appendSwitch('enable-gpu-rasterization');
