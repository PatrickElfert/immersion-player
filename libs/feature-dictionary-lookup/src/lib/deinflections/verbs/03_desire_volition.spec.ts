import { DeinflectionTest, runTests } from '../../deinflect-test.js';

// Tests for chapter: Desire & Volition (03_desire_volition)
const tests: DeinflectionTest[] = [
  // Volitional (casual)
  { input: '食べよう', output: ['食べる'], description: 'volitional ichidan' },
  { input: '話そう', output: ['話す'], description: 'volitional す' },
  { input: '書こう', output: ['書く'], description: 'volitional く' },
  { input: '泳ごう', output: ['泳ぐ'], description: 'volitional ぐ' },
  { input: '遊ぼう', output: ['遊ぶ'], description: 'volitional ぶ' },
  { input: '待とう', output: ['待つ'], description: 'volitional つ' },
  { input: '飲もう', output: ['飲む'], description: 'volitional む' },
  { input: '死のう', output: ['死ぬ'], description: 'volitional ぬ' },
  { input: '買おう', output: ['買う'], description: 'volitional う' },
  { input: '取ろう', output: ['取る'], description: 'volitional る' },
  { input: 'しよう', output: ['する'], description: 'volitional する' },
  { input: 'こよう', output: ['くる'], description: 'volitional くる' }, // corrected from きょう
];

describe('Deinflection verbs - 03 Desire & Volition', () => {
  runTests(tests);
});
