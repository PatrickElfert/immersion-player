import { readFileSync } from 'fs';
import { JMdictSense } from '@scriptin/jmdict-simplified-types';

export type DictionaryModel = {
  [word: string]: { definitions: { text: string; description: string }[]; sense: JMdictSense[] };
};

export abstract class Dictionary<T> {
  constructor(path: string) {
    this.wordMap = this.initializeDictionary(JSON.parse(readFileSync(path, { encoding: 'utf8' })));
  }

  wordMap: DictionaryModel = {};

  abstract initializeDictionary(dict: T): DictionaryModel;

  getDefinitions(word: string) {
    if (this.wordMap[word]) {
      return this.wordMap[word].definitions;
    }
    return [];
  }
}
