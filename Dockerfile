# syntax=docker/dockerfile:1
FROM node:20

RUN apt-get update && apt-get install -y wget unzip xvfb x11-utils && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./

COPY . .

RUN npm ci

RUN npx playwright install --with-deps

RUN wget -O jmdict-all.json.zip https://github.com/scriptin/jmdict-simplified/releases/download/3.5.0%2B20240826121924/jmdict-all-3.5.0+20240826121924.json.zip \
    && unzip jmdict-all.json.zip \
    && mv jmdict-all-3.5.0.json extraResources/ \
    && rm jmdict-all.json.zip

RUN npx nx run immersion-player-desktop:build

//TODO: Figure out why the test cant find these files, probably not the home directory on linux
RUN mkdir -p /root/ImmersionPlayer
COPY ["assets/Example E01", "/root/ImmersionPlayer/Example E01"]
COPY ["assets/Example E02", "/root/ImmersionPlayer/Example E02"]

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
CMD ["bash"]
