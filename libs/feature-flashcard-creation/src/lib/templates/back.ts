export const backTemplate = `
  <script>
   const rawDefinitions = '{{definitions}}'
   const delimiter = ';'

   const definitions = rawDefinitions.split(delimiter).map(def => def.trim());
   const container = document.getElementById('dynamic-fields');

    definitions.forEach((definition, index) => {
        const fieldElement = document.createElement('li');
        fieldElement.textContent = definition;
        container.appendChild(fieldElement);
    });
  </script>
  <h2>{{sentence}}</h2>
  <h4>{{targetWord}}</h4>
  <ol id="dynamic-fields"></ol>
`;
