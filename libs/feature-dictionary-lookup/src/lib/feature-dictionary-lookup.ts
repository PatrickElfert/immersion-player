import { Parser } from '@immersion-player/feature-dictionary-lookup';
import { readFileSync } from 'fs';

const parser = new Parser();

export async function parseSrt(path: string) {
  const srtParser2 = await import('srt-parser-2');
  const srtParser = new srtParser2.default();
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
