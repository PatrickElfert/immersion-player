import { readFileSync, readdirSync } from 'fs';
import { Parser } from './parser.js';
import { join, extname } from "path";
import { Subtitle, UserSettings } from '@immersion-player/shared-types';
import { app } from 'electron';
import Store from 'electron-store';

type SRT = {
  index: number;
  startTime: string;
  endTime: string;
  text: string[];
};

export type SubtitlesByLibraryItem = {
  primary: Subtitle[];
  secondary: Subtitle[];
};

const getDictionaryPath = () => {
  return app.isPackaged
    ? join(process.resourcesPath, 'extraResources', 'jmdict-all-3.5.0.json')
    : join(process.cwd(), 'extraResources', 'jmdict-all-3.5.0.json');
};
const store = new Store<UserSettings>();
const parser = new Parser(getDictionaryPath(), store.get('knownWords') ?? {});

export async function parseSrt(path: string): Promise<Subtitle[]> {
  const srtFile = readFileSync(path, 'utf8');
  const result = readSrt(srtFile);

  const parsedSentences: Subtitle[] = [];

  for (const sentence of result) {
    const lookupResult = await parser.parseSentence(sentence.text[0]);
    parsedSentences.push({
      ...sentence,
      lookupResult,
    });
  }

  return parsedSentences;
}

export async function getSubtitlesByLibraryItem(libraryItemPath: string): Promise<SubtitlesByLibraryItem> {
  // Extract the directory path from the library item path (remove media:// protocol and filename)
  const cleanPath = libraryItemPath.replace('media://', '');
  const folderPath = cleanPath.substring(0, cleanPath.lastIndexOf('/'));
  
  // Find all .srt files in the directory
  const files = readdirSync(folderPath);
  const srtFiles = files.filter(file => extname(file) === '.srt');
  
  let primarySubtitles: Subtitle[] = [];
  let secondarySubtitles: Subtitle[] = [];
  
  // Find Japanese subtitle file (primary)
  const japaneseFile = srtFiles.find(file => file.includes('.ja.'));
  if (japaneseFile) {
    const japaneseFilePath = join(folderPath, japaneseFile);
    primarySubtitles = await parseSrt(japaneseFilePath);
  }
  
  // Find first non-Japanese subtitle file (secondary)
  const secondaryFile = srtFiles.find(file => !file.includes('.ja.'));
  if (secondaryFile) {
    const secondaryFilePath = join(folderPath, secondaryFile);
    const srtFile = readFileSync(secondaryFilePath, 'utf8');
    const result = readSrt(srtFile);
    
    // Secondary subtitles don't need dictionary lookup, so lookupResult is empty
    secondarySubtitles = result.map(sentence => ({
      ...sentence,
      lookupResult: [],
    }));
  }
  
  return {
    primary: primarySubtitles,
    secondary: secondarySubtitles,
  };
}

function readSrt(srt: string) {
  const subtitles: SRT[] = [];

  const blocks = srt.trim().split(/\n\n+/);

  for (const block of blocks) {
    const lines = block.split('\n');

    const index = parseInt(lines[0], 10);
    if (isNaN(index)) continue;

    const timeRange = lines[1].split(' --> ');
    if (timeRange.length !== 2) continue;
    const [startTime, endTime] = timeRange;

    const text = lines.slice(2);

    subtitles.push({ index, startTime, endTime, text });
  }

  return subtitles;
}
