import { KuromojiToken, tokenize } from 'kuromojin';
import { getDeinflections } from './deinflect';
import { JmDictionary } from './dictionaries/JmDict';
import { DictionaryEntry } from '@immersion-player/shared-types';

export class Parser {
  dictionary: JmDictionary

  constructor(path: string) {
    this.dictionary = new JmDictionary(path)
  }

  async parseSentence(sentence: string, scanLength = 4) {
    const morphemes = structuredClone(await this.getMorphemes(sentence));
    return this.getLookupResults(morphemes, scanLength);
  }

  getLookupResults(
    morphemes: KuromojiToken[],
    scanLength: number
  ): DictionaryEntry[] {
    const morphemeGroups = this.getMorphemeGroups(morphemes, scanLength);
    const result: DictionaryEntry[] = [];

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
        const dictionaryEntries = this.lookupTokensInDictionary(lookupTokens);

        if (dictionaryEntries.length > 0) {
          /** remove the currently processed group **/
          morphemeGroups.shift();

          if (remainingMorphemes.length > 0) {
            /** create a new group to be processed if there are remaining morphemes **/
            morphemeGroups.unshift(remainingMorphemes);
          }

          result.push(...dictionaryEntries);
          break;
        }

        /** Save remaining morphemes that will not be processed with this group **/
        remainingMorphemes.push(currentGroup[currentGroup.length - 1]);

        /** remove the last morpheme from this group to find a smaller word **/
        currentGroup.pop();
      }
    }

    return result;
  }

  lookupTokensInDictionary(tokens: { token: string; baseForm: string }[]) {
    const result: DictionaryEntry[] = [];
    for (const token of tokens) {
      const dictionaryEntry = this.dictionary.getEntry(token.baseForm);
      if (dictionaryEntry) {
        result.push(dictionaryEntry);
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
}
