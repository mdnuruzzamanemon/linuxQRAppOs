#!/bin/bash

# Generate a list of installed packages
dpkg --get-selections | awk '{print $1}' > installed_apps.txt

# Create a script to install these packages
echo "#!/bin/bash" > install_apps.sh
echo "sudo apt update" >> install_apps.sh
echo "xargs -a installed_apps.txt sudo apt install -y" >> install_apps.sh

# Make the install script executable
chmod +x install_apps.sh
