import { Ruleset } from '../../deinflect.js';

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

export const rulesets = [pastNegative, past, negative, adverb];

