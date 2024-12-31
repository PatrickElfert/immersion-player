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

  it('ignores special characters', async () => {
    const result = await parser.parseSentence('明日は、友達とラーメンを食べたいです。');
    expect(result.map((r) => r.token)).toEqual([
      '明日',
      'は',
      '、',
      '友達',
      'と',
      'ラーメン',
      'を',
      '食べたい',
      'です',
      '。'
    ]);
  });

  it('sentence test', async () => {
    const result = await parser.parseSentence(' 常勤さんがいるおかげで僕のかわいさが引き立っよ');
    expect(result.map((r) => r.token)).toEqual([
      '常勤',
      'さん',
      'が',
      'いる',
      'おかげ',
      'で',
      '僕',
      'の',
      'かわい',
      'さ',
      'が',
      '引き立っよ'
    ]);
  });
});
