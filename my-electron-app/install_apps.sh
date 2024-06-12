#!/bin/bash
sudo apt update
xargs -a installed_apps.txt sudo apt install -y
