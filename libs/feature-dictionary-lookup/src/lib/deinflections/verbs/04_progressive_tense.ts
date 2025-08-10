import { Rule, Ruleset } from '../../deinflect.js';
import { GODAN_TE_FORM_ENDINGS, GODAN_U_ROW_ENDINGS } from './utils.js';

//https://guidetojapanese.org/learn/complete/progressive_tense
const godanTe: Rule[] = GODAN_TE_FORM_ENDINGS.map((te_verbEnding, i) => ({
  replace: te_verbEnding,
  with: GODAN_U_ROW_ENDINGS[i],
  applyTo: ['VERB_TE_FORM'],
}));

const ichidanTe: Rule[] = [{ replace: 'て', with: 'る', applyTo: ['VERB_TE_FORM'] }];

const godan_progressive: Rule[] = GODAN_TE_FORM_ENDINGS.map((te_verbEnding, i) => ({
  replace: `${te_verbEnding}いる`,
  with: GODAN_U_ROW_ENDINGS[i],
  applyTo: ['VERB_PROGRESSIVE'],
}));

const ichidan_progressive: Rule[] = [{ replace: 'ている', with: 'る', applyTo: ['VERB_PROGRESSIVE'] }];

export const progressive_tense: Ruleset = {
  description: '',
  produces: ['VERB_BASE'],
  rules: [...godan_progressive, ...ichidan_progressive, ...godanTe, ...ichidanTe],
};
