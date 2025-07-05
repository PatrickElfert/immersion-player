import { backTemplate, frontTemplate } from '@immersion-player/shared-flashcard-templates';
import Mustache from 'mustache';
import { AnkiCardDto, TargetWord } from '@immersion-player/shared-types';

Mustache.escape = (text) => text;

const sentence = [
  { original: 'もっと', furigana: null },
  { original: '２', furigana: 'に' },
  { original: '人', furigana: 'ひと' },
  { original: 'で', furigana: null },
  { original: 'お客', furigana: 'おきゃく' },
  { original: 'さん', furigana: null },
  { original: 'せ', furigana: null },
  { original: '喜ば', furigana: 'よろこば' },
  { original: 'たかっ', furigana: null },
  { original: 'た', furigana: null },
  { original: 'な', furigana: null },
];

const targetWords: TargetWord[] = [
  {
    token: [{ original: '真夏', furigana: 'まなつ' }],
    definitions: [{ description: '', text: 'middle of summer; height of summer; midsummer' }],
  },
];

const values: AnkiCardDto = {
  image: 'src/assets/test.png',
  sentenceAudio: 'src/assets/test.mp3',
  targetWords: JSON.stringify(targetWords),
  sentenceBack: JSON.stringify(sentence),
  sentenceFront: 'もっと２人でお客さんせ喜ばたかったな',
};

export class BackTemplate extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = Mustache.render(backTemplate, values);
    this.querySelectorAll('script').forEach((script) => {
      const scriptElement = document.createElement('script');
      scriptElement.textContent = script.textContent;
      document.body.appendChild(scriptElement);
      script.remove();
    });
  }
}

export class FrontTemplate extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = Mustache.render(frontTemplate, values);
    this.querySelectorAll('script').forEach((script) => {
      const scriptElement = document.createElement('script');
      scriptElement.textContent = script.textContent;
      document.body.appendChild(scriptElement);
      script.remove();
    });
  }
}

customElements.define('back-template', BackTemplate);
customElements.define('front-template', FrontTemplate);
