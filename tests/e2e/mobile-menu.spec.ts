import { expect, test } from './fixtures'

test.describe('mobile menu', () => {
  test.skip(({ isMobile }) => !isMobile, 'mobile layout only')

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('opens with focus inside, makes the page inert, and closes with Escape', async ({ page }) => {
    // Located by aria-controls: the accessible name flips between "Open menu" and "Close menu".
    const burger = page.locator('button[aria-controls="mobile-menu"]')
    const menu = page.locator('#mobile-menu')
    await expect(burger).toHaveAccessibleName('Open menu')
    await expect(menu).toHaveAttribute('inert', '')

    await burger.click()
    await expect(burger).toHaveAttribute('aria-expanded', 'true')
    await expect(burger).toHaveAccessibleName('Close menu')
    await expect(menu).not.toHaveAttribute('inert')
    await expect(menu.getByRole('link', { name: 'Home', exact: true })).toBeFocused()
    await expect(page.locator('#main')).toHaveAttribute('inert', '')
    await expect(page.locator('footer')).toHaveAttribute('inert', '')

    await page.keyboard.press('Escape')
    await expect(burger).toHaveAttribute('aria-expanded', 'false')
    await expect(burger).toBeFocused()
    await expect(menu).toHaveAttribute('inert', '')
    await expect(page.locator('#main')).not.toHaveAttribute('inert')
    await expect(page.locator('footer')).not.toHaveAttribute('inert')
  })

  for (const y of [0, 20, 39, 40, 600]) {
    test(`the panel starts right under the navbar when opened at scrollY ${y}`, async ({ page }) => {
      await page.evaluate((top) => scrollTo(0, top), y)
      // Real pointer click: locator.click() would scroll the sticky header back to the top first.
      const burger = await page.locator('button[aria-controls="mobile-menu"]').boundingBox()
      await page.mouse.click(burger!.x + burger!.width / 2, burger!.y + burger!.height / 2)
      await expect(page.locator('button[aria-controls="mobile-menu"]')).toHaveAttribute('aria-expanded', 'true')

      const navBottom = await page.locator('header nav').evaluate((el) => el.getBoundingClientRect().bottom)
      const panelTop = await page.locator('#mobile-menu').evaluate((el) => el.getBoundingClientRect().top)
      expect(Math.abs(panelTop - navBottom)).toBeLessThanOrEqual(1)
    })
  }

  test('Shift+Tab back to the menu button keeps the page and the panel in place', async ({ page }) => {
    await page.evaluate(() => scrollTo(0, 20))
    const box = await page.locator('button[aria-controls="mobile-menu"]').boundingBox()
    await page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2)
    await expect(page.locator('#mobile-menu').getByRole('link', { name: 'Home', exact: true })).toBeFocused()

    await page.keyboard.press('Shift+Tab')
    await expect(page.locator('button[aria-controls="mobile-menu"]')).toBeFocused()
    expect(await page.evaluate(() => scrollY)).toBe(20)
    const navBottom = await page.locator('header nav').evaluate((el) => el.getBoundingClientRect().bottom)
    const panelTop = await page.locator('#mobile-menu').evaluate((el) => el.getBoundingClientRect().top)
    expect(Math.abs(panelTop - navBottom)).toBeLessThanOrEqual(1)
  })

  test('Contact is current as soon as the footer reaches the top, before its contact column does', async ({ page }) => {
    // Stacked footer: brand + Follow us come first, the #contact column is further down.
    await page.evaluate(() => scrollTo(0, document.querySelector('footer')!.getBoundingClientRect().top + scrollY - 150))
    const box = await page.locator('button[aria-controls="mobile-menu"]').boundingBox()
    await page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2)
    await expect(page.locator('#mobile-menu').getByRole('link', { name: 'Contact', exact: true })).toHaveAttribute('aria-current', 'location')
  })

  test('a menu link navigates and closes the menu', async ({ page, baseURL }) => {
    const burger = page.locator('button[aria-controls="mobile-menu"]')
    await burger.click()
    await page.locator('#mobile-menu').getByRole('link', { name: 'Services', exact: true }).click()

    await expect(page).toHaveURL(`${baseURL}/#services`)
    await expect(burger).toHaveAttribute('aria-expanded', 'false')
    await expect(page.locator('#services')).toBeInViewport()
    await expect(page.locator('#main')).not.toHaveAttribute('inert')
    const headerBottom = await page.getByRole('banner').evaluate((el) => el.getBoundingClientRect().bottom)
    const sectionTop = await page.locator('#services').evaluate((el) => el.getBoundingClientRect().top)
    expect(sectionTop).toBeGreaterThanOrEqual(headerBottom - 1)
  })
})
