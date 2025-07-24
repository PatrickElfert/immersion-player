import { Rule, Ruleset } from '../../deinflect.js';

const GODAN_U_ROW_ENDINGS = ['す', 'く', 'ぐ', 'ぶ', 'つ', 'む', 'う', 'る', 'ぬ'];
const GODAN_A_ROW_ENDINGS = ['さ', 'か', 'が', 'ば', 'た', 'ま', 'わ', 'ら', 'な'];
const GODAN_E_ROW_ENDINGS = ['せ', 'け', 'げ', 'べ', 'て', 'め', 'え', 'れ', 'ね'];
const GODAN_O_ROW_ENDINGS = ['そ', 'こ', 'ご', 'ぼ', 'と', 'も', 'お', 'ろ', 'の'];
const GODAN_I_ROW_ENDINGS = ['し', 'き', 'ぎ', 'び', 'ち', 'み', 'い', 'り', 'に'];
const GODAN_TE_FORM_ENDINGS = ['して', 'いて', 'いで', 'んで', 'って', 'んで', 'って', 'って', 'んで'];

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

export const negative: Ruleset = {
  description: '',
  produces: ['VERB_BASE'],
  rules: [
    ...godanNegative,
    ...ichidanNegative,
    ...irregularNegative,
  ],
};

const godanTe: Rule[] = GODAN_TE_FORM_ENDINGS.map((te_verbEnding, i) => ({
  replace: te_verbEnding,
  with: GODAN_U_ROW_ENDINGS[i],
  applyTo: ['VERB_TE_FORM'],
}));

const ichidanTe: Rule[] = [
  { replace: 'て', with: 'る', applyTo: ['VERB_TE_FORM'] },
];

export const te: Ruleset = {
  description: '',
  produces: ['VERB_BASE'],
  rules: [...godanTe, ...ichidanTe],
};

export const past: Ruleset = {
  description: '',
  produces: ['VERB_TE_FORM'],
  rules: [
    { replace: 'た', with: 'て', applyTo: ['VERB_PAST'] },
    { replace: 'だ', with: 'で', applyTo: ['VERB_PAST'] },
  ],
};

export const pastNegative: Ruleset = {
  description: '',
  produces: ['VERB_NEGATIVE'],
  rules: [{ replace: 'かった', with: 'い', applyTo: ['VERB_PAST_NEGATIVE'] }],
};

const godanPolite: Rule[] = GODAN_I_ROW_ENDINGS.map((stem_verbEnding, i) => ({
  applyTo: ['VERB_POLITE'],
  replace: `${stem_verbEnding}ます`,
  with: GODAN_U_ROW_ENDINGS[i],
}));

const ichidanPolite: Rule[] = [
  { replace: 'ます', with: 'る', applyTo: ['VERB_POLITE'] },
];

const irregularPolite: Rule[] = [
  { replace: 'きます', with: 'くる', applyTo: ['VERB_POLITE'] },
  { replace: 'します', with: 'する', applyTo: ['VERB_POLITE'] },
];

export const polite: Ruleset = {
  description: '',
  produces: ['VERB_BASE'],
  rules: [
    ...godanPolite,
    ...ichidanPolite,
    ...irregularPolite,
  ],
};

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

const godanPoliteNegative: Rule[] = GODAN_I_ROW_ENDINGS.map((stem_verbEnding, i) => ({
  applyTo: ['VERB_POLITE_NEGATIVE'],
  replace: `${stem_verbEnding}ません`,
  with: GODAN_U_ROW_ENDINGS[i],
}));

const ichidanPoliteNegative: Rule[] = [
  { replace: 'ません', with: 'る', applyTo: ['VERB_POLITE_NEGATIVE'] },
];

const irregularPoliteNegative: Rule[] = [
  { replace: 'きません', with: 'くる', applyTo: ['VERB_POLITE_NEGATIVE'] },
  { replace: 'しません', with: 'する', applyTo: ['VERB_POLITE_NEGATIVE'] },
];

export const politeNegative: Ruleset = {
  description: '',
  produces: ['VERB_BASE'],
  rules: [
    ...godanPoliteNegative,
    ...ichidanPoliteNegative,
    ...irregularPoliteNegative,
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
  { replace: 'きょう', with: 'くる', applyTo: ['VERB_VOLITIONAL'] },
];

export const volitional: Ruleset = {
  description: '',
  produces: ['VERB_BASE'],
  rules: [
    ...godanVolitional,
    ...ichidanVolitional,
    ...irregularVolitional,
  ],
};

const godanPoliteVolitional: Rule[] = GODAN_I_ROW_ENDINGS.map((stem_verbEnding, i) => ({
  replace: `${stem_verbEnding}ましょう`,
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

export const politeVolitional: Ruleset = {
  description: '',
  produces: ['VERB_BASE'],
  rules: [
    ...godanPoliteVolitional,
    ...ichidanPoliteVolitional,
    ...irregularPoliteVolitional,
  ],
};

const ichidanProgressive: Rule[] = [
  { replace: 'ている', with: 'て', applyTo: ['VERB_PROGRESSIVE'] },
];

const godanProgressive: Rule[] = [
  { replace: 'でいる', with: 'で', applyTo: ['VERB_PROGRESSIVE'] },
];

export const progressive: Ruleset = {
  description: '',
  produces: ['VERB_TE_FORM'],
  rules: [
    ...ichidanProgressive,
    ...godanProgressive,
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

const godanDesire: Rule[] = GODAN_I_ROW_ENDINGS.map((stem_verbEnding, i) => ({
  replace: `${stem_verbEnding}たい`,
  with: GODAN_U_ROW_ENDINGS[i],
  applyTo: ['VERB_DESIRE'],
}));

const ichidanDesire: Rule[] = [
  { replace: 'たい', with: 'る', applyTo: ['VERB_DESIRE'] },
];

export const desire: Ruleset = {
  description: '',
  produces: ['VERB_BASE'],
  rules: [
    ...godanDesire,
    ...ichidanDesire,
  ],
};

export const rulesets = [
  pastNegative,
  past,
  te,
  negative,
  polite,
  politeNegative,
  volitional,
  politeVolitional,
  politePast,
  politePastNegative,
  progressive,
  potential,
  desire,
];
