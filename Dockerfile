# syntax=docker/dockerfile:1
FROM node:20

ENV HOME=/root
ENV QTWEBENGINE_CHROMIUM_FLAGS="--no-sandbox"
ENV USER=root
ENV ANKI_NO_UPDATES=1
ENV DISPLAY=:1

WORKDIR /app

RUN apt-get update && \
    apt-get install -y wget unzip xvfb x11-utils python3 python3-pip curl jq zstd \
    xfce4 xfce4-goodies tightvncserver \
    libxcb-cursor0 libxcb-xinerama0 libxcb-randr0 libxcb-xtest0 libxcb-xfixes0 \
    libxcb-shape0 libxcb-sync1 libxcb-render-util0 libxcb-icccm4 libxcb-keysyms1 \
    libxcb-image0 libxcb-util1 libxkbcommon-x11-0 libxkbcommon0 libgl1-mesa-glx \
    libegl1-mesa libxrandr2 libxss1 libxcomposite1 libxdamage1 libxtst6 \
    libdrm2 libxkbfile1 libasound2 && \
    rm -rf /var/lib/apt/lists/*

RUN LATEST_ANKI_URL=$(curl -s https://api.github.com/repos/ankitects/anki/releases/latest | jq -r '.assets[] | select(.name | contains("linux.tar.zst")) | .browser_download_url') && \
    wget -O anki.tar.zst "$LATEST_ANKI_URL" && \
    zstd -d anki.tar.zst && \
    tar -xf anki.tar && \
    mv anki-launcher-* /opt/anki && \
    ln -s /opt/anki/anki /usr/local/bin/anki && \
    rm anki.tar.zst anki.tar

RUN mkdir -p /root/.local/share/Anki2/addons21 && \
    cd /root/.local/share/Anki2/addons21 && \
    LATEST_ANKICONNECT_URL=$(curl -s https://api.github.com/repos/FooSoft/anki-connect/releases/latest | jq -r '.assets[] | select(.name == "AnkiConnect.zip") | .browser_download_url') && \
    wget -O AnkiConnect.zip "$LATEST_ANKICONNECT_URL" && \
    unzip AnkiConnect.zip -d 2055492159 && \
    rm AnkiConnect.zip

COPY package.json package-lock.json ./
RUN npm ci

RUN npx playwright install --with-deps

COPY . .

RUN wget -O jmdict-all.json.zip https://github.com/scriptin/jmdict-simplified/releases/download/3.5.0%2B20240826121924/jmdict-all-3.5.0+20240826121924.json.zip && \
    unzip jmdict-all.json.zip && \
    mv jmdict-all-3.5.0.json extraResources/ && \
    rm jmdict-all.json.zip

RUN npx nx run immersion-player-desktop:build

RUN mkdir -p /root/ImmersionPlayer
COPY ["assets/Example E01", "/root/ImmersionPlayer/Example E01"]
COPY ["assets/Example E02", "/root/ImmersionPlayer/Example E02"]

COPY vnc_start.sh /vnc_start.sh
RUN chmod +x /vnc_start.sh

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
CMD ["bash"]

# Expose VNC port
EXPOSE 5901 8765
