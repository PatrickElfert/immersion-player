import { Character, Definition } from './lookup-result.js';

export interface CreateFlashcardDto {
  sentenceBack: Character[];
  sentenceFront: string;
  definitions: Definition[];
  startTime: number;
  endTime: number;
  filePath: string;
}
