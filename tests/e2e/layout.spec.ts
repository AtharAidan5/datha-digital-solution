import { expect, setStoredLang, test } from './fixtures'

const WIDTHS = [375, 768, 1280]
const PATHS = ['/', '/privacy/']

test.describe('layout', () => {
  test.skip(({ isMobile }) => isMobile, 'widths are set explicitly, so one project is enough')

  for (const lang of ['en', 'id'] as const) {
    for (const width of WIDTHS) {
      for (const path of PATHS) {
        test(`${path} has no horizontal scroll at ${width}px (${lang})`, async ({ page }) => {
          await setStoredLang(page, lang)
          await page.setViewportSize({ width, height: 900 })
          await page.goto(path)

          const { scrollWidth, clientWidth, wide } = await page.evaluate(() => {
            const root = document.documentElement
            // Hint for the failure message only: clipped decorations also show up here.
            const wide = [...document.querySelectorAll<HTMLElement>('body *')]
              .filter((el) => el.getBoundingClientRect().right > root.clientWidth + 1)
              .slice(0, 5)
              .map((el) => `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ''}.${[...el.classList].slice(0, 3).join('.')}`)
            return { scrollWidth: root.scrollWidth, clientWidth: root.clientWidth, wide }
          })
          expect(scrollWidth, `wider than the viewport: ${wide.join(', ')}`).toBe(clientWidth)
        })
      }
    }
  }
})
