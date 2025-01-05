export interface CreateFlashcardDto {
  sentence: string;
  targetWord: string;
  definitions: Definition[];
  startTime?: string;
  endTime?: string;
  filePath: string;
}

export interface Definition {
  text: string;
  description: string;
}
