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
  let html = '<ul>';

  for (const [word, wordEntries] of targetWords) {
    html += `<li><strong>${parseTextWithFurigana(wordEntries[0].token)}</strong><ul>`;

    for (const entry of wordEntries) {
      for (const def of entry.definitions) {
        html += `<li>${def.text}</li>`;
      }
    }

    html += '</ul></li>';
  }

  html += '</ul>';
  return html;
}

