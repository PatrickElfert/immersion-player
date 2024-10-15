import { JMdict, JMdictWord } from '@scriptin/jmdict-simplified-types';
import { readFileSync } from 'fs';
import { join } from 'path';
import { tokenize } from 'kuromojin';
import { runOnInflectionRoots } from './deinflect';

export interface LookupResult {
  dictionary: 'JMdict';
  translations: string[];
}

export type DictionaryWordMap = { [word: string]: JMdictWord[] };
export type DictionaryResultMap = { [word: string]: LookupResult[] };

export class Parser {
  dictionary: DictionaryWordMap;

  constructor(path: string) {
    this.dictionary = this.createMapFromDictionary(
      JSON.parse(readFileSync(join(__dirname, path), { encoding: 'utf8' }))
    );
  }

  async parseSentence(sentence: string, scanLength = 4) {
    const tokens = await this.getMorphemes(sentence);
    const morphemes = tokens.map((token) => token);

    const parsedTokens: DictionaryResultMap = {};
    for (let i = 0; i < morphemes.length; i++) {
      let currentDictionaryResults: LookupResult[] = [];
      let currentSearchTerm: string | null = null;

      for (let j = i + 1; j <= morphemes.length && j < i + scanLength; j++) {

        const searchTerm = morphemes
          .slice(i, j)
          .map((m) => m.surface_form)
          .join('');

        const dictionaryResults = this.lookup(searchTerm);
        if (dictionaryResults.length > 0) {
          currentSearchTerm = searchTerm;
          currentDictionaryResults = dictionaryResults;
        }

        /** Avoids joining words with particles **/
        if(morphemes[j]?.pos === '助詞') {
          break;
        }
      }
      if (currentSearchTerm && currentDictionaryResults.length > 0) {
        parsedTokens[currentSearchTerm] = currentDictionaryResults;
      }
    }
    return parsedTokens;
  }

  private lookup(term: string) {
    const deinflectionOutput = runOnInflectionRoots(term);
    const dictionaryResults: LookupResult[] = [];
    if (deinflectionOutput.length > 0) {
      for (const deinflection of deinflectionOutput) {
        const dictWords = this.dictionary[deinflection];
        if (dictWords?.length > 0) {
          dictionaryResults.push(...dictWords.map(this.toLookupResult));
        }
      }
    } else {
      const dictWords = this.dictionary[term];
      if (dictWords?.length > 0) {
        dictionaryResults.push(...dictWords.map(this.toLookupResult));
      }
    }
    return dictionaryResults;
  }

  private async getMorphemes(sentence: string) {
    return await tokenize(sentence);
  }

  private createMapFromDictionary(dictionary: JMdict) {
    const map: { [word: string]: JMdictWord[] } = {};

    for (const entry of dictionary.words) {
      for (const kanji of entry.kanji) {
        if (!map[kanji.text]) {
          map[kanji.text] = [];
        }
        map[kanji.text].push(entry);
      }
      for (const kana of entry.kana) {
        if (!map[kana.text]) {
          map[kana.text] = [];
        }
        map[kana.text].push(entry);
      }
    }

    return map;
  }

  private toLookupResult(word: JMdictWord): LookupResult {
    return {
      dictionary: 'JMdict',
      translations: [...word.sense[0].gloss.map((s) => s.text)],
    };
  }
}
