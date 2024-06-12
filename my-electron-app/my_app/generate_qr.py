import sys
import qrcode
import os

def generate_qr(text):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(text)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    os.makedirs("../my-electron-app/static", exist_ok=True)  # Ensure the static directory exists
    img.save("../my-electron-app/static/qrcode.png")

if __name__ == "__main__":
    text = sys.argv[1]
    generate_qr(text)
