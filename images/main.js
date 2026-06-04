const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let serverProcess;

// Start the Node.js server
function startServer() {
    console.log('Starting server...');
    serverProcess = spawn('node', ['server.js'], {
        stdio: 'pipe',
        shell: true
    });
    
    serverProcess.stdout.on('data', (data) => {
        console.log(`Server: ${data}`);
        if (data.includes('Server running')) {
            console.log('✅ Server ready!');
            if (!mainWindow) {
                createWindow();
            }
        }
    });
    
    serverProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
    });
}

// Create the window
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        },
        title: 'Lourice Gift Shop',
        show: false
    });

    mainWindow.loadURL('http://localhost:3000');
    
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
    
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Menu template
const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Customer Shop',
                click: () => {
                    mainWindow.loadURL('http://localhost:3000');
                }
            },
            {
                label: 'Admin Panel',
                click: () => {
                    mainWindow.loadURL('http://localhost:3000/admin');
                }
            },
            { type: 'separator' },
            {
                label: 'Refresh',
                accelerator: 'CmdOrCtrl+R',
                click: () => {
                    mainWindow.reload();
                }
            },
            {
                label: 'Exit',
                accelerator: 'CmdOrCtrl+Q',
                click: () => {
                    if (serverProcess) serverProcess.kill();
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Toggle Full Screen',
                accelerator: 'F11',
                click: () => {
                    mainWindow.setFullScreen(!mainWindow.isFullScreen());
                }
            },
            {
                label: 'Zoom In',
                accelerator: 'CmdOrCtrl+Plus',
                click: () => {
                    mainWindow.webContents.setZoomLevel(mainWindow.webContents.getZoomLevel() + 0.5);
                }
            },
            {
                label: 'Zoom Out',
                accelerator: 'CmdOrCtrl+-',
                click: () => {
                    mainWindow.webContents.setZoomLevel(mainWindow.webContents.getZoomLevel() - 0.5);
                }
            }
        ]
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'About',
                click: () => {
                    const { dialog } = require('electron');
                    dialog.showMessageBox(mainWindow, {
                        type: 'info',
                        title: 'About Lourice Gift Shop',
                        message: 'Lourice Gift Shop v1.0.0\n\nAdmin Password: @Rucylora.com',
                        buttons: ['OK']
                    });
                }
            }
        ]
    }
];

const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);

// App events
app.whenReady().then(() => {
    startServer();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        if (serverProcess) serverProcess.kill();
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        startServer();
    }
});