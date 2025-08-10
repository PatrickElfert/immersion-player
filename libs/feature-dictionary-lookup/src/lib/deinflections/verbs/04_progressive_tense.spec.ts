import { DeinflectionTest, runTests } from '../../deinflect-test.js';

const tests: DeinflectionTest[] = [
  // Ichidan progressive
  { input: '食べている', output: ['食べる'], description: 'progressive ichidan 食べる' },
  { input: '食べていない', output: ['食べる'], description: 'progressive negative ichidan 食べる' },
  { input: '食べています', output: ['食べる'], description: 'progressive polite ichidan 食べる' },
  { input: '食べていません', output: ['食べる'], description: 'progressive polite negative ichidan 食べる' },

  // Godan progressive (cover major te-form groups)
  { input: '話している', output: ['話す'], description: 'progressive godan す → して' },
  { input: '話していない', output: ['話す'], description: 'progressive negative godan す → して' },
  { input: '話しています', output: ['話す'], description: 'progressive polite godan す → して' },
  { input: '話していません', output: ['話す'], description: 'progressive polite negative godan す → して' },

  { input: '書いている', output: ['書く'], description: 'progressive godan く → いて' },
  { input: '書いていない', output: ['書く'], description: 'progressive negative godan く → いて' },
  { input: '書いています', output: ['書く'], description: 'progressive polite godan く → いて' },
  { input: '書いていません', output: ['書く'], description: 'progressive polite negative godan く → いて' },

  { input: '泳いでいる', output: ['泳ぐ'], description: 'progressive godan ぐ → いで' },
  { input: '泳いでいない', output: ['泳ぐ'], description: 'progressive negative godan ぐ → いで' },
  { input: '泳いでいます', output: ['泳ぐ'], description: 'progressive polite godan ぐ → いで' },
  { input: '泳いでいません', output: ['泳ぐ'], description: 'progressive polite negative godan ぐ → いで' },

  { input: '飲んでいる', output: ['飲む'], description: 'progressive godan む → んで' },
  { input: '飲んでいない', output: ['飲む'], description: 'progressive negative godan む → んで' },
  { input: '飲んでいます', output: ['飲む'], description: 'progressive polite godan む → んで' },
  { input: '飲んでいません', output: ['飲む'], description: 'progressive polite negative godan む → んで' },

  { input: '遊んでいる', output: ['遊ぶ'], description: 'progressive godan ぶ → んで' },
  { input: '遊んでいない', output: ['遊ぶ'], description: 'progressive negative godan ぶ → んで' },
  { input: '遊んでいます', output: ['遊ぶ'], description: 'progressive polite godan ぶ → んで' },
  { input: '遊んでいません', output: ['遊ぶ'], description: 'progressive polite negative godan ぶ → んで' },

  { input: '死んでいる', output: ['死ぬ'], description: 'progressive godan ぬ → んで' },
  { input: '死んでいない', output: ['死ぬ'], description: 'progressive negative godan ぬ → んで' },
  { input: '死んでいます', output: ['死ぬ'], description: 'progressive polite godan ぬ → んで' },
  { input: '死んでいません', output: ['死ぬ'], description: 'progressive polite negative godan ぬ → んで' },

  { input: '買っている', output: ['買う'], description: 'progressive godan う → って' },
  { input: '買っていない', output: ['買う'], description: 'progressive negative godan う → って' },
  { input: '買っています', output: ['買う'], description: 'progressive polite godan う → って' },
  { input: '買っていません', output: ['買う'], description: 'progressive polite negative godan う → って' },

  { input: '取っている', output: ['取る'], description: 'progressive godan る → って' },
  { input: '取っていない', output: ['取る'], description: 'progressive negative godan る → って' },
  { input: '取っています', output: ['取る'], description: 'progressive polite godan る → って' },
  { input: '取っていません', output: ['取る'], description: 'progressive polite negative godan る → って' },

  // Irregulars
  { input: 'している', output: ['する'], description: 'progressive irregular する' },
  { input: 'していない', output: ['する'], description: 'progressive negative irregular する' },
  { input: 'しています', output: ['する'], description: 'progressive polite irregular する' },
  { input: 'していません', output: ['する'], description: 'progressive polite negative irregular する' },

  { input: 'きている', output: ['くる'], description: 'progressive irregular くる' },
  { input: 'きていない', output: ['くる'], description: 'progressive negative irregular くる' },
  { input: 'きています', output: ['くる'], description: 'progressive polite irregular くる' },
  { input: 'きていません', output: ['くる'], description: 'progressive polite negative irregular くる' },

  { input: '行っている', output: ['行く'], description: 'progressive irregular 行く' },
  { input: '行っていない', output: ['行く'], description: 'progressive negative irregular 行く' },
  { input: '行っています', output: ['行く'], description: 'progressive polite irregular 行く' },
  { input: '行っていません', output: ['行く'], description: 'progressive polite negative irregular 行く' },
];

describe('Deinflection verbs - 04 Progressive & Te-form', () => {
  runTests(tests);
});
