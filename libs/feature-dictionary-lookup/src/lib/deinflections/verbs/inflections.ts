import { Rule, Ruleset } from '../../deinflect.js';

const U_VERB_ENDINGS = ['す', 'く', 'ぐ', 'ぶ', 'つ', 'む', 'う', 'る', 'ぬ'];
const A_VERB_ENDINGS = ['さ', 'か', 'が', 'ば', 'た', 'ま', 'わ', 'ら', 'な'];
const E_VERB_ENDINGS = ['せ', 'け', 'げ', 'べ', 'て', 'め', 'え', 'れ', 'ね'];
const O_VERB_ENDINGS = ['そ', 'こ', 'ご', 'ぼ', 'と', 'も', 'お', 'ろ', 'の'];
const TE_ENDINGS = ['して', 'いて', 'いで', 'んで', 'って', 'んで', 'って', 'って', 'んで'];
const STEM_ENDINGS = ['し', 'き', 'ぎ', 'び', 'ち', 'み', 'い', 'り', 'に'];

const godanNegative: Rule[] = A_VERB_ENDINGS.map((a_verbEnding, i) => ({
  replace: `${a_verbEnding}ない`,
  with: U_VERB_ENDINGS[i],
  applyTo: ['VERB_NEGATIVE'],
}));

export const negative: Ruleset = {
  description: '',
  produces: ['VERB_BASE'],
  rules: [
    ...godanNegative,
    { replace: 'ない', with: 'る', applyTo: ['VERB_NEGATIVE'] },
    { replace: 'しない', with: 'する', applyTo: ['VERB_NEGATIVE'] },
    { replace: 'こない', with: 'くる', applyTo: ['VERB_NEGATIVE'] },
    { replace: 'ない', with: 'ある', applyTo: ['VERB_NEGATIVE'] },
  ],
};

const godanTe: Rule[] = TE_ENDINGS.map((te_verbEnding, i) => ({
  replace: te_verbEnding,
  with: U_VERB_ENDINGS[i],
  applyTo: ['VERB_TE_FORM'],
}));

export const te: Ruleset = {
  description: '',
  produces: ['VERB_BASE'],
  rules: [...godanTe, { replace: 'て', with: 'る', applyTo: ['VERB_TE_FORM'] }],
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

const godanPolite: Rule[] = STEM_ENDINGS.map((stem_verbEnding, i) => ({
  applyTo: ['VERB_POLITE'],
  replace: `${stem_verbEnding}ます`,
  with: U_VERB_ENDINGS[i],
}));

export const polite: Ruleset = {
  description: '',
  produces: ['VERB_BASE'],
  rules: [
    ...godanPolite,
    { replace: 'ます', with: 'る', applyTo: ['VERB_POLITE'] },
    { replace: 'きます', with: 'くる', applyTo: ['VERB_POLITE'] },
    { replace: 'します', with: 'する', applyTo: ['VERB_POLITE'] },
  ],
};

const godanPolitePast: Rule[] = STEM_ENDINGS.map((stem_verbEnding, i) => ({
  applyTo: ['VERB_PAST_POLITE'],
  replace: `${stem_verbEnding}ました`,
  with: U_VERB_ENDINGS[i],
}));

export const politePast: Ruleset = {
  description: '',
  produces: ['VERB_BASE'],
  rules: [
    ...godanPolitePast,
    { replace: 'ました', with: 'る', applyTo: ['VERB_PAST_POLITE'] },
    { replace: 'きました', with: 'くる', applyTo: ['VERB_PAST_POLITE'] },
    { replace: 'しました', with: 'する', applyTo: ['VERB_PAST_POLITE'] },
  ],
};

const godanPoliteNegative: Rule[] = STEM_ENDINGS.map((stem_verbEnding, i) => ({
  applyTo: ['VERB_POLITE_NEGATIVE'],
  replace: `${stem_verbEnding}ません`,
  with: U_VERB_ENDINGS[i],
}));

export const politeNegative: Ruleset = {
  description: '',
  produces: ['VERB_BASE'],
  rules: [
    ...godanPoliteNegative,
    { replace: 'ません', with: 'る', applyTo: ['VERB_POLITE_NEGATIVE'] },
    { replace: 'きません', with: 'くる', applyTo: ['VERB_POLITE_NEGATIVE'] },
    { replace: 'しません', with: 'する', applyTo: ['VERB_POLITE_NEGATIVE'] },
  ],
};

const godanPolitePastNegative: Rule[] = STEM_ENDINGS.map((stem_verbEnding, i) => ({
  applyTo: ['VERB_PAST_POLITE_NEGATIVE'],
  replace: `${stem_verbEnding}ませんでした`,
  with: U_VERB_ENDINGS[i],
}));

export const politePastNegative: Ruleset = {
  description: '',
  produces: ['VERB_BASE'],
  rules: [
    ...godanPolitePastNegative,
    { replace: 'ませんでした', with: 'る', applyTo: ['VERB_PAST_POLITE_NEGATIVE'] },
    { replace: 'きませんでした', with: 'くる', applyTo: ['VERB_PAST_POLITE_NEGATIVE'] },
    { replace: 'しませんでした', with: 'する', applyTo: ['VERB_PAST_POLITE_NEGATIVE'] },
  ],
};

const godanVolitional: Rule[] = O_VERB_ENDINGS.map((o_verbEnding, i) => ({
  replace: `${o_verbEnding}う`,
  with: U_VERB_ENDINGS[i],
  applyTo: ['VERB_VOLITIONAL'],
}));

export const volitional: Ruleset = {
  description: '',
  produces: ['VERB_BASE'],
  rules: [
    ...godanVolitional,
    { replace: 'よう', with: 'る', applyTo: ['VERB_VOLITIONAL'] },
    { replace: 'しよう', with: 'する', applyTo: ['VERB_VOLITIONAL'] },
    { replace: 'きょう', with: 'くる', applyTo: ['VERB_VOLITIONAL'] },
  ],
};

const godanPoliteVolitional: Rule[] = STEM_ENDINGS.map((stem_verbEnding, i) => ({
  replace: `${stem_verbEnding}ましょう`,
  with: U_VERB_ENDINGS[i],
  applyTo: ['VERB_VOLITIONAL_POLITE'],
}));

export const politeVolitional: Ruleset = {
  description: '',
  produces: ['VERB_BASE'],
  rules: [
    ...godanPoliteVolitional,
    { replace: 'ましょう', with: 'る', applyTo: ['VERB_VOLITIONAL'] },
    { replace: 'しましょう', with: 'する', applyTo: ['VERB_VOLITIONAL'] },
    { replace: 'きましょう', with: 'くる', applyTo: ['VERB_VOLITIONAL'] },
  ],
};

export const progressive: Ruleset = {
  description: '',
  produces: ['VERB_TE_FORM'],
  rules: [{ replace: 'ている', with: 'て', applyTo: ['VERB_PROGRESSIVE'] },
  { replace: 'でいる', with: 'で', applyTo: ['VERB_PROGRESSIVE'] }],
}

export const godanPotential_u_ending: Rule[] = E_VERB_ENDINGS.map((e_verbEnding, i) => ({
  replace: `${e_verbEnding}る`,
  with: U_VERB_ENDINGS[i],
  applyTo: ['VERB_POTENTIAL'],
}));

export const godanPotential_a_ending: Rule[] = STEM_ENDINGS.map((e_verbEnding, i) => ({
  replace: `${e_verbEnding}る`,
  with: A_VERB_ENDINGS[i],
  applyTo: ['VERB_POTENTIAL'],
}));

export const potential: Ruleset = {
  description: '',
  produces: ['VERB_BASE'],
  rules: [
    ...godanPotential_a_ending,
    ...godanPotential_u_ending,
    { replace: 'られる', with: 'る', applyTo: ['VERB_POTENTIAL'] },
    { replace: 'れる', with: 'る', applyTo: ['VERB_POTENTIAL'] },
    { replace: 'こられる', with: 'くる', applyTo: ['VERB_POTENTIAL'] },
    { replace: 'でくる', with: 'する', applyTo: ['VERB_POTENTIAL'] },
  ],

}

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
];
