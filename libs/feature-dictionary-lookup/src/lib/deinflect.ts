import baseInflections from './inflections.json';
import iAdjective from './deinflections/iAdjectives/inflections.json';
import godanVerbs from './deinflections/godanVerbs/inflections.json';
import ichidanVerbs from './deinflections/ichidanVerbs/inflections.json';

type Inflection = [string, string, Inflection[]];

type DeinflectionOutput =
  | 'VERB_TE_FORM'
  | 'VERB_NEGATIVE'
  | 'VERB_BASE'
  | 'VERB_PAST'
  | 'VERB_PAST_NEGATIVE'
  | 'ADJECTIVE_BASE'
  | 'ADJECTIVE_PAST'
  | 'ADJECTIVE_NEGATIVE'
  | 'ADJECTIVE_PAST_NEGATIVE';

export type Rule = {
  applyTo: DeinflectionOutput[];
  replace: string;
  with: string;
};

export type Ruleset = {
  description: string;
  produces: DeinflectionOutput;
  rules: Rule[];
};

//function createInflection(value: {forInput: any, apply: any})

const inflections = [
  ...baseInflections,
  ...iAdjective,
  ...godanVerbs,
  ...ichidanVerbs,
];

export function deinflect(
  term: string,
  inflections: Inflection[],
  root: Inflection[]
) {
  for (const [deinflected, inflected, subInflections] of inflections) {
    if (term.endsWith(inflected)) {
      const newTerm = term.slice(0, -inflected.length) + deinflected;
      return deinflect(newTerm, root, root);
    }
    if (subInflections.length > 0) {
      return deinflect(term, subInflections, root);
    }
  }
  return term;
}

export function getDeinflections(token: string) {
  const result = [];

  for (const root of inflections as Inflection[]) {
    const deinflected = deinflect(token, [root], [root]);
    if (deinflected !== token) {
      result.push(deinflected);
    }
  }
  return result;
}
