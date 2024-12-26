import {DeinflectionTest} from "../../deinflection.spec";
import {runTests} from "../../deinflect-test";

const tests: DeinflectionTest[] = [
  {
    input: "忙しくない",
    output: ["忙しい"],
    description: "negative",
  },
  {
    input: "高かった",
    output: ["高い"],
    description: "past",
  },
  {
    input: "高くなかった",
    output: ["高い"],
    description: "past negative",
  },
]

describe('Deinflection of い adjectives', () => {
  runTests(tests);
})
