import { readFileSync } from 'fs';
import { Parser } from './parser.js';
import { join } from "path";
import { Subtitle } from '@immersion-player/shared-types';
import { app } from 'electron';

type SRT = {
  index: number;
  startTime: string;
  endTime: string;
  text: string[];
};

const getDictionaryPath = () => {
  return app.isPackaged
    ? join(process.resourcesPath, 'extraResources', 'jmdict-all-3.5.0.json')
    : join(process.cwd(), 'extraResources', 'jmdict-all-3.5.0.json');
};

const parser = new Parser(getDictionaryPath());

export async function parseSrt(path: string): Promise<Subtitle[]> {
  const srtFile = readFileSync(path, 'utf8');
  const result = srtParse(srtFile);

  const parsedSentences = [];

  for (const sentence of result) {
    const lookupResult = await parser.parseSentence(sentence.text[0]);
    parsedSentences.push({
      ...sentence,
      lookupResult,
    });
  }

  return parsedSentences;
}

function srtParse(srt: string) {
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
