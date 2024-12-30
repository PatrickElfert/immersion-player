import { readFileSync } from 'fs';

export type DictionaryModel = { [word: string]: { definitions: string[] } };

export abstract class Dictionary<T> {

  constructor(path: string) {
    this.wordMap = this.initializeDictionary(JSON.parse(readFileSync(path, { encoding: 'utf8' })));
  }

  wordMap: DictionaryModel = {};

  abstract initializeDictionary(dict: T): DictionaryModel;

  getDefinitions(word: string): string[]{
    if(this.wordMap[word]) {
      return this.wordMap[word].definitions
    }
    return [];
  }
}
