import { DeinflectionTest, runTests } from '../../deinflect-test.js';

const tests: DeinflectionTest[] = [
  { input: '食べない', output: ['食べる'], description: 'negative ichidan' },
  { input: '話さない', output: ['話す'], description: 'negative す' },
  { input: '書かない', output: ['書く'], description: 'negative く' },
  { input: '泳がない', output: ['泳ぐ'], description: 'negative ぐ' },
  { input: '遊ばない', output: ['遊ぶ'], description: 'negative ぶ' },
  { input: '待たない', output: ['待つ'], description: 'negative つ' },
  { input: '歩まない', output: ['歩む'], description: 'negative む' },
  { input: '死なない', output: ['死ぬ'], description: 'negative ぬ' },
  { input: '買わない', output: ['買う'], description: 'negative わ' },
  { input: '取らない', output: ['取る'], description: 'negative る' },
  { input: '知らない', output: ['知る'], description: 'negative ら' },
  { input: 'しない', output: ['する'], description: 'negative する' },
  { input: 'こない', output: ['くる'], description: 'negative くる' },
  { input: 'ない', output: ['ある'], description: 'negative ある' },
];

describe('Deinflection verbs - 01 Negative Verbs', () => {
  runTests(tests);
});
