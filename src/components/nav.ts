import type { TKey } from '../i18n'

/**
 * Primary navigation. `section` is the id the link scrolls to and the id tracked for the active state.
 * Portfolio and Clients are hidden until real content exists (nav.portfolio / nav.clients keys are kept).
 */
export const NAV_LINKS = [
  { key: 'nav.home', section: 'top' },
  { key: 'nav.about', section: 'about' },
  { key: 'nav.services', section: 'services' },
  { key: 'nav.contact', section: 'contact' },
] as const satisfies readonly { key: TKey; section: string }[]

/** Literal union of tracked section ids. Sections type their id with it, so a typo fails tsc. */
export type SectionId = (typeof NAV_LINKS)[number]['section']

export const SECTION_IDS: readonly string[] = NAV_LINKS.map((l) => l.section)

/** Sub-pages (/privacy/, /terms/) mark themselves with <body data-page>; the home page has none. */
export const ON_HOME = typeof document === 'undefined' || !document.body.dataset.page

/**
 * Home: bare `#id`, a same-document jump that keeps any ?utm_/fbclid query (a `/#id` link from `/?q` would
 * reload the page). Sub-pages: `/#id`, a normal navigation to the home section.
 */
export const navHref = (section: SectionId) => (ON_HOME ? `#${section}` : `/#${section}`)

/** Sections tracked for the active nav state: none off the home page (only the footer would match). */
export const TRACKED_SECTION_IDS: readonly string[] = ON_HOME ? SECTION_IDS : []
