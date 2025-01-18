import { Character, Definition } from './lookup-result';

export interface CreateFlashcardDto {
  sentenceBack: Character[];
  sentenceFront: string;
  definitions: Definition[];
  startTime: number;
  endTime: number;
  filePath: string;
}
