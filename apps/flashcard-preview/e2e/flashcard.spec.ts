import { test, expect, Locator } from '@playwright/test';

async function validateRubyTags(target: Locator, expectedTokens: { base: string; rt: string }[]) {
  const rubyElements = await target.locator('ruby').all();

  for (let i = 0; i < expectedTokens.length; i++) {
    const ruby = rubyElements[i];
    const rt = ruby.locator('rt');

    const baseText = await ruby.evaluate((node) => node.firstChild?.nodeValue || '');
    expect(baseText).toBe(expectedTokens[i].base);

    const rtText = await rt.evaluate((node) => node.textContent || '');
    expect(rtText).toBe(expectedTokens[i].rt);
  }
}

test('renders front template', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-testid="frontTemplate"]').locator('[data-testid="targetSentence"]')).toHaveText(
    'もっと２人でお客さんせ喜ばたかったな'
  );
});

test('renders back template', async ({ page }) => {
  await page.goto('/');

  const backTemplate = page.locator('[data-testid="backTemplate"]');
  const targetSentence = backTemplate.locator('[data-testid="targetSentence"]');

  await expect(targetSentence).toHaveCount(1);

  const expectedTargetSentence = [
    { base: 'もっと', rt: '' },
    { base: '２', rt: 'に' },
    { base: '人', rt: 'ひと' },
    { base: 'で', rt: '' },
    { base: 'お客', rt: 'おきゃく' },
    { base: 'さん', rt: '' },
    { base: 'せ', rt: '' },
    { base: '喜ば', rt: 'よろこば' },
    { base: 'たかっ', rt: '' },
    { base: 'た', rt: '' },
    { base: 'な', rt: '' },
  ];

  await validateRubyTags(targetSentence, expectedTargetSentence);

  const targetWord = backTemplate.locator('[data-testid="targetWord"]');
  await expect(targetWord).toHaveCount(1);

  const expectedTargetWord = [{ base: 'お客', rt: 'おきゃく' }];

  await validateRubyTags(targetWord, expectedTargetWord);

  const screenshot = backTemplate.locator('[data-testid="screenshot"]');
  await expect(screenshot).toBeVisible();

  const sentenceAudio = backTemplate.locator('[data-testid="sentenceAudio"]');
  await expect(sentenceAudio).toBeVisible();

  const definitions = backTemplate.locator('[data-testid="definitions"]');
  await expect(definitions.locator('li')).toHaveCount(2);

  await expect(definitions.locator('li').nth(0)).toHaveText('customer');
  await expect(definitions.locator('li').nth(1)).toHaveText('guest; visitor');
});
