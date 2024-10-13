import { Parser } from './feature-dictionary-lookup';

const parser = new Parser('./jmdict-all-3.5.0.json');

describe('featureDictionaryLookup', () => {
  it('parses a sentence', async () => {
    const result = await parser.parseSentence(
      '私の一番好きな食べ物はりんごです'
    );
    console.log(result);
    expect(result).toBeTruthy();
  });
});
