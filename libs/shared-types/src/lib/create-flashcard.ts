import { Character, Definition } from './lookup-result.js';

export type CreateFlashcardDto = {
  sentenceBack: Character[];
  sentenceFront: string;
  targetWords: Map<string, TargetWord[]>;
  startTime: number;
  endTime: number;
  filePath: string;
}

type TargetWord = {
  token: Character[];
  definitions: Definition[];
}
