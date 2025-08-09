//https://guidetojapanese.org/learn/complete/desire_volition
import { GODAN_I_ROW_ENDINGS, GODAN_O_ROW_ENDINGS, GODAN_U_ROW_ENDINGS } from './utils.js';
import { Rule, Ruleset } from '../../deinflect.js';

// Todo add desire inflections

const godanVolitional: Rule[] = GODAN_O_ROW_ENDINGS.map((o_verbEnding, i) => ({
  replace: `${o_verbEnding}う`,
  with: GODAN_U_ROW_ENDINGS[i],
  applyTo: ['VERB_VOLITIONAL'],
}));

const ichidanVolitional: Rule[] = [
  { replace: 'よう', with: 'る', applyTo: ['VERB_VOLITIONAL'] },
];

const irregularVolitional: Rule[] = [
  { replace: 'しよう', with: 'する', applyTo: ['VERB_VOLITIONAL'] },
  { replace: 'こよう', with: 'くる', applyTo: ['VERB_VOLITIONAL'] },
];

const godanPoliteVolitional: Rule[] = GODAN_I_ROW_ENDINGS.map((i_verbEnding, i) => ({
  replace: `${i_verbEnding}ましょう`,
  with: GODAN_U_ROW_ENDINGS[i],
  applyTo: ['VERB_VOLITIONAL_POLITE'],
}));

const ichidanPoliteVolitional: Rule[] = [
  { replace: 'ましょう', with: 'る', applyTo: ['VERB_VOLITIONAL'] },
];

const irregularPoliteVolitional: Rule[] = [
  { replace: 'しましょう', with: 'する', applyTo: ['VERB_VOLITIONAL'] },
  { replace: 'きましょう', with: 'くる', applyTo: ['VERB_VOLITIONAL'] },
];

export const desire_volitional: Ruleset = {
  description: '',
  produces: ['VERB_BASE'],
  rules: [
    ...godanVolitional,
    ...ichidanVolitional,
    ...irregularVolitional,
    ...godanPoliteVolitional,
    ...ichidanPoliteVolitional,
    ...irregularPoliteVolitional,
  ],
};
