import { DeinflectionTest, runTests } from '../../deinflect-test.js';

const tests: DeinflectionTest[] = [
  // Polite past
  { input: '食べました', output: ['食べる'], description: 'polite past ichidan' },
  { input: '話しました', output: ['話す'], description: 'polite past す' },
  { input: '書きました', output: ['書く'], description: 'polite past く' },
  { input: '泳ぎました', output: ['泳ぐ'], description: 'polite past ぐ' },
  { input: '遊びました', output: ['遊ぶ'], description: 'polite past ぶ' },
  { input: '待ちました', output: ['待つ'], description: 'polite past つ' },
  { input: '飲みました', output: ['飲む'], description: 'polite past む' },
  { input: '死にました', output: ['死ぬ'], description: 'polite past ぬ' },
  { input: '買いました', output: ['買う'], description: 'polite past う' },
  { input: '取りました', output: ['取る'], description: 'polite past る' },
  { input: 'しました', output: ['する'], description: 'polite past する' },
  { input: 'きました', output: ['くる'], description: 'polite past くる' },

  // Polite past negative
  { input: '食べませんでした', output: ['食べる'], description: 'polite past negative ichidan' },
  { input: '話しませんでした', output: ['話す'], description: 'polite past negative す' },
  { input: '書きませんでした', output: ['書く'], description: 'polite past negative く' },
  { input: '泳ぎませんでした', output: ['泳ぐ'], description: 'polite past negative ぐ' },
  { input: '遊びませんでした', output: ['遊ぶ'], description: 'polite past negative ぶ' },
  { input: '待ちませんでした', output: ['待つ'], description: 'polite past negative つ' },
  { input: '飲みませんでした', output: ['飲む'], description: 'polite past negative む' },
  { input: '死にませんでした', output: ['死ぬ'], description: 'polite past negative ぬ' },
  { input: '買いませんでした', output: ['買う'], description: 'polite past negative う' },
  { input: '取りませんでした', output: ['取る'], description: 'polite past negative る' },
  { input: 'しませんでした', output: ['する'], description: 'polite past negative する' },
  { input: 'きませんでした', output: ['くる'], description: 'polite past negative くる' },

  // Potential
  { input: '食べられる', output: ['食べる'], description: 'potential ichidan' },
  { input: '話せる', output: ['話す'], description: 'potential す' },
  { input: '書ける', output: ['書く'], description: 'potential く' },
  { input: '泳げる', output: ['泳ぐ'], description: 'potential ぐ' },
  { input: '遊べる', output: ['遊ぶ'], description: 'potential ぶ' },
  { input: '待てる', output: ['待つ'], description: 'potential つ' },
  { input: '飲める', output: ['飲む'], description: 'potential む' },
  { input: '死ねる', output: ['死ぬ'], description: 'potential ぬ' },
  { input: '買える', output: ['買う'], description: 'potential う' },
  { input: '取れる', output: ['取る'], description: 'potential る' },
  { input: 'できる', output: ['する'], description: 'potential する' },
  { input: 'こられる', output: ['くる'], description: 'potential くる' }
];

describe('Deinflection verbs (remaining - legacy groups)', () => {
  runTests(tests);
});
