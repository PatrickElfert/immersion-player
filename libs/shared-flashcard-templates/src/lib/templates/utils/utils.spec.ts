import { parseTextWithFurigana } from './utils';

it('renders correctly', () => {
  const text = '常勤[じょうきん]さん[]パンダ[ぱんだ]が[]い[]ない[]と[]僕[ぼく]の[]か[]わい[]が[]引き立た[ひきたた]ない[]よ[]';
  const output = parseTextWithFurigana(text);
  console.log(output);
})
