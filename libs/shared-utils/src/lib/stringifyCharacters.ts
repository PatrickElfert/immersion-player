import { Character } from '@immersion-player/shared-types';

export function stringifyCharacters(characters: Character[]) {
  return characters
    .map((char) => (char.furigana ? `${char.original}[${char.furigana}]` : `${char.original}[]`))
    .join('');
}
