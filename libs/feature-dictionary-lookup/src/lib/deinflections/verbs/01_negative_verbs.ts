//https://guidetojapanese.org/learn/complete/negativeverbs
import { GODAN_A_ROW_ENDINGS, GODAN_U_ROW_ENDINGS } from './utils.js';
import { Rule, Ruleset } from '../../deinflect.js';

const godanNegative: Rule[] = GODAN_A_ROW_ENDINGS.map((a_verbEnding, i) => ({
  replace: `${a_verbEnding}ない`,
  with: GODAN_U_ROW_ENDINGS[i],
  applyTo: ['VERB_NEGATIVE'],
}));

const ichidanNegative: Rule[] = [
  { replace: 'ない', with: 'る', applyTo: ['VERB_NEGATIVE'] },
];

const irregularNegative: Rule[] = [
  { replace: 'しない', with: 'する', applyTo: ['VERB_NEGATIVE'] },
  { replace: 'こない', with: 'くる', applyTo: ['VERB_NEGATIVE'] },
  { replace: 'ない', with: 'ある', applyTo: ['VERB_NEGATIVE'] },
];

export const negative_verbs: Ruleset = {
  description: 'negative verbs',
  produces: ['VERB_BASE'],
  rules: [
    ...godanNegative,
    ...ichidanNegative,
    ...irregularNegative,
  ],
} ;
