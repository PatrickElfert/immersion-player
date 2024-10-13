import { JMdict, JMdictWord } from "@scriptin/jmdict-simplified-types";
import { PathLike} from "fs";
import { readFileSync } from "fs";
import { join } from "path";
import { tokenize } from "kuromojin";
import {runOnInflectionRoots} from "./deinflect";

export type DictionaryWordMap = { [word: string]: JMdictWord };
export type DictionaryResultMap = {[word: string]: JMdictWord[]}

export class Parser {
  dictionary: DictionaryWordMap;

  constructor(path: string) {
    this.dictionary = this.createMapFromDictionary(
      JSON.parse(readFileSync(join(__dirname, path), { encoding: "utf8" })),
    );
  }

  async parseSentence(sentence: string) {
    const tokens = (await this.getMorphemes(sentence)).map((token) => token);
    const morphemes = tokens.map((token) => token.surface_form);

    const parsedTokens: DictionaryResultMap = {};
    for (let i = 0; i < morphemes.length; i++) {

      let currentDictionaryResults: JMdictWord[]  = [];
      let currentSearchTerm: string | null = null;

      for (let j = i + 1; j < morphemes.length; j++) {
        const searchTerm = morphemes.slice(i, j).join("");

        const dictionaryResults = this.lookup(searchTerm);

        if (dictionaryResults.length > 0) {
          currentSearchTerm = searchTerm;
          currentDictionaryResults = dictionaryResults;
        }
      }
      //Todo handle comma, point etc...
      if (currentSearchTerm && currentDictionaryResults.length > 0) {
        parsedTokens[currentSearchTerm] = currentDictionaryResults;
      }
    }
    return parsedTokens;
  }

  private lookup(term: string) {
    const deinflectionOutput = runOnInflectionRoots(term);
    const dictionaryResults: JMdictWord[] = []
    for(const deinflection in deinflectionOutput) {
      const dictWord = this.dictionary[deinflection];
      if(dictWord) {
        dictionaryResults.push(dictWord);
      }
    }
    return dictionaryResults;
  }

  private async getMorphemes(sentence: string) {
    return await tokenize(sentence);
  }

  private createMapFromDictionary(dictionary: JMdict) {
    const map: { [word: string]: JMdictWord } = {};

    for (const entry of dictionary.words) {
      for (const kanji of entry.kanji) {
        map[kanji.text] = entry;
      }
      for (const kana of entry.kana) {
        map[kana.text] = entry;
      }
    }

    return map;
  }
}
