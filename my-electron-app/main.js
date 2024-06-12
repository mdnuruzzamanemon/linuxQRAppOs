const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');

const fs = require('fs');
const qrcode = require('qrcode');
const axios = require('axios');
const FormData = require('form-data');


function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false
        }
    });

    mainWindow.loadFile('index.html');
}

ipcMain.handle('generate-qr', async (event, text) => {
    return new Promise((resolve, reject) => {
        exec(`python3 my_app/generate_qr.py "${text}"`, (error, stdout, stderr) => {
            if (error) {
                reject(stderr);
            } else {
                resolve(path.join(__dirname, '../my-electron-app/static/qrcode.png')); // Adjust the path here
            }
        });
    });
});

ipcMain.handle('read-qr', async (event, filePath) => {
    return new Promise((resolve, reject) => {
        exec(`python3 my_app/read_qr.py "${filePath}"`, (error, stdout, stderr) => {
            if (error) {
                reject(stderr);
            } else {
                resolve(stdout.trim());
            }
        });
    });
});

ipcMain.handle('generate-script-qr', async () => {
    return new Promise((resolve, reject) => {
        exec('python3 my_app/generate_script_qr.py', (error, stdout, stderr) => {
            if (error) {
                reject(stderr);
            } else {
                resolve(path.join(__dirname, '../my-electron-app/static/script_qrcode.png')); // Adjust the path here
            }
        });
    });
});

// New IPC handler for file upload and QR code generation
ipcMain.handle('upload-and-generate-qr', async (event, filePath) => {
    const url = 'https://qr.pirhotech.com/api/upload';
    try {
        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath));

        const response = await axios.post(url, formData, {
            headers: formData.getHeaders()
        });

        const fileUrl = response.data.url;
        const qrImage = await qrcode.toDataURL(fileUrl);
        return qrImage;
    } catch (error) {
        console.error('Error uploading file or generating QR code:', error);
        throw error;
    }
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
