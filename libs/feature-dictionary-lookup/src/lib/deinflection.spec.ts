import { getDeinflections } from "./deinflect";

export type DeinflectionTest = {
  input: string;
  output: string[];
  description: string;
};

const deinflectionTests: DeinflectionTest[] = [
  {
    input: "帰ります",
    output: ["帰る"],
    description: "polite form of godan verbs",
  },
  {
    input: "話します",
    output: ["話す"],
    description: "negative polite of godan verbs",
  },
  {
    input: "します",
    output: ["する"],
    description: "polite of irregular verb する",
  },
  {
    input: "しません",
    output: ["する"],
    description: "negative polite of irregular verb する",
  },
  {
    input: "きます",
    output: ["くる"],
    description: "polite of irregular verb くる",
  },
  {
    input: "きません",
    output: ["くる"],
    description: "negative polite of irregular verb くる",
  },
  {
    input: "あります",
    output: ["ある"],
    description: "polite of irregular verb ある",
  },
  {
    input: "ありません",
    output: ["ある"],
    description: "negative of irregular verb ある",
  },
  {
    input: "食べます",
    output: ["食べる"],
    description: "polite form of ichidan verbs",
  },
  {
    input: "考えません",
    output: ["考える"],
    description: "negative polite form of ichidan verbs",
  },
  {
    input: "可愛ければ",
    output: ["可愛い"],
    description: "conditional of い adjectives",
  },
  {
    input: "可愛けりや",
    output: ["可愛い"],
    description: "contraction of conditional い adjectives",
  },
  {
    input: "元気じゃない",
    output: ["元気"],
    description: "negative of nouns and な adjectives",
  },
  {
    input: "食べたい",
    output: ["食べる"],
    description: "desire of ichidan verbs",
  },
  {
    input: "入りたい",
    output: ["入る"],
    description: "desire of godan verbs",
  },
  {
    input: "行こう",
    output: ["行く"],
    description: "volitional of godan verbs",
  },
  {
    input: "食べよう",
    output: ["食べる"],
    description: "volitional of ichidan verbs",
  },
  {
    input: "行きましよう",
    output: ["行く"],
    description: "polite volitional of godan verbs",
  },
  {
    input: "食べましよう",
    output: ["食べる"],
    description: "polite volitional of ichidan verbs",
  },
];

test.each(deinflectionTests)("$description", ({ input, output }) => {
  /** the deinflection result can deliver more result which might be invalid,
   * this might not be a problem since we won't find them in a dictionary anyway **/
  const deinflected = getDeinflections(input);
  expect(
    output.every((expected) => deinflected.includes(expected)),
  ).toBeTruthy();
});
