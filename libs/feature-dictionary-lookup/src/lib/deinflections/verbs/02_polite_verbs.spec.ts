import { DeinflectionTest, runTests } from '../../deinflect-test.js';

const tests: DeinflectionTest[] = [
  { input: '食べます', output: ['食べる'], description: 'polite ichidan' },
  { input: '話します', output: ['話す'], description: 'polite す' },
  { input: '書きます', output: ['書く'], description: 'polite く' },
  { input: '泳ぎます', output: ['泳ぐ'], description: 'polite ぐ' },
  { input: '遊びます', output: ['遊ぶ'], description: 'polite ぶ' },
  { input: '待ちます', output: ['待つ'], description: 'polite つ' },
  { input: '飲みます', output: ['飲む'], description: 'polite む' },
  { input: '死にます', output: ['死ぬ'], description: 'polite ぬ' },
  { input: '買います', output: ['買う'], description: 'polite う' },
  { input: '取ります', output: ['取る'], description: 'polite る' },
  { input: 'します', output: ['する'], description: 'polite する' },
  { input: 'きます', output: ['くる'], description: 'polite くる' },

  { input: '食べません', output: ['食べる'], description: 'polite negative ichidan' },
  { input: '話しません', output: ['話す'], description: 'polite negative す' },
  { input: '書きません', output: ['書く'], description: 'polite negative く' },
  { input: '泳ぎません', output: ['泳ぐ'], description: 'polite negative ぐ' },
  { input: '遊びません', output: ['遊ぶ'], description: 'polite negative ぶ' },
  { input: '待ちません', output: ['待つ'], description: 'polite negative つ' },
  { input: '飲みません', output: ['飲む'], description: 'polite negative む' },
  { input: '死にません', output: ['死ぬ'], description: 'polite negative ぬ' },
  { input: '買いません', output: ['買う'], description: 'polite negative う' },
  { input: '取りません', output: ['取る'], description: 'polite negative る' },
  { input: 'しません', output: ['する'], description: 'polite negative する' },
  { input: 'きません', output: ['くる'], description: 'polite negative くる' },
];

describe('Deinflection verbs - 02 Polite Verbs', () => {
  runTests(tests);
});
