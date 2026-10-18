import { defineConfig, devices } from '@playwright/test'

const PORT = 4173

/**
 * E2E suite against the production build (`vite build` + `vite preview`), so the multi-page output
 * (/privacy/, /terms/) is what gets tested. Run: `npm run test:e2e`. Report: `npx playwright show-report`.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    // EN by default (the site picks ID for id-* browsers); i18n.spec.ts overrides it.
    locale: 'en-US',
    // Instant scrolls, no reveal fades, no hero autoplay: stable runs. hero.spec.ts opts back in.
    reducedMotion: 'reduce',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 5'] } },
  ],
  webServer: {
    command: `npm run build && npm run preview -- --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    // Always a fresh build: a preview server left running would serve stale output.
    reuseExistingServer: false,
    timeout: 120_000,
  },
})
