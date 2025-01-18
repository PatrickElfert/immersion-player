import { parseTextWithFurigana } from './utils/utils';

export const backTemplate = `
 <div style="display: flex; flex-direction: column; align-items: center">
  <h2></h2>
  <h4></h4>
  <img style="height: 400px" src="{{image}}" />
  <audio autoplay controls>
   <source src="{{sentenceAudio}}" type="audio/mpeg">
  </audio>
  <ol id="dynamic-fields"></ol>
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
