import sys
from PIL import Image
from pyzbar.pyzbar import decode

def read_qr(file_path):
    img = Image.open(file_path)
    decoded_objects = decode(img)
    for obj in decoded_objects:
        return obj.data.decode('utf-8')
    return "No QR code found"

if __name__ == "__main__":
    file_path = sys.argv[1]
    print(read_qr(file_path))
