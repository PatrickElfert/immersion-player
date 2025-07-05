import { Character, Definition } from './lookup-result.js';

export type CreateFlashcardDto = {
  sentenceBack: Character[];
  sentenceFront: string;
  targetWords: TargetWord[];
  startTime: number;
  endTime: number;
  filePath: string;
}

export type TargetWord = {
  token: Character[];
  definitions: Definition[];
}

export type AnkiCardDto = {
  image: string;
  sentenceAudio: string;
  targetWords: string;
  sentenceBack: string;
  sentenceFront: string;
}
