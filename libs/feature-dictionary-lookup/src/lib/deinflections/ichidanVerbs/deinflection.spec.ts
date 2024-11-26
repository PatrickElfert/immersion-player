import {DeinflectionTest} from "../../deinflection.spec";
import {runTests} from "../../deinflect-test";

const tests: DeinflectionTest[] = [
  {
    input: "考えない",
    output: ["考える"],
    description: "negative",
  },
  {
    input: "食べた",
    output: ["食べる"],
    description: "negative past",
  },
]

describe('Deinflection of ichidan verbs', () => {
  runTests(tests);
})
