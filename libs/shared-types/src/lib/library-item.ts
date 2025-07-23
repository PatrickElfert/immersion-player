export interface LanguageFile {
  path: string;
  languageCode: string;
}

export interface LibraryItem {
  name: string;
  path: string;
  language: LanguageFile[];
  thumbnail: string | null;
  id: string;
}
