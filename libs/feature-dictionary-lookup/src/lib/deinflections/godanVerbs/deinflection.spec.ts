import {DeinflectionTest} from "../../deinflection.spec";
import {runTests} from "../../deinflect-test";

const tests: DeinflectionTest[] = [
  {
    input: "話さない",
    output: ["話す"],
    description: "negative す",
  },
  {
    input: "書かない",
    output: ["書く"],
    description: "negative く",
  },
  {
    input: "泳がない",
    output: ["泳ぐ"],
    description: "negative ぐ",
  },
  {
    input: "遊ばない",
    output: ["遊ぶ"],
    description: "negative ぶ",
  },
  {
    input: "待たない",
    output: ["待つ"],
    description: "negative つ",
  },
  {
    input: "歩まない",
    output: ["歩む"],
    description: "negative む",
  },
  {
    input: "死なない",
    output: ["死ぬ"],
    description: "negative ぬ",
  },
  {
    input: "買わない",
    output: ["買う"],
    description: "negative わ",
  },
  {
    input: "取らない",
    output: ["取る"],
    description: "negative る",
  },
  {
    input: "知らない",
    output: ["知る"],
    description: "negative ら",
  },
  {
    input: "しない",
    output: ["する"],
    description: "negative する",
  },
  {
    input: "こない",
    output: ["くる"],
    description: "negative くる",
  },
  {
    input: "ない",
    output: ["ある"],
    description: "negative ある",
  },
  {
    input: "した",
    output: ["する"],
    description: "past tense す",
  },
  {
    input: "書いた",
    output: ["書く"],
    description: "past tense く",
  },
  {
    input: "泳いだ",
    output: ["泳ぐ"],
    description: "past tense ぐ",
  },
  {
    input: "遊んだ",
    output: ["遊ぶ"],
    description: "past tense ぶ",
  },
  {
    input: "待った",
    output: ["待つ"],
    description: "past tense つ",
  },
  {
    input: "歩んだ",
    output: ["歩む"],
    description: "past tense む",
  },
  {
    input: "死んだ",
    output: ["死ぬ"],
    description: "past tense ぬ",
  },
  {
    input: "買った",
    output: ["買う"],
    description: "past tense う",
  },
  {
    input: "取った",
    output: ["取る"],
    description: "past tense る",
  },
  {
    input: "した",
    output: ["する"],
    description: "past tense する",
  },
  {
    input: "きた",
    output: ["くる"],
    description: "past tense くる",
  },
  {
    input: "行った",
    output: ["行く"],
    description: "past tense いく",
  },
  {
    input: "話さなかった",
    output: ["話す"],
    description: "negative past す",
  },
  {
    input: "書かなかった",
    output: ["書く"],
    description: "negative past く",
  },
  {
    input: "泳がなかった",
    output: ["泳ぐ"],
    description: "negative past ぐ",
  },
  {
    input: "遊ばなかった",
    output: ["遊ぶ"],
    description: "negative past ぶ",
  },
  {
    input: "持たなかった",
    output: ["持つ"],
    description: "negative past つ",
  },
  {
    input: "歩まなかった",
    output: ["歩む"],
    description: "negative む",
  },
  {
    input: "死ななかった",
    output: ["死ぬ"],
    description: "negative past ぬ",
  },
  {
    input: "買わなかった",
    output: ["買う"],
    description: "past negative う",
  },
];

describe('Deinflection of godan verbs', () => {
  runTests(tests);
})
