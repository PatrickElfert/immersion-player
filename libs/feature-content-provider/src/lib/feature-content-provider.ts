import { readdir, lstat } from 'fs/promises';
import { homedir } from 'os';
import { extname, join, parse } from 'path';
import * as ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static'
import {path as ffprobePath}  from 'ffprobe-static'
import * as path from "node:path";

export interface LanguageFile {
  path: string;
  languageCode: string;
}

export interface LibraryItem {
  name: string;
  path: string;
  language: LanguageFile[];
  thumbnail: string;
}

const videoExtensions = ['.mpg', '.mp2', '.mpeg', '.mpe', '.mpv', '.mp4', '.mkv'];

function createThumbnail(outputPath: string, videoPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .screenshots({
        count: 1,
        filename: 'thumbnail.png',
        folder: outputPath,
      })
      .on('end', () => {
        console.log('Screenshot taken successfully');
        resolve();
      })
      .on('error', (err) => {
        console.error('An error occurred:', err);
        reject(err);
      });
  });
}

export async function loadLibrary(folderPath: string): Promise<LibraryItem[]> {
  const absolutePath = join(homedir(), folderPath);
  const libraryFolder = await readdir(absolutePath);
  const result: LibraryItem[] = [];

  if(ffmpegPath && ffprobePath) {
    ffmpeg.setFfmpegPath(ffmpegPath.replace(
      'app.asar',
      'app.asar.unpacked'
    ))
    ffmpeg.setFfprobePath(ffprobePath);
  }

  for (const item of libraryFolder) {

    const folderPath = path.join(absolutePath, item);
    const isDirectory = (await lstat(folderPath)).isDirectory();

    if (isDirectory) {
      const folderContent = await readdir(folderPath);

      const path = folderContent.filter((s) =>
        videoExtensions.includes(extname(s))
      );

      const srtFiles = folderContent.filter(s => extname(s) === '.srt');

      if(path.length > 0) {
        /** For now just take the first file **/
        const mediaPath = path[0];

        const videoPath = join(folderPath, mediaPath);
        //await createThumbnail(folderPath, videoPath);

        result.push({
          name: parse(mediaPath).name,
          path: videoPath,
          language: srtFiles.map((srtFile) => ({
            path: join(folderPath, srtFile),
            languageCode: srtFile.split('.')[2]
          })),
          thumbnail: join(folderPath, 'thumbnail.png')
        })
      }
    }
  }

  return result;
}
