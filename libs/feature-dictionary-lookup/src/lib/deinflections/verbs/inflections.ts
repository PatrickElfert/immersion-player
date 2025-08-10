import { Rule, Ruleset } from '../../deinflect.js';
import {
  GODAN_A_ROW_ENDINGS,
  GODAN_E_ROW_ENDINGS,
  GODAN_I_ROW_ENDINGS,
  GODAN_TE_FORM_ENDINGS,
  GODAN_U_ROW_ENDINGS
} from './utils.js';
import { negative } from '../adjectives/inflections.js';
import { polite } from './02_polite_verbs.js';
import { negative_verbs } from './01_negative_verbs.js';
import { desire_volitional } from './03_desire_volition.js';
import { progressive_tense } from './04_progressive_tense.js';
import { verb_past } from './05_verb_past.js';


const godanPolitePast: Rule[] = GODAN_I_ROW_ENDINGS.map((stem_verbEnding, i) => ({
  applyTo: ['VERB_PAST_POLITE'],
  replace: `${stem_verbEnding}ました`,
  with: GODAN_U_ROW_ENDINGS[i],
}));

const ichidanPolitePast: Rule[] = [
  { replace: 'ました', with: 'る', applyTo: ['VERB_PAST_POLITE'] },
];

const irregularPolitePast: Rule[] = [
  { replace: 'きました', with: 'くる', applyTo: ['VERB_PAST_POLITE'] },
  { replace: 'しました', with: 'する', applyTo: ['VERB_PAST_POLITE'] },
];

export const politePast: Ruleset = {
  description: '',
  produces: ['VERB_BASE'],
  rules: [
    ...godanPolitePast,
    ...ichidanPolitePast,
    ...irregularPolitePast,
  ],
};

const godanPolitePastNegative: Rule[] = GODAN_I_ROW_ENDINGS.map((stem_verbEnding, i) => ({
  applyTo: ['VERB_PAST_POLITE_NEGATIVE'],
  replace: `${stem_verbEnding}ませんでした`,
  with: GODAN_U_ROW_ENDINGS[i],
}));

const ichidanPolitePastNegative: Rule[] = [
  { replace: 'ませんでした', with: 'る', applyTo: ['VERB_PAST_POLITE_NEGATIVE'] },
];

const irregularPolitePastNegative: Rule[] = [
  { replace: 'きませんでした', with: 'くる', applyTo: ['VERB_PAST_POLITE_NEGATIVE'] },
  { replace: 'しませんでした', with: 'する', applyTo: ['VERB_PAST_POLITE_NEGATIVE'] },
];

export const politePastNegative: Ruleset = {
  description: '',
  produces: ['VERB_BASE'],
  rules: [
    ...godanPolitePastNegative,
    ...ichidanPolitePastNegative,
    ...irregularPolitePastNegative,
  ],
};

export const godanPotential_u_ending: Rule[] = GODAN_E_ROW_ENDINGS.map((e_verbEnding, i) => ({
  replace: `${e_verbEnding}る`,
  with: GODAN_U_ROW_ENDINGS[i],
  applyTo: ['VERB_POTENTIAL'],
}));

export const godanPotential_a_ending: Rule[] = GODAN_I_ROW_ENDINGS.map((e_verbEnding, i) => ({
  replace: `${e_verbEnding}る`,
  with: GODAN_A_ROW_ENDINGS[i],
  applyTo: ['VERB_POTENTIAL'],
}));

const godanPotential: Rule[] = [
  ...godanPotential_a_ending,
  ...godanPotential_u_ending,
];

const ichidanPotential: Rule[] = [
  { replace: 'られる', with: 'る', applyTo: ['VERB_POTENTIAL'] },
  { replace: 'れる', with: 'る', applyTo: ['VERB_POTENTIAL'] },
];

const irregularPotential: Rule[] = [
  { replace: 'こられる', with: 'くる', applyTo: ['VERB_POTENTIAL'] },
  { replace: 'できる', with: 'する', applyTo: ['VERB_POTENTIAL'] },
];

export const potential: Ruleset = {
  description: '',
  produces: ['VERB_BASE'],
  rules: [
    ...godanPotential,
    ...ichidanPotential,
    ...irregularPotential,
  ],
}

export const rulesets = [
  negative_verbs,
  polite,
  desire_volitional,
  progressive_tense,
  verb_past,
  negative,
  politePast,
  politePastNegative,
  potential,
];
