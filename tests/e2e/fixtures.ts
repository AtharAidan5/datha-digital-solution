import { test as base, expect, type Page } from '@playwright/test'

export { expect }

/**
 * Placeholders still expected on the home page (text of each `[data-placeholder]`).
 * Remove an entry when its real value lands in src/lib/site.config.ts; placeholders.spec.ts fails on anything new.
 */
export const KNOWN_PLACEHOLDERS = ['LinkedIn', 'Instagram']

/** Set `LAUNCH=1` to fail on every remaining placeholder (pre-launch gate). */
export const LAUNCH = process.env.LAUNCH === '1'

export const SECTION_IDS = ['top', 'about', 'services', 'process', 'contact'] as const

/**
 * Shared `test`: Google Fonts answered with empty CSS (hermetic, no network), and every console error or
 * uncaught exception fails the test.
 */
export const test = base.extend<{ consoleErrors: string[] }>({
  consoleErrors: [
    async ({ page }, use) => {
      await page.route(/fonts\.(googleapis|gstatic)\.com/, (route) =>
        route.fulfill({ status: 200, contentType: 'text/css', body: '' }),
      )
      const errors: string[] = []
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(msg.text())
      })
      page.on('pageerror', (err) => errors.push(err.message))
      await use(errors)
      expect(errors, 'console errors').toEqual([])
    },
    { auto: true },
  ],
})

/** Language choice as the site stores it. Call before `page.goto`; it applies to every load in the test. */
export async function setStoredLang(page: Page, lang: 'en' | 'id') {
  await page.addInitScript((l) => localStorage.setItem('datha.lang', l), lang)
}

/** Text of every flagged placeholder on the page. */
export function placeholderTexts(page: Page) {
  return page.locator('[data-placeholder]').evaluateAll((els) => els.map((el) => el.textContent?.trim() ?? ''))
}
