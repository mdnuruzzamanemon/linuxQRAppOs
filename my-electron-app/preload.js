const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    generateQR: (text) => ipcRenderer.invoke('generate-qr', text),
    readQR: (filePath) => ipcRenderer.invoke('read-qr', filePath),
    generateScriptQR: () => ipcRenderer.invoke('generate-script-qr'),
     // New method for file upload and QR generation
     uploadAndGenerateQR: (filePath) => ipcRenderer.invoke('upload-and-generate-qr', filePath)
});
