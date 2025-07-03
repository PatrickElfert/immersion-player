import { KuromojiToken, tokenize } from 'kuromojin';
import { getDeinflections } from './deinflect.js';
import { JmDictionary } from './dictionaries/JmDict.js';
import {
  Character,
  Definition,
  DictionaryResult,
  KnownWordMap,
  KnownWordsStatus,
  LookupResult
} from '@immersion-player/shared-types';
import { isHiragana, toHiragana } from 'wanakana';

export class Parser {
  dictionary: JmDictionary;
  knownWords: KnownWordMap;
  MAX_GROUPING_ATTEMPTS = 20;

  constructor(path: string, knownWords: KnownWordMap) {
    this.dictionary = new JmDictionary(path);
    this.knownWords = knownWords;
  }

  async parseSentence(sentence: string, scanLength = 4) {
    const morphemes = structuredClone(await this.getMorphemes(sentence));
    return await this.getLookupResults(morphemes, scanLength);
  }

  async getLookupResults(morphemes: KuromojiToken[], scanLength: number): Promise<LookupResult[]> {
    const morphemeGroups = this.getMorphemeGroups(morphemes, scanLength);
    const lookupResults: LookupResult[] = [];

    while (morphemeGroups.length > 0) {
      const currentGroup = morphemeGroups[0];

      const remainingMorphemes: string[] = [];
      for (let i = 0; i < this.MAX_GROUPING_ATTEMPTS; i++) {
        /** always start with the longest possible morpheme combination **/
        const token = currentGroup.join('');
        const deinflectedTokens = getDeinflections(token);

        /** If we don't find any deinflections we expect the word is already in its base form **/
        const terms = deinflectedTokens.length > 0 ? deinflectedTokens.map((baseForm) => baseForm) : [token];
        const dictionaryResults = await this.lookupTermsInDictionary(terms);

        if (dictionaryResults.size > 0) {
          /** remove the currently processed group **/
          morphemeGroups.shift();

          if (remainingMorphemes.length > 0) {
            /** create a new group to be processed if there are remaining morphemes **/
            morphemeGroups.unshift(remainingMorphemes);
          }

          const lookupResult = await this.createLookupResult(token, dictionaryResults);
          lookupResults.push(lookupResult);

          break;
        }

        if (currentGroup.length > 1) {
          /** Save remaining morphemes that will not be processed with this group **/
          remainingMorphemes.unshift(currentGroup[currentGroup.length - 1]);

          /** remove the last morpheme from this group to find a smaller word **/
          currentGroup.pop();
        } else {
          /** we could not find a word for this item **/
          morphemeGroups.shift();

          if (remainingMorphemes.length > 0) {
            morphemeGroups.unshift(remainingMorphemes);
          }

          const lookupResult = await this.createLookupResult(token, dictionaryResults);
          lookupResults.push(lookupResult);
          break;
        }
      }
    }

    return lookupResults;
  }

  async createLookupResult(token: string, dictionaryResults: Map<string, DictionaryResult>) {
    /** We use the first deinflected term to determine the word status
     * In the future there could be a more advanced way to determine this **/
    const firstTerm = dictionaryResults.keys().next().value;

    return {
      token: await this.getCharacters(token),
      dictionaryResults,
      status: this.determineWordsStatus(firstTerm)
    };
  }

  determineWordsStatus(token: string): KnownWordsStatus {
    if (this.knownWords[token]) {
      return this.knownWords[token].status;
    }

    return 'UNKNOWN';
  }

  async lookupTermsInDictionary(terms: string[]): Promise<Map<string, DictionaryResult>> {
    const goodTerms = terms.filter(term =>
      this.dictionary.getDefinitions(term).length > 0
    );

    const entries = await Promise.all(
      goodTerms.map(async term => {
        const token       = await this.getCharacters(term);
        const definitions = this.dictionary.getDefinitions(term);
        return [term, { definitions, token }] as const;
      })
    );

    return new Map(entries);
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
      if (morphemeToJoinWith && this.canGroupMorphemes([morpheme, morphemeToJoinWith])) {
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

    /** Avoid joining anything with Symbols like 。or 、**/
    if (secondToken.pos === '記号' || firstToken.pos === '記号') {
      return false;
    }

    return true;
  }

  /** Breaks sentence into morphemes using kuromoji **/
  private async getMorphemes(sentence: string) {
    return await tokenize(sentence);
  }

  private async getCharacters(text: string): Promise<Character[]> {
    const tokens = await tokenize(text);
    return tokens.map((t) => ({
      original: t.surface_form,
      furigana: isHiragana(t.surface_form) ? null : toHiragana(t.reading),
    }));
  }
}
