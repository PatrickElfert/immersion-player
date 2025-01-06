export interface CreateFlashcardDto {
  sentence: string;
  targetWord: string;
  definitions: Definition[];
  startTime: number;
  endTime: number;
  filePath: string;
}

export interface Definition {
  text: string;
  description: string;
}
