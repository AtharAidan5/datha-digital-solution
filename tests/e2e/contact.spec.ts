import { site } from '../../src/lib/site.config'
import { expect, test } from './fixtures'

/** Indonesian local number (0812…) to international digits (62812…), computed independently of src/lib/links.ts. */
const intl = (local: string) => local.replace(/\D/g, '').replace(/^0/, '62')
const whatsapp = site.social.find((s) => s.id === 'whatsapp')!

test.describe('contact links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('phone links dial the international number', async ({ page }) => {
    const tel = `tel:+${intl(site.phone)}`
    // Top bar + footer.
    await expect(page.locator(`a[href="${tel}"]`)).toHaveCount(2)
    await expect(page.getByRole('contentinfo').locator(`a[href="${tel}"]`)).toHaveText(site.phone)
  })

  test('email links open a mail draft, CTAs with a subject', async ({ page }) => {
    await expect(page.getByRole('contentinfo').locator(`a[href="mailto:${site.email}"]`)).toHaveText(site.email)

    const subjects = { contact: 'Website inquiry', quote: 'Quote request via website' }
    for (const [cta, subject] of Object.entries(subjects)) {
      const link = page.locator(`a[data-cta="${cta}"]`)
      const url = new URL((await link.getAttribute('href')) ?? '')
      expect(url.protocol).toBe('mailto:')
      expect(url.pathname).toBe(site.email)
      expect(url.searchParams.get('subject')).toBe(subject)
      await expect(link).toHaveAccessibleName(/\(opens your email app\)$/)
    }
  })

  test('WhatsApp opens a chat in a new tab', async ({ page }) => {
    const wa = page.getByRole('contentinfo').getByRole('link', { name: 'WhatsApp' })
    await expect(wa).toHaveAttribute('href', `https://wa.me/${intl(whatsapp.href)}`)
    await expect(wa).toHaveAttribute('target', '_blank')
    await expect(wa).toHaveAttribute('rel', 'noopener noreferrer')
    await expect(wa).toHaveAccessibleDescription('Opens in a new tab')
  })

  test('map link searches the office address in a new tab', async ({ page }) => {
    const map = page.getByRole('contentinfo').getByRole('link', { name: /View on map/ })
    const url = new URL((await map.getAttribute('href')) ?? '')
    expect(`${url.origin}${url.pathname}`).toBe('https://www.google.com/maps/search/')
    expect(url.searchParams.get('query')).toBe(site.headOffice.en.split('\n').join(', '))
    await expect(map).toHaveAttribute('target', '_blank')
    await expect(map).toHaveAttribute('rel', 'noopener noreferrer')
  })

  test('footer shows the address on separate lines', async ({ page }) => {
    const address = page.getByRole('contentinfo').locator('address')
    for (const line of site.headOffice.en.split('\n')) await expect(address).toContainText(line)
  })
})
