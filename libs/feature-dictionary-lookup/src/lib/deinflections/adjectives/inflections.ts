import { Rule, Ruleset } from '../../deinflect';

export const negative: Ruleset = {
  description: '',
  produces: ['ADJECTIVE_BASE', 'VERB_DESIRE'],
  rules: [{ replace: 'くない', with: 'い', applyTo: ['ADJECTIVE_NEGATIVE'] }],
};

export const past: Ruleset = {
  description: '',
  produces: ['ADJECTIVE_BASE', 'VERB_DESIRE'],
  rules: [
    {
      replace: 'かった',
      with: 'い',
      applyTo: ['ADJECTIVE_PAST'],
    },
  ],
};

export const pastNegative: Ruleset = {
  description: '',
  produces: ['ADJECTIVE_NEGATIVE'],
  rules: [
    {
      replace: 'かった',
      with: 'い',
      applyTo: ['ADJECTIVE_PAST_NEGATIVE'],
    },
  ],
};


const U_VERB_ENDINGS = ['す', 'く', 'ぐ', 'ぶ', 'つ', 'む', 'う', 'る', 'ぬ'];
const STEM_ENDINGS = ['し', 'き', 'ぎ', 'び', 'ち', 'み', 'い', 'り', 'に'];

const godanDesire: Rule[] = STEM_ENDINGS.map((stem_verbEnding, i) => ({
  replace: `${stem_verbEnding}たい`,
  with: U_VERB_ENDINGS[i],
  applyTo: ['VERB_DESIRE'],
}));

export const desire: Ruleset = {
  description: '',
  produces: ['VERB_BASE'],
  rules: [
    ...godanDesire,
    {
      replace: 'たい',
      with: 'る',
      applyTo: ['VERB_DESIRE'],
    },
  ],
};

export const adverb: Ruleset = {
  description: '',
  produces: ['ADJECTIVE_BASE'],
  rules: [
    {
      replace: 'く',
      with: 'い',
      applyTo: ['ADVERB'],
    },
  ],
};

export const rulesets = [pastNegative, past, negative, desire, adverb];

