import { readFileSync } from 'fs';
import { DictionaryEntry } from '@immersion-player/shared-types';

export type DictionaryModel = { [word: string]: { definitions: string[] } };

export abstract class Dictionary<T> {

  constructor(path: string) {
    this.wordMap = this.initializeDictionary(JSON.parse(readFileSync(path, { encoding: 'utf8' })));
  }

  wordMap: DictionaryModel = {};

  abstract initializeDictionary(dict: T): DictionaryModel;

  getEntry(word: string): DictionaryEntry | null {
    if(this.wordMap[word]) {
      return { word, definitions: this.wordMap[word].definitions };
    }
    return null;
  }
}
