import { Parser } from './feature-dictionary-lookup';

const parser = new Parser('./jmdict-all-3.5.0.json');

describe('featureDictionaryLookup', () => {
  it('parses a sentence', async () => {
    const result = await parser.parseSentence(
      '今日は友達と学校に行きます'
    );
    expect(result).toBeTruthy();
  });
});
