import inflections from './inflections.json'

type Inflection = [string, string, Inflection[]];

export function deinflect(
  term: string,
  inflections: Inflection[],
  root: Inflection[],
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

export function runOnInflectionRoots(term:string) {
  const result = [];

  for (const root of inflections as Inflection[]) {
    const deinflected = deinflect(term, [root], [root]);
    if (deinflected !== term) {
      result.push(deinflected);
    }
  }

  return result;
}
