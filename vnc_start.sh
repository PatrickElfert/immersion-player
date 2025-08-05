#!/bin/bash
# Set VNC password (no prompt)
mkdir -p /root/.vnc
echo "password" | vncpasswd -f > /root/.vnc/passwd
chmod 600 /root/.vnc/passwd

# Start the VNC server with XFCE
vncserver :1 -geometry 1280x800 -depth 24
tail -F /root/.vnc/*.log
