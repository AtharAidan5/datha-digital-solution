import { LEGAL_APPROVED } from '../../src/lib/site.config'
import { expect, test } from './fixtures'

const HOME_H1 = 'DATHA Digital Solution — Next-Gen IT Partner'
const PAGES = [
  { path: '/privacy/', title: 'Privacy Policy' },
  { path: '/terms/', title: 'Terms' },
]

for (const p of PAGES) {
  test.describe(p.path, () => {
    test('loads with its own title and one h1', async ({ page }) => {
      await page.goto(p.path)
      await expect(page).toHaveTitle(`${p.title} — DATHA Digital Solution`)
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(p.title)
    })

    test(LEGAL_APPROVED ? 'shows no draft badge' : 'shows the draft badge until approved', async ({ page }) => {
      await page.goto(p.path)
      const badge = page.getByText('Draft: pending legal review')
      if (LEGAL_APPROVED) await expect(badge).toHaveCount(0)
      else await expect(badge).toBeVisible()
    })

    test('back link returns home', async ({ page, baseURL }) => {
      await page.goto(p.path)
      await page.getByRole('link', { name: 'Back to home' }).click()
      await expect(page).toHaveURL(`${baseURL}/`)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(HOME_H1)
    })

    test('footer link on the home page opens it', async ({ page, baseURL }) => {
      await page.goto('/')
      await page.getByRole('contentinfo').getByRole('link', { name: p.title, exact: true }).click()
      await expect(page).toHaveURL(`${baseURL}${p.path}`)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(p.title)
    })
  })
}
