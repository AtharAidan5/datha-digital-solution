import { KNOWN_PLACEHOLDERS, LAUNCH, expect, placeholderTexts, setStoredLang, test } from './fixtures'

for (const lang of ['en', 'id'] as const) {
  test(`home page has no unexpected placeholders (${lang})`, async ({ page }) => {
    await setStoredLang(page, lang)
    await page.goto('/')
    const expected = LAUNCH ? [] : KNOWN_PLACEHOLDERS
    expect((await placeholderTexts(page)).sort()).toEqual([...expected].sort())
  })
}

test('placeholders never render as links, and no template tokens leak', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('a[data-placeholder], [data-placeholder] a')).toHaveCount(0)
  expect(await page.locator('body').innerText()).not.toMatch(/\{\{\w+\}\}|\[PLACEHOLDER\]/)
})

for (const path of ['/privacy/', '/terms/']) {
  test(`${path} has no placeholders at launch`, async ({ page }) => {
    test.skip(!LAUNCH, 'legal text is pending (LEGAL_APPROVED = false); run with LAUNCH=1 before going live')
    await page.goto(path)
    expect(await placeholderTexts(page)).toEqual([])
  })
}
