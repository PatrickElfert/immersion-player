import { AnkiFields } from './anki-fields.js';

export type UserSettings = {
    mediaFolder: string;
    knownWords: KnownWord[]
    selectedModelFields: AnkiFields[]
}

export type KnownWord = {text: string, status: KnownWordsStatus}
export type KnownWordsStatus = 'KNOWN' | 'UNKNOWN' | 'MINED' | 'LEECH';
