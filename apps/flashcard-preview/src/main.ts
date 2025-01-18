import { backTemplate, frontTemplate } from '@immersion-player/shared-flashcard-templates';

type TemplateValues = {[key: string]: string};

function replaceTemplateValues(str: string, values: TemplateValues) {
  return Object.entries(values).reduce((updatedStr, [key, value]) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    return updatedStr.replace(regex, value);
  }, str);
}

const values: TemplateValues = {
  image: './test.png',
  sentenceAudio: './sentenceAudio.mp3',
  definitions: 'def',
  targetWord: 'targetWord',
  sentenceBack: 'sentenceBack',
}

export class BackTemplate extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = replaceTemplateValues(backTemplate, values);
    this.querySelectorAll('script').forEach(script => {
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
  }
}

customElements.define('back-template', BackTemplate);
customElements.define('front-template', FrontTemplate);
