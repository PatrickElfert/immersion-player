import { Ruleset } from '../../deinflect';

export const negative: Ruleset = {
  description: '',
  produces: 'ADJECTIVE_BASE',
  rules: [{ replace: 'くない', with: 'い', applyTo: ['ADJECTIVE_NEGATIVE'] }],
};

export const past: Ruleset = {
  description: '',
  produces: 'ADJECTIVE_BASE',
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
  produces: 'ADJECTIVE_NEGATIVE',
  rules: [
    {
      replace: 'かった',
      with: 'い',
      applyTo: ['ADJECTIVE_PAST_NEGATIVE'],
    },
  ],
};
