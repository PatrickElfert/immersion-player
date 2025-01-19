import { parseTextWithFurigana } from './utils/utils';

export const backTemplate = `
 <div data-testid="backTemplate" style="display: flex; flex-direction: column; align-items: center">
  <h2 data-testid="targetSentence"></h2>
  <h4 data-testid="targetWord"></h4>
  <img data-testid="screenshot" style="height: 400px" src="{{image}}" />
  <audio data-testid="sentenceAudio" autoplay controls>
   <source src="{{sentenceAudio}}" type="audio/mpeg">
  </audio>
  <ol data-testid="definitions" id="dynamic-fields"></ol>
 </div>
<script>

const rawDefinitions = '{{definitions}}';
  ${parseTextWithFurigana.toString()}
  const rawTargetWord = '{{targetWord}}';
  const rawSentence = '{{sentenceBack}}'
  const processedTargetWord = parseTextWithFurigana(rawTargetWord);
  const processedSentence = parseTextWithFurigana(rawSentence);
  const targetWordContainer = document.querySelector('h4');
  const sentenceContainer = document.querySelector('h2')
  targetWordContainer.innerHTML = processedTargetWord;
  sentenceContainer.innerHTML = processedSentence;

  const delimiter = '*~*';
  const definitions = rawDefinitions.split(delimiter).map(def => def.trim());
  const container = document.getElementById('dynamic-fields');


  definitions.forEach((definition, index) => {
    const fieldElement = document.createElement('li');
    fieldElement.textContent = definition;
    container.appendChild(fieldElement);
  });
</script>
`;
