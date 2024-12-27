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
    input: "話した",
    output: ["話す"],
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
  {
    input: "切らなかった",
    output: ["切る"],
    description: "past negative る"
  },
  {
    input: "しなかった",
    output: ["する"],
    description: "past negative する",
  },
  {
    input: "こなかった",
    output: ["くる"],
    description: "past negative くる",
  },
  {
    input: "なかった",
    output: ["ある"],
    description: "past negative ある"
  },
  {
    input: "話します",
    output: ["話す"],
    description: "polite す",
  },
  {
    input: "書きます",
    output: ["書く"],
    description: "polite く",
  },
  {
    input: "泳ぎます",
    output: ["泳ぐ"],
    description: "polite ぐ",
  },
  {
    input: "遊びます",
    output: ["遊ぶ"],
    description: "polite ぶ",
  },
  {
    input: "待ちます",
    output: ["待つ"],
    description: "polite つ",
  },
  {
    input: "飲みます",
    output: ["飲む"],
    description: "polite む",
  },
  {
    input: "死にます",
    output: ["死ぬ"],
    description: "polite ぬ",
  },
  {
    input: "買います",
    output: ["買う"],
    description: "polite う",
  },
  {
    input: "取ります",
    output: ["取る"],
    description: "polite る",
  },
  {
    input: "します",
    output: ["する"],
    description: "polite する",
  },
  {
    input: "きます",
    output: ["くる"],
    description: "polite くる",
  },
  {
    input: "話しません",
    output: ["話す"],
    description: "polite negative す",
  },
  {
    input: "書きません",
    output: ["書く"],
    description: "polite negative く",
  },
  {
    input: "泳ぎません",
    output: ["泳ぐ"],
    description: "polite negative ぐ",
  },
  {
    input: "遊びません",
    output: ["遊ぶ"],
    description: "polite negative ぶ",
  },
  {
    input: "待ちません",
    output: ["待つ"],
    description: "polite negative つ",
  },
  {
    input: "飲みません",
    output: ["飲む"],
    description: "polite negative む",
  },
  {
    input: "死にません",
    output: ["死ぬ"],
    description: "polite negative ぬ",
  },
  {
    input: "買いません",
    output: ["買う"],
    description: "polite negative う",
  },
  {
    input: "取りません",
    output: ["取る"],
    description: "polite negative る",
  },
  {
    input: "しません",
    output: ["する"],
    description: "polite negative する",
  },
  {
    input: "きません",
    output: ["くる"],
    description: "polite negative くる",
  },
  {
    input: "話そう",
    output: ["話す"],
    description: "volitional す",
  },
  {
    input: "書こう",
    output: ["書く"],
    description: "volitional く",
  },
  {
    input: "泳ごう",
    output: ["泳ぐ"],
    description: "volitional ぐ",
  },
  {
    input: "遊ぼう",
    output: ["遊ぶ"],
    description: "volitional ぶ",
  },
  {
    input: "待とう",
    output: ["待つ"],
    description: "volitional つ",
  },
  {
    input: "飲もう",
    output: ["飲む"],
    description: "volitional む",
  },
  {
    input: "死のう",
    output: ["死ぬ"],
    description: "volitional ぬ",
  },
  {
    input: "買おう",
    output: ["買う"],
    description: "volitional う",
  },
  {
    input: "取ろう",
    output: ["取る"],
    description: "volitional る",
  },
  {
    input: "しよう",
    output: ["する"],
    description: "volitonal する",
  },
  {
    input: "きょう",
    output: ["くる"],
    description: "volitional くる",
  },
];

describe('Deinflection of godan verbs', () => {
  runTests(tests);
})
