import { KnownWordsStatus } from './user-settings.js';

export type Character = {
  original: string;
  furigana: string | null;
}

export type LookupResult = {
  /** The part of a subtitle that got processed **/
  token: Character[];
  status: KnownWordsStatus;
  /** Key is the deinflected term that got looked up in the dictionary
   * **/
  dictionaryResults: DictionaryResults;
};

export type Definition = {
  text: string;
  description: string;
}

export type DictionaryResult = {
  definitions: Definition[];
  token: Character[]
}

export type DictionaryResults = {[key: string]: DictionaryResult}


