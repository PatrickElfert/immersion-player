import {DeinflectionTest, runTests} from "../../deinflect-test";

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
  {
    input: "いきたくない",
    output: ["いく"],
    description: "desire negative",
  },
  {
    input: "いきたかった",
    output: ["いく"],
    description: "desire past",
  },
  {
    input: "いきたくなかった",
    output: ["いく"],
    description: "desire past negative",
  },
  {
    input: "早く",
    output: ["早い"],
    description: "adverb",
  }
]

describe('Deinflection of い adjectives', () => {
  runTests(tests);
})
