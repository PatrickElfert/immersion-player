import { Parser } from './parser';
import { join } from 'path';
import * as path from "node:path";

const parser = new Parser(
  join(path.resolve(__dirname, '../../../../'), 'jmdict-all-3.5.0.json')
);

describe('featureDictionaryLookup', () => {
  it('parses a sentence', async () => {
    const result = await parser.parseSentence('今日は友達と学校に行きます');
    expect(result.map((r) => r.token)).toEqual([
      '今日',
      'は',
      '友達',
      'と',
      '学校',
      'に',
      '行きます',
    ]);
  });

  it('parses another sentence', async () => {
    const result = await parser.parseSentence('明日はラーメンを食べたいです');
    expect(result.map((r) => r.token)).toEqual([
      '明日',
      'は',
      'ラーメン',
      'を',
      '食べたい',
      'です',
    ]);
  });
});
