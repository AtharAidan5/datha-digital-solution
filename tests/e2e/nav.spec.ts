import { expect, test } from './fixtures'
import type { Page } from '@playwright/test'

const primaryNav = (page: Page) => page.getByRole('navigation', { name: 'Menu' })
const navLink = (page: Page, name: string) => primaryNav(page).getByRole('link', { name, exact: true })

test.describe('primary navigation', () => {
  test.skip(({ isMobile }) => isMobile, 'desktop nav; the mobile menu is covered in mobile-menu.spec.ts')

  test('marks Home as current on load', async ({ page }) => {
    await page.goto('/')
    await expect(navLink(page, 'Home')).toHaveAttribute('aria-current', 'location')
  })

  const JUMPS = [
    ['About', 'about'],
    ['Services', 'services'],
    ['Contact', 'contact'],
  ] as const

  async function expectJump(page: Page, baseURL: string | undefined, label: string, id: string) {
    await page.goto('/')
    await navLink(page, label).click()

    await expect(page).toHaveURL(`${baseURL}/#${id}`)
    await expect(page.locator(`#${id}`)).toBeInViewport()
    await expect(navLink(page, label)).toHaveAttribute('aria-current', 'location')
    await expect(primaryNav(page).locator('[aria-current]')).toHaveCount(1)

    const headerBottom = await page.getByRole('banner').evaluate((el) => el.getBoundingClientRect().bottom)
    const sectionTop = await page.locator(`#${id}`).evaluate((el) => el.getBoundingClientRect().top)
    expect(sectionTop).toBeGreaterThanOrEqual(headerBottom - 1)
  }

  for (const [label, id] of JUMPS) {
    test(`${label} scrolls to #${id}, clear of the sticky header, and becomes current`, async ({ page, baseURL }) => {
      await expectJump(page, baseURL, label, id)
    })
  }

  test('Home returns to the very top from further down', async ({ page }) => {
    await page.goto('/#services')
    await expect(page.locator('#services')).toBeInViewport()
    await navLink(page, 'Home').click()
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0)
    await expect(navLink(page, 'Home')).toHaveAttribute('aria-current', 'location')
  })

  test.describe('with smooth scrolling', () => {
    test.use({ reducedMotion: 'no-preference' })

    for (const [label, id] of JUMPS) {
      test(`${label} scrolls to #${id} and becomes current`, async ({ page, baseURL }) => {
        await expectJump(page, baseURL, label, id)
      })
    }
  })

  test('keeps the query string and does not reload the page', async ({ page, baseURL }) => {
    await page.goto('/?utm_source=e2e')
    await page.evaluate(() => Object.assign(window, { e2eMarker: true }))
    await navLink(page, 'Services').click()

    await expect(page).toHaveURL(`${baseURL}/?utm_source=e2e#services`)
    expect(await page.evaluate(() => 'e2eMarker' in window)).toBe(true)
  })

  test('from a legal page, links lead to the home sections', async ({ page, baseURL }) => {
    await page.goto('/privacy/')
    await expect(navLink(page, 'Services')).toHaveAttribute('href', '/#services')
    await expect(primaryNav(page).locator('[aria-current]')).toHaveCount(0)

    await navLink(page, 'Services').click()
    await expect(page).toHaveURL(`${baseURL}/#services`)
    await expect(page.locator('#services')).toBeInViewport()
    await expect(navLink(page, 'Services')).toHaveAttribute('aria-current', 'location')
    const headerBottom = await page.getByRole('banner').evaluate((el) => el.getBoundingClientRect().bottom)
    const sectionTop = await page.locator('#services').evaluate((el) => el.getBoundingClientRect().top)
    expect(sectionTop).toBeGreaterThanOrEqual(headerBottom - 1)
  })
})

/** Both projects: the header's contract with every anchor jump. */
test.describe('sticky header', () => {
  const box = (page: Page, selector: string) =>
    page.locator(selector).evaluate((el) => {
      const r = el.getBoundingClientRect()
      return { top: Math.round(r.top), bottom: Math.round(r.bottom), height: Math.round(r.height) }
    })

  test('the top bar scrolls away, the navbar stays pinned, and the header never changes height', async ({ page }) => {
    await page.goto('/')
    const topbar = page.locator('header > div').first()
    const before = await box(page, 'header')
    expect(before.top).toBe(0)
    await expect(topbar).not.toHaveAttribute('inert')

    await page.evaluate(() => scrollTo(0, 600))
    const after = await box(page, 'header')
    const nav = await box(page, 'header nav')
    expect(after.height).toBe(before.height)
    expect(nav.top).toBe(0)
    expect(after.top).toBe(-(before.height - nav.height))
    await expect(topbar).toHaveAttribute('inert', '')
    await expect(page.locator('html')).toHaveAttribute('data-scrolled', '')

    await page.evaluate(() => scrollTo(0, 0))
    await expect(topbar).not.toHaveAttribute('inert')
    expect((await box(page, 'header')).top).toBe(0)
  })

  test('focusing navbar controls never scrolls the page', async ({ page, isMobile }) => {
    test.skip(isMobile, 'desktop navbar links')
    await page.goto('/')
    await page.evaluate(() => scrollTo(0, 2500))
    for (const name of ['Home', 'About', 'Services', 'Contact']) {
      await navLink(page, name).focus()
      expect(await page.evaluate(() => scrollY), `after focusing ${name}`).toBe(2500)
    }
  })

  test('the top bar counts as gone exactly when it is fully out of view', async ({ page }) => {
    await page.goto('/')
    const topbarHeight = await page.locator('header > div').first().evaluate((el) => el.getBoundingClientRect().height)
    await page.evaluate((y) => scrollTo(0, y - 1), topbarHeight)
    await expect(page.locator('html')).not.toHaveAttribute('data-scrolled')
    await page.evaluate((y) => scrollTo(0, y), topbarHeight)
    await expect(page.locator('html')).toHaveAttribute('data-scrolled', '')
  })
})

test('a malformed hash does not break the page', async ({ page }) => {
  // The fixture fails the test on any uncaught error (e.g. URIError from decoding a bare %).
  await page.goto('/#50%off')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('DATHA Digital Solution — Next-Gen IT Partner')
})

// Load-time scrolls are the browser's own (main.tsx renders synchronously; smooth scrolling starts after load), so
// both motion settings must behave the same.
for (const motion of ['reduce', 'no-preference'] as const) {
  test.describe(`arriving with a hash (${motion} motion)`, () => {
    test.use({ reducedMotion: motion })

    test('lands on the section, clear of the header', async ({ page }) => {
      await page.goto('/privacy/')
      // Footer quick links exist on every width (the primary nav links are desktop-only).
      await page.getByRole('navigation', { name: 'Quick links' }).getByRole('link', { name: 'Services', exact: true }).click()
      await expect(page).toHaveURL(/\/#services$/)
      await expect(page.locator('#services')).toBeInViewport()
      const headerBottom = await page.locator('header nav').evaluate((el) => el.getBoundingClientRect().bottom)
      const sectionTop = await page.locator('#services').evaluate((el) => el.getBoundingClientRect().top)
      expect(sectionTop).toBeGreaterThanOrEqual(headerBottom - 1)
      expect(sectionTop).toBeLessThanOrEqual(headerBottom + 24)
    })

    test('reload restores the reader’s position without gliding', async ({ page }) => {
      await recordScrolls(page)
      await page.goto('/#services')
      await expect(page.locator('#services')).toBeInViewport()
      await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight))
      const before = await page.evaluate(() => scrollY)
      await page.reload()
      await expectRestoredDirectly(page, before)
    })

    test('Back from another page restores the position without gliding', async ({ page }) => {
      await recordScrolls(page)
      await page.goto('/#about')
      await expect(page.locator('#about')).toBeInViewport()
      await page.keyboard.press('Shift') // a real input arms smooth scrolling on this page
      await page.evaluate(() => scrollTo({ top: 2400, behavior: 'instant' }))
      const before = await page.evaluate(() => scrollY)
      await page.evaluate(() => {
        location.href = '/privacy/'
      })
      await page.waitForURL('**/privacy/')
      await page.goBack()
      await expectRestoredDirectly(page, before)
    })

    test('smooth scrolling arms only after load and the first input', async ({ page }) => {
      await page.goto('/')
      await expect(page.locator('html')).not.toHaveAttribute('data-smooth-scroll')
      await page.keyboard.press('Shift')
      await expect(page.locator('html')).toHaveAttribute('data-smooth-scroll', '')
      const behavior = await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)
      expect(behavior).toBe(motion === 'reduce' ? 'auto' : 'smooth')
    })

    test('Tab continues after the section, not from the top of the page', async ({ page, isMobile }) => {
      test.skip(isMobile, 'keyboard flow is checked on desktop')
      await page.goto('/privacy/')
      await navLink(page, 'Services').click()
      await expect(page.locator('#services')).toBeInViewport()
      await page.keyboard.press('Tab')
      // Services has no focusable content, so the first stop is the next control after it (the CTA), not the header.
      const afterServices = await page.evaluate(() => {
        const section = document.getElementById('services')!
        const focused = document.activeElement
        if (!focused || focused === document.body || focused.closest('header')) return false
        return section.contains(focused) || !!(section.compareDocumentPosition(focused) & Node.DOCUMENT_POSITION_FOLLOWING)
      })
      expect(afterServices).toBe(true)
    })
  })
}

type ScrollLog = { e2eScrolls: number[] }

/** Logs every scrollY the page passes through, per document (survives reload / Back as a fresh log). */
async function recordScrolls(page: Page) {
  await page.addInitScript(() => {
    const w = window as unknown as ScrollLog
    w.e2eScrolls = []
    addEventListener('scroll', () => w.e2eScrolls.push(Math.round(scrollY)), { passive: true })
  })
}

/**
 * Back at `y` without gliding. Chrome may still make one instant stop at the #section first (its own fragment jump
 * racing its restoration; a static page does the same), so one stray position is allowed, a smooth scroll's many
 * intermediate positions are not.
 */
async function expectRestoredDirectly(page: Page, y: number) {
  await expect.poll(() => page.evaluate((b) => Math.abs(scrollY - b), y)).toBeLessThanOrEqual(1)
  const visited = await page.evaluate(() => (window as unknown as ScrollLog).e2eScrolls)
  const detours = new Set(visited.filter((v) => v !== 0 && Math.abs(v - y) > 1))
  expect(detours.size, `positions on the way: ${visited.join(', ')}`).toBeLessThanOrEqual(1)
}