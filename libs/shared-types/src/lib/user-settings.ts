import { ModelFields } from './anki-fields.js';

export type UserSettings = {
    mediaFolder: string;
    knownWords: KnownWord[] | null;
    modelFields: ModelFields | null;
}

export type KnownWord = {text: string, status: KnownWordsStatus}
export type KnownWordsStatus = 'KNOWN' | 'UNKNOWN' | 'MINED' | 'LEECH';
