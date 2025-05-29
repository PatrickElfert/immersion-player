import { Dictionary, DictionaryModel } from '../dictionary.js';
import { JMdict, JMdictWord } from '@scriptin/jmdict-simplified-types';

function getDefinitions(entry: JMdictWord) {
  return entry.sense.filter(s => s.gloss[0].lang === 'eng').map((s) => ({
    description: s.info.join('; '),
    text: s.gloss.map(g => g.text).join('; '),
  }));
}

export class JmDictionary extends Dictionary<JMdict> {
  override initializeDictionary(dict: JMdict): DictionaryModel {
    const map: DictionaryModel = {};

    for (const entry of dict.words) {
      let kanjiAdded = false;

      for (const kanji of entry.kanji) {
        if (!map[kanji.text]) {
          map[kanji.text] = { definitions: [], sense: [] };
        }
        map[kanji.text].definitions.push(...getDefinitions(entry));
        map[kanji.text].sense = entry.sense;
        kanjiAdded = true;
      }

      if (!kanjiAdded) {
        for (const kana of entry.kana) {
          if (!map[kana.text]) {
            map[kana.text] = { definitions: [], sense: [] };
            map[kana.text].definitions.push(...getDefinitions(entry));
            map[kana.text].sense = entry.sense;
          }
        }
      }
    }

    return map;
  }
}
