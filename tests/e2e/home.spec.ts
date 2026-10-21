import { SECTION_IDS, expect, test } from './fixtures'

test.describe('home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has its title, one h1 and the page landmarks', async ({ page }) => {
    await expect(page).toHaveTitle('DATHA Digital Solution — Next-Gen IT Partner')
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('DATHA Digital Solution — Next-Gen IT Partner')
    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByRole('main')).toBeVisible()
    await expect(page.getByRole('contentinfo')).toBeVisible()
  })

  test('renders every section in order', async ({ page }) => {
    const ids = await page
      .locator(SECTION_IDS.map((id) => `#${id}`).join(', '))
      .evaluateAll((els) => els.map((el) => el.id))
    expect(ids).toEqual([...SECTION_IDS])
  })

  test('skip link is the first tab stop and targets main', async ({ page, isMobile, baseURL, browserName }) => {
    test.skip(isMobile, 'keyboard flow is checked on desktop')
    // Safari's Tab skips links unless the user turns on "Press Tab to highlight each item" (or holds Option on macOS,
    // which Playwright's WebKit build cannot emulate), so a link can never be the first Tab stop there.
    test.skip(browserName === 'webkit', 'WebKit Tab skips links by default')
    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: 'Skip to content' })
    await expect(skip).toBeFocused()
    await expect(skip).toBeInViewport()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(`${baseURL}/#main`)
  })
})
