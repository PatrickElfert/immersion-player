export function generateFuriganaTemplate(words) {
  return words.map(({ original, furigana }) => `<ruby>${original}<rt>${furigana ?? ''}</rt></ruby>`).join('');
}

export function createTargetWordsTemplate(targetWords) {
  let html = '<dl style="margin:1rem 0; padding:0;">';

  for (const targetWord of targetWords) {
    html += `
      <dt data-testid="targetWord" style="
        font-weight: bold;
        margin: 0.75rem 0 0.25rem;
        font-size: 1.1em;
      ">
        ${generateFuriganaTemplate(targetWord.token)}
      </dt>
    `;
    for (const def of targetWord.definitions) {
      html += `
        <dd data-testid="definition"  style="
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
