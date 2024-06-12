import requests
import qrcode
import os

def upload_file(file_path):
    url = 'https://qr.pirhotech.com/api/upload'
    files = {'file': open(file_path, 'rb')}
    response = requests.post(url, files=files)
    try:
        response.raise_for_status()
    except requests.exceptions.HTTPError as err:
        print(f"HTTP error occurred: {err}")
        print(f"Response text: {response.text}")
        return None

    try:
        return response.json().get('url')
    except ValueError:
        print("Response content is not valid JSON")
        print(f"Response text: {response.text}")
        return None

def create_qr_code(data, output_file):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
   
    img = qr.make_image(fill='black', back_color='white')
    img.save(output_file)

def generate_file_link_qr(file_path):
    file_url = upload_file(file_path)
    qr_code_output = 'qrcode.png'  # Change this to your desired output path
    if file_url:
        print(f"File uploaded successfully: {file_url}")
        create_qr_code(file_url, qr_code_output)
        print(f"QR code generated and saved to {qr_code_output}")
    else:
        print("Failed to upload file and generate QR code")

if __name__ == "__main__":
    generate_file_link_qr('path/to/your/file.ext')  # Replace with your file path
