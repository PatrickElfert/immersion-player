import { Rule, Ruleset } from '../../deinflect.js';
import { GODAN_A_ROW_ENDINGS, GODAN_TE_FORM_ENDINGS, GODAN_U_ROW_ENDINGS } from './utils.js';

//https://guidetojapanese.org/learn/complete/verb_past
const godanPast: Rule[] = GODAN_TE_FORM_ENDINGS.map((te_verbEnding, i) => ({
  replace: te_verbEnding.replace('て', 'た').replace('で', 'だ'),
  with: GODAN_U_ROW_ENDINGS[i],
  applyTo: ['VERB_PAST'],
}));

const godanPastNegative: Rule[] = GODAN_A_ROW_ENDINGS.map((a_verbEnding, i) => ({
  replace: `${a_verbEnding}なかった`,
  with: GODAN_U_ROW_ENDINGS[i],
  applyTo: ['VERB_PAST_NEGATIVE'],
}));

const ichidanPast: Rule[] = [{ replace: 'た', with: 'る', applyTo: ['VERB_PAST'] }];
const ichidanPastNegative: Rule[] = [{ replace: 'なかった', with: 'る', applyTo: ['VERB_PAST_NEGATIVE'] }];

const irregularPast: Rule[] = [
  { replace: 'きた', with: 'くる', applyTo: ['VERB_PAST'] },
  { replace: 'した', with: 'する', applyTo: ['VERB_PAST'] },
  { replace: '行った', with: '行く', applyTo: ['VERB_PAST'] },
];

const irregularPastNegative: Rule[] = [
  { replace: 'こなかった', with: 'くる', applyTo: ['VERB_PAST_NEGATIVE'] },
  { replace: 'しなかった', with: 'する', applyTo: ['VERB_PAST_NEGATIVE'] },
];

export const verb_past: Ruleset = {
  description: '',
  produces: ['VERB_BASE'],
  rules: [
    ...godanPast,
    ...godanPastNegative,
    ...ichidanPast,
    ...ichidanPastNegative,
    ...irregularPast,
    ...irregularPastNegative,
  ],
};
