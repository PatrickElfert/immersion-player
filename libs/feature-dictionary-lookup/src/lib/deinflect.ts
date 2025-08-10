import { rulesets as verbRulesets } from './deinflections/verbs/inflections.js';
import { rulesets as adjectiveRuleset } from './deinflections/adjectives/inflections.js';

type Types =
  | 'NEW'
  | 'UNKNOWN'
  | 'VERB_NEGATIVE'
  | 'VERB_BASE'
  | 'VERB_PAST'
  | 'VERB_POLITE'
  | 'VERB_POLITE_NEGATIVE'
  | 'VERB_PAST_NEGATIVE'
  | 'VERB_PAST_POLITE'
  | 'VERB_PAST_POLITE_NEGATIVE'
  | 'VERB_VOLITIONAL'
  | 'VERB_VOLITIONAL_POLITE'
  | 'VERB_DESIRE'
  | 'ADJECTIVE_BASE'
  | 'ADJECTIVE_PAST'
  | 'ADJECTIVE_NEGATIVE'
  | 'ADJECTIVE_PAST_NEGATIVE'
  | 'ADVERB'
  | 'VERB_PROGRESSIVE'
  | 'VERB_PROGRESSIVE_NEGATIVE'
  | 'VERB_PROGRESSIVE_POLITE'
  | 'VERB_PROGRESSIVE_POLITE_NEGATIVE'
  | 'VERB_POTENTIAL';

export type Rule = {
  applyTo: Types[];
  replace: string;
  with: string;
};

export type Ruleset = {
  description: string;
  produces: Types[];
  rules: Rule[];
};

type DeinflectionTarget = {
  type: Types;
  term: string;
  appliedRules: Rule[];
};

const rulesets = [...verbRulesets, ...adjectiveRuleset];
const baseTypes: Types[] = ['ADJECTIVE_BASE', 'VERB_BASE'];

export function getDeinflections(term: string) {
  let targets: DeinflectionTarget[] = [{ type: 'UNKNOWN', term, appliedRules: [] }];

  while (targets.some((r) => !baseTypes.includes(r.type))) {
    targets = targets.map((target) => (!baseTypes.includes(target.type) ? deinflect(target) : target)).flat();
  }
  return targets.map((r) => r.term);
}

function deinflect(target: DeinflectionTarget) {
  const result: DeinflectionTarget[] = [];

  for (const ruleset of rulesets) {
    for (const rule of ruleset.rules) {
      if (target.term.endsWith(rule.replace) && (target.type === 'UNKNOWN' || rule.applyTo.includes(target.type))) {
        const newTerm = target.term.slice(0, -rule.replace.length) + rule.with;

        const deinflections = ruleset.produces.map((newType: any) => ({
          term: newTerm,
          type: newType,
          appliedRules: [...target.appliedRules, rule],
        }));

        result.push(...deinflections);
      }
    }
  }

  return result;
}
