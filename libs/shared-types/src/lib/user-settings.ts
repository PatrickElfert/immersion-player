import { ModelFields } from './anki-fields.js';

export type UserSettings = {
    mediaFolder: string;
    modelFields: ModelFields | null;
    knownWords: KnownWordMap;
}

export type KnownWord = {status: KnownWordsStatus}
export type KnownWordMap = {[word: string]: KnownWord}
export type KnownWordsStatus = 'KNOWN' | 'UNKNOWN' | 'MINED' | 'LEECH';
