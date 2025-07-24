import { Parser } from './parser.js';
import { join } from 'path';
import * as path from 'node:path';

const parser = new Parser(join(path.resolve(__dirname, '../../../../extraResources'), 'jmdict-all-3.5.0.json'), {});

describe('featureDictionaryLookup', async () => {
  it('parses a sentence', async () => {
    const result = await parser.parseSentence('今日は友達と学校に行きます');
    expect(result.map((r) => r.token.map((t) => t.original).join(''))).toEqual([
      '今日',
      'は',
      '友達',
      'と',
      '学校',
      'に',
      '行きます',
    ]);
  });

  it('ignores special characters', async () => {
    const result = await parser.parseSentence('明日は、友達とラーメンを食べたいです。');
    expect(result.map((r) => r.token.map((t) => t.original).join(''))).toEqual([
      '明日',
      'は',
      '、',
      '友達',
      'と',
      'ラーメン',
      'を',
      '食べたい',
      'です',
      '。',
    ]);
  });

  it('should process remaining morphemes even if there was no definition found for the last word in a group', async () => {
    const wordWithoutDefinitions = 'やっと';
    const result = await parser.parseSentence(`${wordWithoutDefinitions}着いた。`);
    expect(result.map((r) => r.token.map((t) => t.original).join(''))).toEqual(['やっと', '着いた', '。']);
  });
});
