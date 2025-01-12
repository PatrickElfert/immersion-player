import { Definition } from './lookup-result';

export interface CreateFlashcardDto {
  sentence: string;
  definitions: Definition[];
  startTime: number;
  endTime: number;
  filePath: string;
}
