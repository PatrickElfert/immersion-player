#!/bin/bash
set -e

# Start VNC in background
echo "Starting VNC server..."
/vnc_start.sh &

sleep 5

echo "Starting Anki in the background..."
anki &
sleep 10
echo "Anki started"

# Set up X11 permissions
xhost +

exec "$@"




