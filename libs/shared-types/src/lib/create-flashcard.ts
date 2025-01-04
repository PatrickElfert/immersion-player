import { PossibleDefinitions } from './lookup-result';

export interface CreateFlashcardDto {
  sentence: string;
  targetWord: string;
  definitions: PossibleDefinitions;
  timeFrom: number;
  timeTo: number;
  filePath: string;
}
