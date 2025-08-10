//https://guidetojapanese.org/learn/complete/polite_verbs
import { Rule, Ruleset } from '../../deinflect.js';
import { GODAN_I_ROW_ENDINGS, GODAN_U_ROW_ENDINGS } from './utils.js';

const godanPolite: Rule[] = GODAN_I_ROW_ENDINGS.map((i_verbEnding, i) => ({
  applyTo: ['VERB_POLITE'],
  replace: `${i_verbEnding}ます`,
  with: GODAN_U_ROW_ENDINGS[i],
}));

const ichidanPolite: Rule[] = [
  { replace: 'ます', with: 'る', applyTo: ['VERB_POLITE', 'VERB_PROGRESSIVE'] },
];

const irregularPolite: Rule[] = [
  { replace: 'きます', with: 'くる', applyTo: ['VERB_POLITE'] },
  { replace: 'します', with: 'する', applyTo: ['VERB_POLITE'] },
];

const godanPoliteNegative: Rule[] = GODAN_I_ROW_ENDINGS.map((i_verbEnding, i) => ({
  applyTo: ['VERB_POLITE_NEGATIVE'],
  replace: `${i_verbEnding}ません`,
  with: GODAN_U_ROW_ENDINGS[i],
}));

const ichidanPoliteNegative: Rule[] = [
  { replace: 'ません', with: 'る', applyTo: ['VERB_POLITE_NEGATIVE', 'VERB_PROGRESSIVE'] },
];

const irregularPoliteNegative: Rule[] = [
  { replace: 'きません', with: 'くる', applyTo: ['VERB_POLITE_NEGATIVE'] },
  { replace: 'しません', with: 'する', applyTo: ['VERB_POLITE_NEGATIVE'] },
];

export const polite: Ruleset = {
  description: '',
  produces: ['VERB_BASE'],
  rules: [
    ...godanPolite,
    ...ichidanPolite,
    ...irregularPolite,
    ...godanPoliteNegative,
    ...ichidanPoliteNegative,
    ...irregularPoliteNegative,
  ],
};

