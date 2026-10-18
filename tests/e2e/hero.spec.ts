import { HERO_INTERVAL_MS } from '../../src/components/Hero/slides'
import { expect, test } from './fixtures'
import type { Page } from '@playwright/test'

const tab = (page: Page, n: number) => page.getByRole('tab', { name: `Go to slide ${n}` })
// Inactive slides are aria-hidden, so getByRole would skip them: select by roledescription instead.
const slide = (page: Page, n: number) => page.locator('[aria-roledescription="slide"]').nth(n - 1)

async function expectCurrent(page: Page, n: number) {
  await expect(tab(page, n)).toHaveAttribute('aria-selected', 'true')
  await expect(slide(page, n)).toHaveAttribute('aria-hidden', 'false')
}

test.describe('hero carousel', () => {
  test('dots and arrow buttons change the slide', async ({ page }) => {
    await page.goto('/')
    await expectCurrent(page, 1)

    await tab(page, 2).click()
    await expectCurrent(page, 2)
    await expect(slide(page, 1)).toHaveAttribute('aria-hidden', 'true')
    await expect(page.getByRole('heading', { level: 2, name: 'Obsessed With Your Outcomes' })).toBeVisible()

    await page.getByRole('button', { name: 'Next slide' }).click()
    await expectCurrent(page, 3)
    await page.getByRole('button', { name: 'Previous slide' }).click()
    await expectCurrent(page, 2)
  })

  test('arrow keys in the tablist wrap around and move focus', async ({ page }) => {
    await page.goto('/')
    await tab(page, 1).focus()
    await page.keyboard.press('ArrowLeft')
    await expectCurrent(page, 4)
    await expect(tab(page, 4)).toBeFocused()
    await page.keyboard.press('Home')
    await expectCurrent(page, 1)
    await expect(tab(page, 1)).toBeFocused()
  })

  test('reduced motion: no autoplay, the control offers Play', async ({ page }) => {
    await page.clock.install()
    await page.goto('/')
    await expect(page.getByRole('button', { name: 'Play slideshow' })).toBeVisible()
    await page.clock.runFor(HERO_INTERVAL_MS * 3)
    await expectCurrent(page, 1)
  })

  test.describe('with motion', () => {
    test.use({ reducedMotion: 'no-preference' })

    test('autoplays, Pause stops it, Play resumes it', async ({ page }) => {
      await page.clock.install()
      await page.goto('/')

      await page.clock.runFor(HERO_INTERVAL_MS + 500)
      await expectCurrent(page, 2)

      await page.getByRole('button', { name: 'Pause slideshow' }).click()
      await page.clock.runFor(HERO_INTERVAL_MS * 3)
      await expectCurrent(page, 2)

      // Play must resume even while the pointer and focus are inside the carousel.
      await page.getByRole('button', { name: 'Play slideshow' }).click()
      await page.clock.runFor(HERO_INTERVAL_MS + 500)
      await expectCurrent(page, 3)
    })
  })
})
