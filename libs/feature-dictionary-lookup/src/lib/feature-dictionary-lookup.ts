import { Parser } from '@immersion-player/feature-dictionary-lookup';
import { readFileSync } from 'fs';
import srtParser2 from 'srt-parser-2';

const parser = new Parser('./jmdict-all-3.5.0.json');
const srtParser = new srtParser2();

export async function parseSrt(path: string) {
  const srtFile = readFileSync(path, 'utf8');
  const result = srtParser.fromSrt(srtFile);

  const parsedSentences = [];

  for (const sentence of result) {
    const tokens = await parser.parseSentence(sentence.text);
    parsedSentences.push({
      ...sentence,
      tokens
    })
  }

  return parsedSentences;
}
