import { DeinflectionTest, runTests } from '../../deinflect-test.js';

const tests: DeinflectionTest[] = [
  { input: '食べた', output: ['食べる'], description: 'past ichidan 食べる' },
  { input: '食べなかった', output: ['食べる'], description: 'past negative ichidan 食べる' },

  { input: '話した', output: ['話す'], description: 'past godan す → した' },
  { input: '書いた', output: ['書く'], description: 'past godan く → いた' },
  { input: '泳いだ', output: ['泳ぐ'], description: 'past godan ぐ → いだ' },
  { input: '遊んだ', output: ['遊ぶ'], description: 'past godan ぶ → んだ' },
  { input: '飲んだ', output: ['飲む'], description: 'past godan む → んだ' },
  { input: '持った', output: ['持つ'], description: 'past godan つ → った' },
  { input: '買った', output: ['買う'], description: 'past godan う → った' },
  { input: '取った', output: ['取る'], description: 'past godan る → った' },
  { input: '死んだ', output: ['死ぬ'], description: 'past godan ぬ → んだ' },
  { input: '行った', output: ['行く'], description: 'past irregular 行く → 行った' },

  { input: '話さなかった', output: ['話す'], description: 'past negative godan す → さなかった' },
  { input: '書かなかった', output: ['書く'], description: 'past negative godan く → かなかった' },
  { input: '泳がなかった', output: ['泳ぐ'], description: 'past negative godan ぐ → がなかった' },
  { input: '遊ばなかった', output: ['遊ぶ'], description: 'past negative godan ぶ → ばなかった' },
  { input: '飲まなかった', output: ['飲む'], description: 'past negative godan む → まなかった' },
  { input: '持たなかった', output: ['持つ'], description: 'past negative godan つ → たなかった' },
  { input: '買わなかった', output: ['買う'], description: 'past negative godan う → わなかった' },
  { input: '取らなかった', output: ['取る'], description: 'past negative godan る → らなかった' },
  { input: '死ななかった', output: ['死ぬ'], description: 'past negative godan ぬ → ななかった' },

  { input: 'した', output: ['する'], description: 'past irregular する → した' },
  { input: 'しなかった', output: ['する'], description: 'past negative irregular する → しなかった' },
  { input: 'きた', output: ['くる'], description: 'past irregular くる → きた' },
  { input: 'こなかった', output: ['くる'], description: 'past negative irregular くる → こなかった' },
];

describe('Deinflection verbs - 05 Verb Past', () => {
  runTests(tests);
});
