import { InflectionRule, Types } from '../../../deinflect';
import { toHiragana, toRomaji } from 'wanakana';

const U_VERB_ENDINGS = ['す', 'く', 'ぐ', 'ぶ', 'つ', 'む', 'う', 'る', 'ぬ'];

export const negative: InflectionRule[] = U_VERB_ENDINGS.map((suffix, i) => ({
  suffix: `${toHiragana(toRomaji(suffix).replace('u', 'a'))}ない`,
  replaceWith: U_VERB_ENDINGS[i],
  dict: {
    lookup: true,
    type: [Types.Verb],
  },
}));

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
export const te: InflectionRule[] = TE_ENDINGS.map((teEnding, i) => ({
  suffix: teEnding,
  replaceWith: U_VERB_ENDINGS[i],
  dict: {
    lookup: true,
    type: [Types.Verb],
  },
}));

export const past: InflectionRule[] = TE_ENDINGS.map((teEnding, i) => ({
  suffix: `${toHiragana(toRomaji(teEnding).replace('e', 'a'))}`,
  replaceWith: teEnding,
  dict: {
    type: [Types.Verb],
    lookup: false,
  },
}));

export const pastNegative: InflectionRule[] = negative.map((rule, i) => ({
  suffix: `${rule.suffix.replace('い', 'かった')}`,
}))
