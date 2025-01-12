export const backTemplate = `
  <h2>{{sentence}}</h2>
  <h4>{{targetWord}}</h4>
  <img src="{{image}}" />
  <audio autoplay controls>
    <source src="{{sentenceAudio}}" type="audio/mpeg">
  </audio>
  <ol id="dynamic-fields"></ol>
  <script>
    const rawDefinitions = '{{definitions}}';
    const delimiter = '*~*';

    const definitions = rawDefinitions.split(delimiter).map(def => def.trim());
    const container = document.getElementById('dynamic-fields');

    function parseTextWithFurigana(text) {
      const pattern = /(.*?)\\[([^]]+)\\]/g;
      let result = '';
      let lastIndex = 0;

      text.replace(pattern, (match, original, furigana, offset) => {
        result += text.substring(lastIndex, offset);

        result += \`<ruby>\${original}<rt>\${furigana}</rt></ruby>\`;
        lastIndex = offset + match.length;
      });

      result += text.substring(lastIndex);
      return result;
    }

    definitions.forEach((definition, index) => {
      const fieldElement = document.createElement('li');
      fieldElement.innerHTML = parseTextWithFurigana(definition);
      container.appendChild(fieldElement);
    });
  </script>
`;
