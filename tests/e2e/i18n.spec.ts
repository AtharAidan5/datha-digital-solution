import { expect, test } from './fixtures'
import type { Page } from '@playwright/test'

const EN_TITLE = 'DATHA Digital Solution — Next-Gen IT Partner'
const ID_TITLE = 'DATHA Digital Solution — Mitra IT Generasi Baru'

/** First visible toggle: top bar on md+, navbar below md (the hidden one is skipped by getByRole). */
const toggle = (page: Page) => page.getByRole('radiogroup').first()
const radio = (page: Page, lang: 'en' | 'id') => toggle(page).getByRole('radio', { name: lang, exact: true })

test.describe('language', () => {
  test('defaults to English for an en-US browser', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(radio(page, 'en')).toHaveAttribute('aria-checked', 'true')
    await expect(page).toHaveTitle(EN_TITLE)
  })

  test.describe('Indonesian browser', () => {
    test.use({ locale: 'id-ID' })

    test('defaults to Indonesian', async ({ page }) => {
      await page.goto('/')
      await expect(page.locator('html')).toHaveAttribute('lang', 'id')
      await expect(radio(page, 'id')).toHaveAttribute('aria-checked', 'true')
      await expect(page).toHaveTitle(ID_TITLE)
    })
  })

  test('toggle switches text, lang, title and description, and survives a reload', async ({ page }) => {
    await page.goto('/')
    await radio(page, 'id').click()

    await expect(page.locator('html')).toHaveAttribute('lang', 'id')
    await expect(page).toHaveTitle(ID_TITLE)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /^Pengembangan aplikasi web dan mobile/)
    await expect(page.locator('#services h2')).toHaveText('Solusi IT end-to-end')
    await expect(toggle(page)).toHaveAccessibleName('Bahasa')
    expect(await page.evaluate(() => localStorage.getItem('datha.lang'))).toBe('id')

    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('lang', 'id')
    await expect(radio(page, 'id')).toHaveAttribute('aria-checked', 'true')
    await expect(page.locator('#services h2')).toHaveText('Solusi IT end-to-end')
  })

  test('arrow keys move the selection and announce it', async ({ page }) => {
    await page.goto('/')
    await radio(page, 'en').focus()
    await page.keyboard.press('ArrowRight')
    await expect(radio(page, 'id')).toBeFocused()
    await expect(radio(page, 'id')).toHaveAttribute('aria-checked', 'true')
    await expect(toggle(page).getByRole('status')).toHaveText('Bahasa: Indonesia')
  })

  test('legal pages follow the stored language', async ({ page }) => {
    await page.goto('/')
    await radio(page, 'id').click()
    await page.goto('/privacy/')
    await expect(page.locator('html')).toHaveAttribute('lang', 'id')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Kebijakan Privasi')
    await expect(page).toHaveTitle('Kebijakan Privasi — DATHA Digital Solution')
  })
})
