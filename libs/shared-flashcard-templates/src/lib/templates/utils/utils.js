export function parseTextWithFurigana(text) {
  const regex = /([^[\]]+)(?:\[([^[\]]*)\])?/g;
  const parsed = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    const word = match[1];
    const reading = match[2] || null;
    parsed.push({ word, reading });
  }

  return parsed.map(({ word, reading }) => `<ruby>${word}<rt>${reading ?? ''}</rt></ruby>`).join('');
}

export function createTargetWordsTemplate(targetWords) {
  let html = '<dl style="margin:1rem 0; padding:0;">';

  for (const targetWord of targetWords) {
    html += `
      <dt style="
        font-weight: bold;
        margin: 0.75rem 0 0.25rem;
        font-size: 1.1em;
      ">
        ${parseTextWithFurigana(targetWord.token)}
      </dt>
    `;
    for (const def of targetWord.definitions) {
      html += `
        <dd style="
          font-weight: lighter;
          margin: 0 0 0.5rem 1.5rem;
          line-height: 1.4;
        ">
          • ${def.text}
        </dd>
      `;
    }
  }

  html += '</dl>';
  return html;
}
