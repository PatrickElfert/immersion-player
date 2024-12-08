import { readFileSync } from 'fs';
import { Parser } from './parser';
import {join} from "path";

type Subtitle = {
  index: number;
  startTime: string;
  endTime: string;
  text: string[];
};

const parser = new Parser(join(__dirname, 'jmdict-all-3.5.0.json'));

export async function parseSrt(path: string) {
  const srtFile = readFileSync(path, 'utf8');
  const result = srtParse(srtFile);

  const parsedSentences = [];

  for (const sentence of result) {
    const tokens = await parser.parseSentence(sentence.text[0]);
    parsedSentences.push({
      ...sentence,
      tokens,
    });
  }

  return parsedSentences;
}

function srtParse(srt: string) {
  const subtitles: Subtitle[] = [];

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
