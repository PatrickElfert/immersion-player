import { backTemplate, frontTemplate } from '@immersion-player/shared-flashcard-templates';
import { stringifyCharacters } from '@immersion-player/shared-utils';

type TemplateValues = { [key: string]: string };

function replaceTemplateValues(str: string, values: TemplateValues) {
  return Object.entries(values).reduce((updatedStr, [key, value]) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    return updatedStr.replace(regex, value);
  }, str);
}

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

const values: TemplateValues = {
  image: 'src/assets/test.png',
  sentenceAudio: 'src/assets/test.mp3',
  definitions: 'customer*~*guest; visitor',
  targetWord: stringifyCharacters([{ original: 'お客', furigana: 'おきゃく' }]),
  sentenceBack: stringifyCharacters(sentence),
};

export class BackTemplate extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = replaceTemplateValues(backTemplate, values);
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
    this.innerHTML = replaceTemplateValues(frontTemplate, values);
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
