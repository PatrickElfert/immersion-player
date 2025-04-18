import { DeinflectionTest, runTests } from '../../deinflect-test';

const tests: DeinflectionTest[] = [
  {
    input: '食べない',
    output: ['食べる'],
    description: 'negative ichidan',
  },
  {
    input: '話さない',
    output: ['話す'],
    description: 'negative す',
  },
  {
    input: '書かない',
    output: ['書く'],
    description: 'negative く',
  },
  {
    input: '泳がない',
    output: ['泳ぐ'],
    description: 'negative ぐ',
  },
  {
    input: '遊ばない',
    output: ['遊ぶ'],
    description: 'negative ぶ',
  },
  {
    input: '待たない',
    output: ['待つ'],
    description: 'negative つ',
  },
  {
    input: '歩まない',
    output: ['歩む'],
    description: 'negative む',
  },
  {
    input: '死なない',
    output: ['死ぬ'],
    description: 'negative ぬ',
  },
  {
    input: '買わない',
    output: ['買う'],
    description: 'negative わ',
  },
  {
    input: '取らない',
    output: ['取る'],
    description: 'negative る',
  },
  {
    input: '知らない',
    output: ['知る'],
    description: 'negative ら',
  },
  {
    input: 'しない',
    output: ['する'],
    description: 'negative する',
  },
  {
    input: 'こない',
    output: ['くる'],
    description: 'negative くる',
  },
  {
    input: 'ない',
    output: ['ある'],
    description: 'negative ある',
  },
  {
    input: '食べた',
    output: ['食べる'],
    description: 'past tense ichidan',
  },
  {
    input: '話した',
    output: ['話す'],
    description: 'past tense す',
  },
  {
    input: '書いた',
    output: ['書く'],
    description: 'past tense く',
  },
  {
    input: '泳いだ',
    output: ['泳ぐ'],
    description: 'past tense ぐ',
  },
  {
    input: '遊んだ',
    output: ['遊ぶ'],
    description: 'past tense ぶ',
  },
  {
    input: '待った',
    output: ['待つ'],
    description: 'past tense つ',
  },
  {
    input: '歩んだ',
    output: ['歩む'],
    description: 'past tense む',
  },
  {
    input: '死んだ',
    output: ['死ぬ'],
    description: 'past tense ぬ',
  },
  {
    input: '買った',
    output: ['買う'],
    description: 'past tense う',
  },
  {
    input: '取った',
    output: ['取る'],
    description: 'past tense る',
  },
  { input: '食べなかった', output: ['食べる'], description: 'past negative ichiban' },
  { input: '話さなかった', output: ['話す'], description: 'past negative す' },
  {
    input: '書かなかった',
    output: ['書く'],
    description: 'past negative く',
  },
  {
    input: '泳がなかった',
    output: ['泳ぐ'],
    description: 'past negative ぐ',
  },
  {
    input: '遊ばなかった',
    output: ['遊ぶ'],
    description: 'past negative ぶ',
  },
  {
    input: '持たなかった',
    output: ['持つ'],
    description: 'past negative つ',
  },
  {
    input: '歩まなかった',
    output: ['歩む'],
    description: 'past negative む',
  },
  {
    input: '死ななかった',
    output: ['死ぬ'],
    description: 'past negative ぬ',
  },
  {
    input: '買わなかった',
    output: ['買う'],
    description: 'past negative う',
  },
  {
    input: '切らなかった',
    output: ['切る'],
    description: 'past negative る',
  },
  {
    input: 'しなかった',
    output: ['する'],
    description: 'past negative する',
  },
  {
    input: 'こなかった',
    output: ['くる'],
    description: 'past negative くる',
  },
  {
    input: 'なかった',
    output: ['ある'],
    description: 'past negative ある',
  },
  {
    input: '食べました',
    output: ['食べる'],
    description: 'polite ichidan',
  },
  {
    input: '話します',
    output: ['話す'],
    description: 'polite す',
  },
  {
    input: '書きます',
    output: ['書く'],
    description: 'polite く',
  },
  {
    input: '泳ぎます',
    output: ['泳ぐ'],
    description: 'polite ぐ',
  },
  {
    input: '遊びます',
    output: ['遊ぶ'],
    description: 'polite ぶ',
  },
  {
    input: '待ちます',
    output: ['待つ'],
    description: 'polite つ',
  },
  {
    input: '飲みます',
    output: ['飲む'],
    description: 'polite む',
  },
  {
    input: '死にます',
    output: ['死ぬ'],
    description: 'polite ぬ',
  },
  {
    input: '買います',
    output: ['買う'],
    description: 'polite う',
  },
  {
    input: '取ります',
    output: ['取る'],
    description: 'polite る',
  },
  {
    input: 'します',
    output: ['する'],
    description: 'polite する',
  },
  {
    input: 'きます',
    output: ['くる'],
    description: 'polite くる',
  },
  {
    input: '食べました',
    output: ['食べる'],
    description: 'polite past ichidan',
  },
  {
    input: '話しました',
    output: ['話す'],
    description: 'polite past す',
  },
  {
    input: '書きました',
    output: ['書く'],
    description: 'polite past く',
  },
  {
    input: '泳ぎました',
    output: ['泳ぐ'],
    description: 'polite past ぐ',
  },
  {
    input: '遊びました',
    output: ['遊ぶ'],
    description: 'polite past ぶ',
  },
  {
    input: '待ちました',
    output: ['待つ'],
    description: 'polite past つ',
  },
  {
    input: '飲みました',
    output: ['飲む'],
    description: 'polite past む',
  },
  {
    input: '死にました',
    output: ['死ぬ'],
    description: 'polite past ぬ',
  },
  {
    input: '買いました',
    output: ['買う'],
    description: 'polite past う',
  },
  {
    input: '取りました',
    output: ['取る'],
    description: 'polite past る',
  },
  {
    input: 'しました',
    output: ['する'],
    description: 'polite past する',
  },
  {
    input: 'きました',
    output: ['くる'],
    description: 'polite past くる',
  },
  {
    input: '食べません',
    output: ['食べる'],
    description: 'polite negative ichidan',
  },
  {
    input: '話しません',
    output: ['話す'],
    description: 'polite negative す',
  },
  {
    input: '書きません',
    output: ['書く'],
    description: 'polite negative く',
  },
  {
    input: '泳ぎません',
    output: ['泳ぐ'],
    description: 'polite negative ぐ',
  },
  {
    input: '遊びません',
    output: ['遊ぶ'],
    description: 'polite negative ぶ',
  },
  {
    input: '待ちません',
    output: ['待つ'],
    description: 'polite negative つ',
  },
  {
    input: '飲みません',
    output: ['飲む'],
    description: 'polite negative む',
  },
  {
    input: '死にません',
    output: ['死ぬ'],
    description: 'polite negative ぬ',
  },
  {
    input: '買いません',
    output: ['買う'],
    description: 'polite negative う',
  },
  {
    input: '取りません',
    output: ['取る'],
    description: 'polite negative る',
  },
  {
    input: 'しません',
    output: ['する'],
    description: 'polite negative する',
  },
  {
    input: 'きません',
    output: ['くる'],
    description: 'polite negative くる',
  },
  {
    input: '食べませんでした',
    output: ['食べる'],
    description: 'polite past negative ichidan',
  },
  {
    input: '話しませんでした',
    output: ['話す'],
    description: 'polite past negative す',
  },
  {
    input: '書きませんでした',
    output: ['書く'],
    description: 'polite past negative く',
  },
  {
    input: '泳ぎませんでした',
    output: ['泳ぐ'],
    description: 'polite past negative ぐ',
  },
  {
    input: '遊びませんでした',
    output: ['遊ぶ'],
    description: 'polite past negative ぶ',
  },
  {
    input: '待ちませんでした',
    output: ['待つ'],
    description: 'polite past negative つ',
  },
  {
    input: '飲みませんでした',
    output: ['飲む'],
    description: 'polite past negative む',
  },
  {
    input: '死にませんでした',
    output: ['死ぬ'],
    description: 'polite past negative ぬ',
  },
  {
    input: '買いませんでした',
    output: ['買う'],
    description: 'polite past negative う',
  },
  {
    input: '取りませんでした',
    output: ['取る'],
    description: 'polite past negative る',
  },
  {
    input: 'しませんでした',
    output: ['する'],
    description: 'polite past negative する',
  },
  {
    input: 'きませんでした',
    output: ['くる'],
    description: 'polite past negative くる',
  },
  {
    input: '食べよう',
    output: ['食べる'],
    description: 'volitional ichidan',
  },
  {
    input: '話そう',
    output: ['話す'],
    description: 'volitional す',
  },
  {
    input: '書こう',
    output: ['書く'],
    description: 'volitional く',
  },
  {
    input: '泳ごう',
    output: ['泳ぐ'],
    description: 'volitional ぐ',
  },
  {
    input: '遊ぼう',
    output: ['遊ぶ'],
    description: 'volitional ぶ',
  },
  {
    input: '待とう',
    output: ['待つ'],
    description: 'volitional つ',
  },
  {
    input: '飲もう',
    output: ['飲む'],
    description: 'volitional む',
  },
  {
    input: '死のう',
    output: ['死ぬ'],
    description: 'volitional ぬ',
  },
  {
    input: '買おう',
    output: ['買う'],
    description: 'volitional う',
  },
  {
    input: '取ろう',
    output: ['取る'],
    description: 'volitional る',
  },
  {
    input: 'しよう',
    output: ['する'],
    description: 'volitonal する',
  },
  {
    input: 'きょう',
    output: ['くる'],
    description: 'volitional くる',
  },
  {
    input: '読んでいる',
    output: ['読む'],
    description: 'progressive でいる',
  },
  {
    input: '話している',
    output: ['話す'],
    description: 'progressive ている'
  },
  {
    input: '食べられる',
    output: ['食べる'],
    description: 'potential ichidan',
  },
  {
    input: '話せる',
    output: ['話す'],
    description: 'potential す',
  },
  {
    input: '書ける',
    output: ['書く'],
    description: 'potential く',
  },
  {
    input: '泳げる',
    output: ['泳ぐ'],
    description: 'potential ぐ',
  },
  {
    input: '遊べる',
    output: ['遊ぶ'],
    description: 'potential ぶ',
  },
  {
    input: '待てる',
    output: ['待つ'],
    description: 'potential つ',
  },
  {
    input: '飲める',
    output: ['飲む'],
    description: 'potential む',
  },
  {
    input: '死ねる',
    output: ['死ぬ'],
    description: 'potential ぬ',
  },
  {
    input: '買える',
    output: ['買う'],
    description: 'potential う',
  },
  {
    input: '取れる',
    output: ['取る'],
    description: 'potential る',
  },
  //Todo: Fix this
  {
    input: 'できる',
    output: ['する'],
    description: 'potential する',
  },
  {
    input: 'こられる',
    output: ['くる'],
    description: 'potential くる',
  }
];

describe('Deinflection verbs', () => {
  runTests(tests);
});
