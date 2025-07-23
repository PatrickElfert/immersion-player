import { readdir, lstat } from 'fs/promises';
import { extname, join, parse } from 'path';
import { existsSync } from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import * as path from 'node:path';
import { v4 } from 'uuid';
import { LibraryItem, UserSettings } from '@immersion-player/shared-types';
import Store from 'electron-store';
import * as os from 'node:os';

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

export async function loadLibrary(): Promise<LibraryItem[]> {
  const store = new Store<UserSettings>();
  const mediaFolder = store.get('mediaFolder') ?? path.join(os.homedir(), 'ImmersionPlayer');

  const libraryFolder = await readdir(mediaFolder);
  const result: LibraryItem[] = [];

  for (const item of libraryFolder) {
    const folderPath = path.join(mediaFolder, item);
    const isDirectory = (await lstat(folderPath)).isDirectory();

    if (isDirectory) {
      const folderContent = await readdir(folderPath);

      const path = folderContent.filter((s) => videoExtensions.includes(extname(s)));

      const srtFiles = folderContent.filter((s) => extname(s) === '.srt');

      if (path.length > 0) {
        /** For now just take the first file **/
        const mediaPath = path[0];

        const videoPath = join(folderPath, mediaPath);
        const thumbnailPath = join(folderPath, 'thumbnail.png');

        let thumbnailUrl: string | null;
        if (existsSync(thumbnailPath)) {
          thumbnailUrl = join('media://', thumbnailPath);
        } else {
          thumbnailUrl = null;
          createThumbnail(folderPath, videoPath).catch((err) => {
            console.warn('Failed to create thumbnail for', videoPath, err);
          });
        }

        result.push({
          name: parse(mediaPath).name,
          path: join('media://', videoPath),
          language: srtFiles.map((srtFile) => ({
            path: join(folderPath, srtFile),
            languageCode: srtFile.split('.')[1],
          })),
          thumbnail: thumbnailUrl,
          id: v4(),
        });
      }
    }
  }

  return result;
}
