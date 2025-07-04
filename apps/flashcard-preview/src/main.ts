import { backTemplate, frontTemplate } from '@immersion-player/shared-flashcard-templates';
import { stringifyCharacters } from '@immersion-player/shared-utils';
import Mustache from 'mustache';

Mustache.escape = (text) => text;

type TemplateValues = { [key: string]: any };

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

const targetWords = [
  {
    token: stringifyCharacters([{ original: '真夏', furigana: 'まなつ' }]),
    definitions: [{ description: '', text: 'middle of summer; height of summer; midsummer' }],
  },
];

const values: TemplateValues = {
  image: 'src/assets/test.png',
  sentenceAudio: 'src/assets/test.mp3',
  targetWords: JSON.stringify(targetWords),
  sentenceBack: stringifyCharacters(sentence),
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
