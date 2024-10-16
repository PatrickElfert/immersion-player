import { JMdict, JMdictWord } from '@scriptin/jmdict-simplified-types';
import { readFileSync } from 'fs';
import { join } from 'path';
import { KuromojiToken, tokenize } from 'kuromojin';
import { getDeinflections } from './deinflect';

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
    const morphemes = await this.getMorphemes(sentence);
    return this.getLookupResults(morphemes, scanLength);
  }

  getLookupResults(morphemes: KuromojiToken[], scanLength: number) {
    const morphemeGroups = this.getMorphemeGroups(morphemes, scanLength);
    const lookupResults = [];

    while (morphemeGroups.length > 0) {
      const currentGroup = morphemeGroups[0];

      const remainingMorphemes: string[] = [];
      while (currentGroup.length > 0) {
        /** always start with the longest possible morpheme combination **/
        const token = currentGroup.join('');
        const deinflectedTokens = getDeinflections(token);

        /** If we don't find any deinflections we expect the word is already in its base form **/
        const lookupTokens =
          deinflectedTokens.length > 0
            ? deinflectedTokens.map((baseForm) => ({
                token,
                baseForm,
              }))
            : [{ token, baseForm: token }];
        const dictionaryLookup = this.lookupTokensInDictionary(lookupTokens);

        if (dictionaryLookup.length > 0) {

          /** remove the currently processed group **/
          morphemeGroups.shift();

          if(remainingMorphemes.length > 0) {
            /** create a new group to be processed if there are remaining morphemes **/
            morphemeGroups.unshift(remainingMorphemes)
          }

          lookupResults.push(...dictionaryLookup);
          break;
        }

        /** Save remaining morphemes that will not be processed with this group **/
        remainingMorphemes.push(currentGroup[currentGroup.length - 1]);

        /** remove the last morpheme from this group to find a smaller word **/
        currentGroup.pop();
      }
    }

    return lookupResults;
  }

  lookupTokensInDictionary(tokens: { token: string; baseForm: string }[]) {
    const result = [];
    for (const token of tokens) {
      const lookupResult = this.dictionary[token.baseForm];
      if (lookupResult) {
        result.push({ token: token.token, lookupResult });
      }
    }
    return result;
  }

  /** Returns multiple groups of morphemes which could represent a dictionary entry **/
  getMorphemeGroups(morphemes: KuromojiToken[], scanLength: number) {
    const morphemeGroups: string[][] = [];
    while (morphemes.length > 0) {
      const morphemesToGroup = morphemes.slice(0, scanLength);
      const groupedMorphemes = this.tryGroupMorphemes(morphemesToGroup);

      morphemeGroups.push(groupedMorphemes.map((m) => m.surface_form));
      morphemes.splice(0, groupedMorphemes.length);
    }
    return morphemeGroups;
  }

  tryGroupMorphemes(morphemes: KuromojiToken[]): KuromojiToken[] {
    const groupedMorphemes = [morphemes[0]];
    for (const [index, morpheme] of morphemes.entries()) {
      const morphemeToJoinWith = morphemes[index + 1];
      if (
        morphemeToJoinWith &&
        this.canGroupMorphemes([morpheme, morphemeToJoinWith])
      ) {
        groupedMorphemes.push(morphemeToJoinWith);
      } else {
        break;
      }
    }
    return groupedMorphemes;
  }

  /** Validates if it makes sense to join two morphemes based on their pos **/
  canGroupMorphemes(morphemes: [KuromojiToken, KuromojiToken]): boolean {
    const firstToken = morphemes[0];
    const secondToken = morphemes[1];

    /** Avoid joining anything with particles **/
    if (secondToken.pos === '助詞' || firstToken.pos === '助詞') {
      return false;
    }

    return true;
  }

  /** Breaks sentence into morphemes using kuromoji **/
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
}
