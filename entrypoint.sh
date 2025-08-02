#!/bin/bash
set -e

echo "Starting Xvfb..."
Xvfb :99 -screen 0 1280x720x24 &
export DISPLAY=:99

echo "Waiting for Xvfb..."
while ! xdpyinfo -display :99 >/dev/null 2>&1; do
  sleep 0.1
done
echo "Xvfb running"

echo "Environment:"
echo "HOME: $HOME"
echo "DISPLAY: $DISPLAY"
echo "Mediafolder:"
ls -la "$HOME/ImmersionPlayer"

exec "$@"
