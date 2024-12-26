import {Rule, Ruleset} from "../../deinflect";

const U_VERB_ENDINGS = ['す', 'く', 'ぐ', 'ぶ', 'つ', 'む', 'う', 'る', 'ぬ'];
const A_VERB_ENDINGS = ['さ', 'か', 'が', 'ば', 'た', 'ま', 'わ', 'ら', 'な'];

const godanNegative: Rule[] = A_VERB_ENDINGS.map((a_verbEnding, i) => ({
  replace: `${a_verbEnding}ない`,
  with: U_VERB_ENDINGS[i],
  applyTo: ['VERB_NEGATIVE'],
}));

export const negative: Ruleset = {
  description: '',
  produces: 'VERB_BASE',
  rules: [
    ...godanNegative,
    { replace: 'ない', with: 'る', applyTo: ['VERB_NEGATIVE'] },
  ],
};

const TE_ENDINGS = [
  'して',
  'いて',
  'いで',
  'んで',
  'んで',
  'んで',
  'って',
  'って',
  'って',
];

export const te: Ruleset = {
  description: '',
  produces: 'VERB_BASE',
  rules: TE_ENDINGS.map((te_verbEnding, i) => ({
    replace: te_verbEnding,
    with: U_VERB_ENDINGS[i],
    applyTo: ['VERB_TE_FORM'],
  })),
};

export const past: Ruleset = {
  description: '',
  produces: 'VERB_TE_FORM',
  rules: [
    { replace: 'て', with: 'た', applyTo: ['VERB_PAST'] },
    { replace: 'で', with: 'だ', applyTo: ['VERB_PAST'] },
  ],
};

export const pastNegative: Ruleset = {
  description: '',
  produces: 'VERB_NEGATIVE',
  rules: [{ replace: 'かった', with: 'い', applyTo: ['VERB_PAST_NEGATIVE'] }],
};
