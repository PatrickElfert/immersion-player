import { readdir, lstat } from 'fs/promises';
import { homedir } from 'os';
import { extname, join, parse } from 'path';
import * as path from "node:path";

export interface LanguageFile {
  path: string;
  languageCode: string;
}

export interface LibraryItem {
  name: string;
  path: string;
  language: LanguageFile[]
}

const videoExtensions = ['.mpg', '.mp2', '.mpeg', '.mpe', '.mpv', '.mp4'];

export async function loadLibrary(folderPath: string): Promise<LibraryItem[]> {
  const absolutePath = join(homedir(), folderPath);
  const libraryFolder = await readdir(absolutePath);
  const result: LibraryItem[] = [];

  for (const item of libraryFolder) {
    const folderPath = path.join(absolutePath, item);
    const isDirectory = (await lstat(folderPath)).isDirectory();
    if (isDirectory) {
      const folderContent = await readdir(folderPath);
      const path = folderContent.filter((s) =>
        videoExtensions.includes(extname(s))
      );

      const srtFiles = folderContent.filter(s => extname(s) === '.srt');

      console.log(srtFiles)

      if(path.length > 0) {
        /** For now just take the first file **/
        const mediaPath = path[0];

        result.push({
          name: parse(mediaPath).name,
          path: join(folderPath, mediaPath),
          language: srtFiles.map((srtFile) => ({
            path: join(folderPath, srtFile),
            languageCode: srtFile.split('.')[2]
          }))
        })
      }
    }
  }

  return result;
}
