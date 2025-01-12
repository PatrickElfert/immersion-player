export type Character = {
  original: string;
  furigana: string | null;
}

export type LookupResult = {
  /** The part of a subtitle that got processed **/
  token: Character[];
  /** All of the definitions that got found
   * This can be more then one if multiple different deinflected version are produced**/
  definitions: Definition[][];
};

export type Definition = {
  /** the deinflected version that was searched for **/
  token: Character[];
  text: string;
  description: string;
}
