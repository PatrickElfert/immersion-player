#!/bin/bash
set -e

Xvfb :99 -screen 0 1920x1080x24 &
export DISPLAY=:99

# Warte, bis der X-Server bereit ist
while ! xdpyinfo -display :99 >/dev/null 2>&1; do
  echo "Warte auf Xvfb..."
  sleep 0.5
done

exec "$@"
