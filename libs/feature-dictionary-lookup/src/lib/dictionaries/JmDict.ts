import { Dictionary, DictionaryModel } from '../dictionary';
import { JMdict, JMdictWord } from '@scriptin/jmdict-simplified-types';

function getDefinitions(entry: JMdictWord) {
  return entry.sense.flatMap((s) => s.gloss.filter((g) => g.lang === 'eng').map((g) => g.text));
}

export class JmDictionary extends Dictionary<JMdict> {

  override initializeDictionary(dict: JMdict): DictionaryModel {
    const map: DictionaryModel = {};

    for (const entry of dict.words) {
      for (const kanji of entry.kanji) {
        if (!map[kanji.text]) {
          map[kanji.text] = {definitions: []};
        }
        map[kanji.text].definitions.push(...getDefinitions(entry));
      }
      for (const kana of entry.kana) {
        if (!map[kana.text]) {
          map[kana.text] = {definitions: []};
        }
        map[kana.text].definitions.push(...getDefinitions(entry));
      }
    }
    return map;
  }

}
