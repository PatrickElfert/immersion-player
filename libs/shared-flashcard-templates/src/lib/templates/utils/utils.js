export function parseTextWithFurigana(text) {
  console.log('test')

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
