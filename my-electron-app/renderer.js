function showGenerator() {
    hideAll();
    document.getElementById('qr-generator').classList.remove('hidden');
}

function showReader() {
    hideAll();
    document.getElementById('qr-reader').classList.remove('hidden');
}

function showScriptQR() {
    hideAll();
    document.getElementById('script-qr').classList.remove('hidden');
}

// New function to show File Share section
function showFileShare() {
    hideAll();
    document.getElementById('file-share').classList.remove('hidden');
}

function generateQR() {
    const text = document.getElementById('qr-input').value;
    if (text) {
        window.electronAPI.generateQR(text)
            .then(result => {
                document.getElementById('qr-output').innerHTML = `<img src="${result}">`;
            })
            .catch(error => {
                console.error(error);
            });
    }
}

function readQR() {
    document.getElementById('readQRBtn').classList.add('hidden');
    document.getElementById('readTryAgainBtn').classList.remove('hidden');
    document.getElementById('qr-data').classList.remove('hidden');
    document.getElementById('qr-file').classList.add('hidden');

    const file = document.getElementById('qr-file').files[0];
    if (file) {
        const filePath = file.path;
        window.electronAPI.readQR(filePath)
            .then(result => {
                document.getElementById('qr-data').innerText = result;
            })
            .catch(error => {
                console.error(error);
            });
    }
}

function generateScriptQR() {
    window.electronAPI.generateScriptQR()
        .then(result => {
            document.getElementById('script-qr-output').innerHTML = `<img src="${result}">`;
        })
        .catch(error => {
            console.error(error);
        });
}

// New function to generate link QR code from file upload
function generateLinkQR() {
    const file = document.getElementById('file-input').files[0];
    if (file) {
        const filePath = file.path;
        window.electronAPI.uploadAndGenerateQR(filePath)
            .then(result => {
                document.getElementById('file-link-qr-output').innerHTML = `<img src="${result}">`;
            })
            .catch(error => {
                console.error(error);
            });
    }
}

function hideAll() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('qr-generator').classList.add('hidden');
    document.getElementById('qr-reader').classList.add('hidden');
    document.getElementById('script-qr').classList.add('hidden');
    document.getElementById('file-share').classList.add('hidden'); // Hide file share section
}

function goBack() {
    resetReadQR();
    hideAll();
    document.getElementById('main-menu').classList.remove('hidden');
    document.getElementById('qr-input').value = '';
    document.getElementById('qr-output').innerHTML = '';
    document.getElementById('qr-data').innerText = '';
    document.getElementById('qr-file').value = '';
    document.getElementById('script-qr-output').innerHTML = '';
    document.getElementById('file-link-qr-output').innerHTML = ''; // Clear file share output
}

function resetReadQR() {
    document.getElementById('readQRBtn').classList.remove('hidden');
    document.getElementById('readTryAgainBtn').classList.add('hidden');
    document.getElementById('qr-data').classList.add('hidden');
    document.getElementById('qr-file').classList.remove('hidden');
}
