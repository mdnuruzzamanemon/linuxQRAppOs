import qrcode
import subprocess
import os

def generate_script_qr():
    # Run the shell script to generate installed_apps.txt and install_apps.sh
    # subprocess.run(["./list_installed_apps.sh"], check=True)
    
    # # Read the content of install_apps.sh
    # with open("install_apps.sh", "r") as file:
    #     script_content = file.read()

    import subprocess

    # Get a list of installed packages
    result = subprocess.run(['apt-mark', 'showmanual'], stdout=subprocess.PIPE)
    installed_packages = result.stdout.decode().split('\n')

    # Filter out package names
    package_names = [line.split('\t')[0] for line in installed_packages if line]

    # Create a script to install the packages
    script_content = "#!/bin/bash\n\n"
    script_content += "sudo apt-get update\n\n"
    script_content += "sudo apt-get install -y " + " ".join(package_names)

    # Write the script to a file
    with open("script.sh", "w") as file:
        file.write(script_content)

    
    
    
    # Generate QR code for the script content
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(script_content)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    os.makedirs("../my-electron-app/static", exist_ok=True)  # Ensure the static directory exists
    img.save("../my-electron-app/static/script_qrcode.png")

if __name__ == "__main__":
    generate_script_qr()
