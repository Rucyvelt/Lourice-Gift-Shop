const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let serverProcess;

// Function to start the Node.js server
function startServer() {
    console.log('Starting Node.js server...');
    serverProcess = spawn('node', ['server.js'], {
        stdio: 'pipe',
        shell: true
    });
    
    serverProcess.stdout.on('data', (data) => {
        console.log(`Server: ${data}`);
        if (data.includes('Server running on http://localhost:3000')) {
            console.log('✅ Server started successfully!');
            // Create window after server is ready
            if (!mainWindow) {
                createWindow();
            }
        }
    });
    
    serverProcess.stderr.on('data', (data) => {
        console.error(`Server error: ${data}`);
    });
}

// Create the browser window
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        icon: path.join(__dirname, 'icon.png'),
        title: 'Lourice Gift Shop',
        show: false
    });

    // Load your website
    mainWindow.loadURL('http://localhost:3000');
    
    // Show window when ready
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
    
    // Open DevTools for debugging (optional - remove in production)
    // mainWindow.webContents.openDevTools();
    
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Create application menu
const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Admin Panel',
                click: () => {
                    mainWindow.loadURL('http://localhost:3000/admin');
                }
            },
            {
                label: 'Customer Shop',
                click: () => {
                    mainWindow.loadURL('http://localhost:3000');
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
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click: () => {
                    mainWindow.reload();
                }
            },
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
            },
            {
                label: 'Reset Zoom',
                accelerator: 'CmdOrCtrl+0',
                click: () => {
                    mainWindow.webContents.setZoomLevel(0);
                }
            }
        ]
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'About Lourice Gift Shop',
                click: () => {
                    require('electron').dialog.showMessageBox(mainWindow, {
                        type: 'info',
                        title: 'About Lourice Gift Shop',
                        message: 'Lourice Gift Shop v1.0.0\n\nA beautiful gift shop management system.\n\nAdmin Password: @Rucylora.com',
                        buttons: ['OK']
                    });
                }
            }
        ]
    }
];

// Build the menu
const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);

// App lifecycle
app.whenReady().then(() => {
    startServer();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        if (serverProcess) {
            serverProcess.kill();
        }
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        startServer();
    }
});

// Clean up on exit
app.on('will-quit', () => {
    if (serverProcess) {
        serverProcess.kill();
    }
});