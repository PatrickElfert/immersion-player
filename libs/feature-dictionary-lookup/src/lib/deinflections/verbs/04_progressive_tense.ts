import { Rule, Ruleset } from '../../deinflect.js';
import { GODAN_TE_FORM_ENDINGS, GODAN_U_ROW_ENDINGS } from './utils.js';

//https://guidetojapanese.org/learn/complete/progressive_tense
const godanProgressive: Rule[] = GODAN_TE_FORM_ENDINGS.map((te_verbEnding, i) => ({
  replace: `${te_verbEnding}いる`,
  with: GODAN_U_ROW_ENDINGS[i],
  applyTo: ['VERB_PROGRESSIVE'],
}));

const godanProgressiveNegative: Rule[] = GODAN_TE_FORM_ENDINGS.map((te_verbEnding, i) => ({
  replace: `${te_verbEnding}いない`,
  with: GODAN_U_ROW_ENDINGS[i],
  applyTo: ['VERB_PROGRESSIVE_NEGATIVE'],
}));

const godanProgressivePolite: Rule[] = GODAN_TE_FORM_ENDINGS.map((te_verbEnding, i) => ({
  replace: `${te_verbEnding}います`,
  with: GODAN_U_ROW_ENDINGS[i],
  applyTo: ['VERB_PROGRESSIVE_POLITE'],
}));

const godanProgressivePoliteNegative: Rule[] = GODAN_TE_FORM_ENDINGS.map((te_verbEnding, i) => ({
  replace: `${te_verbEnding}いません`,
  with: GODAN_U_ROW_ENDINGS[i],
  applyTo: ['VERB_PROGRESSIVE_POLITE_NEGATIVE'],
}));

const ichidanProgressive: Rule[] = [{ replace: 'ている', with: 'る', applyTo: ['VERB_PROGRESSIVE'] }];
const ichidanProgressiveNegative: Rule[] = [
  { replace: 'ていない', with: 'る', applyTo: ['VERB_PROGRESSIVE_NEGATIVE'] },
];
const ichidanProgressivePolite: Rule[] = [{ replace: 'ています', with: 'る', applyTo: ['VERB_PROGRESSIVE_POLITE'] }];
const ichidanProgressivePoliteNegative: Rule[] = [
  { replace: 'ていません', with: 'る', applyTo: ['VERB_PROGRESSIVE_POLITE_NEGATIVE'] },
];

const irregularProgressive: Rule[] = [
  { replace: 'きている', with: 'くる', applyTo: ['VERB_PROGRESSIVE'] },
  { replace: 'している', with: 'する', applyTo: ['VERB_PROGRESSIVE'] },
  {replace: '行っている', with: '行く', applyTo: ['VERB_PROGRESSIVE']},
]

const irregularProgressiveNegative: Rule[] = [
    { replace: 'きていない', with: 'くる', applyTo: ['VERB_PROGRESSIVE_NEGATIVE'] },
    { replace: 'していない', with: 'する', applyTo: ['VERB_PROGRESSIVE_NEGATIVE'] },
    { replace: '行っていない', with: '行く', applyTo: ['VERB_PROGRESSIVE_NEGATIVE'] },
]

const irregularProgressivePolite: Rule[] = [
  { replace: 'きています', with: 'くる', applyTo: ['VERB_PROGRESSIVE_POLITE'] },
  { replace: 'しています', with: 'する', applyTo: ['VERB_PROGRESSIVE_POLITE'] },
  { replace: '行っています', with: '行く', applyTo: ['VERB_PROGRESSIVE_POLITE'] },
];

const irregularProgressivePoliteNegative: Rule[] = [
  { replace: 'きていません', with: 'くる', applyTo: ['VERB_PROGRESSIVE_POLITE_NEGATIVE'] },
  { replace: 'していません', with: 'する', applyTo: ['VERB_PROGRESSIVE_POLITE_NEGATIVE'] },
  { replace: '行っていません', with: '行く', applyTo: ['VERB_PROGRESSIVE_POLITE_NEGATIVE'] },
];



export const progressive_tense: Ruleset = {
  description: '',
  produces: ['VERB_BASE'],
  rules: [
    ...irregularProgressive,
    ...irregularProgressiveNegative,
    ...irregularProgressivePolite,
    ...irregularProgressivePoliteNegative,
    ...godanProgressive,
    ...godanProgressiveNegative,
    ...godanProgressivePolite,
    ...godanProgressivePoliteNegative,
    ...ichidanProgressive,
    ...ichidanProgressiveNegative,
    ...ichidanProgressivePolite,
    ...ichidanProgressivePoliteNegative,
  ],
};
