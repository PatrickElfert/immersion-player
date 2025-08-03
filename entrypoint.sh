#!/bin/bash
set -e

# Start VNC in background
echo "Starting VNC server..."
/vnc_start.sh &

echo "Starting Xvfb..."
Xvfb :99 -screen 0 1280x720x24 &
export DISPLAY=:99

echo "Waiting for Xvfb..."
while ! xdpyinfo -display :99 >/dev/null 2>&1; do
  sleep 0.1
done
echo "Xvfb running"

echo "Starting Anki in the background..."
anki --no-splash &
sleep 10
echo "Anki started"

echo "Environment:"
echo "HOME: $HOME"
echo "DISPLAY: $DISPLAY"

exec "$@"




