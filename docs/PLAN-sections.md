# Execution plan - page sections

Status: **Revision 2 (2026-10-16), based on the owner's answers. Launch target: before 1 November 2026. Built on 2026-10-16:** shared pieces, Why, Services, CTA, Footer, legal page shells, OG/robots/`vercel.json`. A 3-lens adversarial review was run and the confirmed findings fixed. Still open: real contact data, legal text, domain, Vercel deploy.

## Revision 2: owner decisions
Revision 2 **overrides** the sections below wherever they conflict.

### Decisions
| Q | Answer | Effect on the build |
|---|---|---|
| 1, 18 | No team or team photo yet | `why.cta` "Meet the team" becomes "Start a conversation". `WhyArt` stays. `why.imageAlt` stays unused. |
| 2 | Hours are 9-5. 24/7 is undecided. | **Every 24/7 claim is removed:**<br>• hero slide 4 copy and its "24/7" SVG text<br>• `topbar.support`<br>• `why.p4.text`<br>Hours become Mon–Fri 09:00–17:00 (timezone pending, see below). |
| 3 | "Reply within one business day" is OK | `cta.text` is kept. `topbar.support` reuses the promise. |
| 4 | Services are static | `SERVICE_HREF = null`: no "Learn more" links and no hover lift. The gate stays, so links can be switched on later. |
| 5 | DATHA builds web and mobile apps (no cabling) | **s3 "Network Design & Installation" becomes "Mobile App Development"** and s1 becomes "Web App Development". "infrastructure"/"networks" wording is removed from `hero.s1.text`, `footer.about` and `meta.description` (`index.html` too). |
| 6 | White CTA pill approved | As planned |
| 7 | Remove Portfolio and Testimonials until real content exists | **Section 4 is deferred.** It is not built now; its design stays in this doc. `portfolio` and `clients` come out of `NAV_LINKS` (header, mobile menu and footer quick links). `useSnapTrack`, `useSwipe`, `SliderButton`, `PlaceholderBadge`, `proof.ts`, `SHOW_PLACEHOLDERS` and the `useCarousel` autoplay edit are deferred with it. |
| 8, 9, 10, 11 | Later / no clients yet / no autoplay / recommendation accepted | Recorded for when section 4 is built. The `testimonials.prev/next` value change ships then. |
| 12 | No workshop yet | Footer has **one location** (Head Office). `site.workshop*` is removed, and the contact tier becomes 3 columns at xl: intro, Head Office, Follow us. |
| 13 | LinkedIn, Instagram, WhatsApp | `site.social` gets `whatsapp` (number, linked as `https://wa.me/<digits>`). The icon is Lucide `message-circle`, because Lucide has no WhatsApp glyph. |
| 14 | Needs Privacy Policy and Terms | **New: two pages, `/privacy/` and `/terms/`** (see below) |
| 15, 16 | Office location and contact data come later | They stay flagged placeholders. **Launch blocker:** at least one real channel (email or WhatsApp) is needed before going live, or every CTA leads nowhere. |
| 17 | Native ID review OK | Before launch |

### Revised page
```
Header (nav: Home · About · Services · Contact)
<main>  Hero → Why Choose Us (#about) → Services (#services) → CTA banner  </main>
Footer (#contact)
/privacy/  /terms/   (new pages, same header + footer)
```
Background rhythm: Hero (dark), Why (white), Services (`surface`), CTA, Footer (dark).

The CTA would now sit directly against the dark footer. It therefore becomes an **inset panel**: the section is `bg-white py-section`, and the existing dark band markup moves inside it as a `rounded-card` panel. Two dark blocks are then separated by white space.

### Copy changes
Value changes only; keys are unchanged. Update both dictionaries.

| Key | EN | ID |
|---|---|---|
| `hero.s1.text` | Born in the cloud era. We build secure, scalable web and mobile apps on a modern stack, without legacy baggage. | Lahir di era cloud. Kami membangun aplikasi web dan mobile yang aman dan skalabel dengan teknologi modern, tanpa beban sistem lama. |
| `hero.s4.eyebrow` | Responsive Support | Dukungan Responsif |
| `hero.s4.title` | Support You Can Count On | Dukungan yang Bisa Diandalkan |
| `hero.s4.text` | Clear communication and fast responses on business days, so issues are handled before they slow you down. | Komunikasi yang jelas dan respons cepat di hari kerja, sehingga kendala tertangani sebelum menghambat bisnis Anda. |
| `topbar.support` | Replies within one business day | Balasan dalam satu hari kerja |
| `why.p4.text` | Security reviews, monitoring and backups built into every delivery. | Tinjauan keamanan, pemantauan, dan pencadangan menyatu dalam setiap pengerjaan. |
| `why.cta` | Start a conversation | Mulai diskusi |
| `services.s1.title` | Web App Development | Pengembangan Aplikasi Web |
| `services.s1.text` | Fast, secure web applications and portals, built with modern frameworks and designed to scale. | Aplikasi dan portal web yang cepat dan aman, dibangun dengan framework modern dan siap berkembang. |
| `services.s3.title` | Mobile App Development | Pengembangan Aplikasi Mobile |
| `services.s3.text` | iOS and Android apps, from first prototype to app store release. | Aplikasi iOS dan Android, dari prototipe pertama hingga rilis di app store. |
| `footer.about` | DATHA Digital Solution builds modern web and mobile apps for businesses ready to move faster. | DATHA Digital Solution membangun aplikasi web dan mobile modern untuk bisnis yang siap bergerak lebih cepat. |
| `meta.description` | Web and mobile app development, system integration and IT consulting from an agile engineering team. | Pengembangan aplikasi web dan mobile, integrasi sistem, dan konsultasi IT dari tim engineering yang gesit. |
| `site.hours` (config) | Mon–Fri, 09:00–17:00 WIB | Senin–Jumat, 09.00–17.00 WIB |

Other changes in the same pass:
- **Icons:** s1 uses `CodeIcon` and s3 uses `SmartphoneIcon` (Lucide `smartphone`). `NetworkIcon` is dropped.
- **Hero art:** in the support slide (`SlideArt` `support`), the `24/7` text is replaced by a check mark.
- **To confirm:** `hero.s3` ("An Agile, Capable Team… senior-minded engineers") still describes a team. Keep it if the founders are the team, or soften it.

### New i18n keys (Revision 2)
- From the original table, these are kept: `cta.*` (4), `footer.contactTitle`, `footer.contactLead`, `common.newTab`.
- `services.learnMoreAbout` is also kept, for when `SERVICE_HREF` is switched on.
- **Deferred with section 4:** `portfolio.*`, `testimonials.empty`, `common.sample`, `common.slideOf`, `common.carousel`, `common.slide`.
- **New:**

| Key | EN | ID |
|---|---|---|
| `legal.updated` | Last updated: {{date}} | Terakhir diperbarui: {{date}} |
| `legal.back` | Back to home | Kembali ke beranda |
| `legal.draft` | Draft: pending legal review | Draf: menunggu tinjauan hukum |

### Privacy Policy and Terms pages
- **Routing.** This uses Vite multi-page. `privacy/index.html` and `terms/index.html` are added as build inputs in `vite.config.ts` (`build.rollupOptions.input`). Each one mounts `src/legal.tsx` with a `page` prop. The pages are served as real `/privacy/` and `/terms/` URLs on any static host, with no SPA rewrites and no router dependency.
- **Shared chrome.**
  - Same `Header` and `Footer`.
  - Every nav href becomes `/#section` instead of `#section`. That is a same-document jump on the home page and a normal navigation from the legal pages.
  - `useActiveSection` already returns early when no section ids exist.
- **Content.**
  - The bilingual text lives in `src/legal/privacy.ts` and `src/legal/terms.ts` as typed `{ title, sections: { heading, body[] }[] }` per language, not in the main dictionaries.
  - Rendered as `<main><article>` with h1/h2 and `max-w-prose`.
- **Text: provided by the owner.** Until the final EN and ID wording arrives, each page renders one flagged placeholder section (`[privacy policy text]` / `[terms text]`, muted, `data-placeholder`). The data shape is ready to drop text into, so no component change is needed when it arrives.
- **Facts the text should cover, so the wording matches how the site actually works:**
  - no forms and no analytics
  - contact happens only by email, phone or WhatsApp
  - `localStorage` stores only the language choice
  - Google Fonts are loaded from Google, so visitors' IP addresses reach Google
  - the hosting provider (Vercel) keeps server logs
  - links lead to LinkedIn, Instagram, WhatsApp and Google Maps
  - UU PDP No. 27/2022 applies
- **Draft gate.** Until `LEGAL_APPROVED = true` in `site.config.ts`, both pages show a muted `legal.draft` badge with `data-placeholder`.
- **Footer.** Privacy and Terms become real links (`/privacy/`, `/terms/`) instead of flagged placeholders.

### Launch plan (deploy before 1 Nov)
| When | Who | What |
|---|---|---|
| 16–19 Oct | Claude | Phase 1 shared pieces and copy changes. Why, Services, CTA, Footer, nav changes. `npm run build` plus browser QA after each phase. |
| 19–21 Oct | Claude | Legal page shells (flagged placeholder text). SEO basics: `og:image` 1200×630, `robots.txt`, `sitemap.xml`, canonical URL. Final a11y and Lighthouse pass. First **Vercel preview** deploy. |
| by 22 Oct | Owner | **Domain** name. |
| by 27 Oct | Owner | Real data: phone, info email, WhatsApp number, office address, LinkedIn and Instagram URLs, legal entity name. **Final Privacy Policy and Terms text (EN + ID, lawyer-reviewed).** Native ID copy review. |
| 28 Oct | Claude | Put the real data and legal text in, then deploy a **Vercel preview** for sign-off. |
| 29–30 Oct | Owner + Claude | Fixes, `LEGAL_APPROVED = true`, **Vercel production deploy** and domain connected. 31 Oct is a buffer day. |

**Hosting: Vercel.** It is a static Vite build (`npm run build` → `dist/`) with a preview URL per deploy and automatic HTTPS. Every deploy needs your OK first.

**Launch checklist**
- No `data-placeholder` left on the home page.
- At least one live contact channel.
- Legal approved.
- `npm run build` clean; Lighthouse a11y ≥ 95.
- EN/ID reviewed.
- OG preview checked.
- HTTPS on the domain.

**Section notes superseded by Revision 2**
- Section 2: `SERVICE_HREF` is `null`.
- Section 3: the CTA is an inset panel.
- Section 4: deferred.
- Section 5: one location, 3-column contact tier, WhatsApp, real legal links.
- App wiring and file tree: drop `Proof/*` and the deferred hooks and atoms; add `privacy/index.html`, `terms/index.html`, `src/legal.tsx`, `src/legal/*`, the `vite.config.ts` inputs, `public/robots.txt`, `public/sitemap.xml` and `public/og-image.png`.

## Context
The header (top bar, navbar, mobile menu, EN/ID toggle) and the 4-slide hero are built. This plan adds the five remaining modules from `BUILD_PLAN.md` §3. Each module was designed twice (product/visual angle and engineering/a11y angle), and the two designs were merged.

The merged module plans conflicted with each other: three different `useReveal` APIs, three pixel-motif components and two section backgrounds that collided. This document resolves those conflicts into one set of shared pieces.

Final order in `App.tsx`: Hero, then Why Choose Us, Services, CTA banner, Portfolio, Testimonials, with the Footer after `</main>`.

Background rhythm: Hero (dark), Why (white), Services (`surface`), CTA (dark), Portfolio (white), Testimonials (`surface`), Footer (dark). No two dark bands touch, and no two identical light bands touch.

Verified against `CLAUDE.md`, `src/index.css`, `src/App.tsx`, `src/components/{icons,nav,Logo,TopBar}.tsx/ts`, `src/components/Hero/*`, `src/hooks/{useCarousel,useActiveSection}.ts`, `src/lib/{site.config,a11y}.ts`, `src/i18n/*`, `tsconfig.json` (`noUnusedLocals`, `noUnusedParameters`) and Tailwind 4.3.3.

---

## Shared pieces
Build these first (phase 1). They produce no visual change apart from the TopBar and Hero refactors, which must render identically.

### `src/hooks/useReveal.ts` (NEW) - the only reveal mechanism
```ts
import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'
import { prefersReducedMotion } from '../lib/a11y'

// One observer for the whole page; elements are unobserved after their first reveal.
const pending = new WeakMap<Element, () => void>()
let observer: IntersectionObserver | undefined

function shared(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries, io) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        pending.get(e.target)?.()
        pending.delete(e.target)
        io.unobserve(e.target)
      }
    },
    // threshold 0 (not a ratio): a ratio is never reached by elements taller than the viewport.
    { rootMargin: '0px 0px -10% 0px', threshold: 0 },
  )
  return observer
}

const skip = () => typeof IntersectionObserver === 'undefined' || prefersReducedMotion()

export interface Reveal<T extends HTMLElement> {
  ref: RefObject<T>
  shown: boolean
  /** 'reveal' until first in view (or focused), then 'reveal in'. Rules live in index.css. */
  className: 'reveal' | 'reveal in'
}

/**
 * One-shot fade/slide-in on scroll. Attach `ref` to an always-rendered element.
 * RULES: `.reveal` is unlayered CSS and beats Tailwind utilities, so never put transition-, duration-,
 * delay- or opacity- utilities on the same element. Stagger with revealDelay() or a
 * `[--reveal-delay:Xms]` class. Never put it on a focusable element (focusin reveals the container instead).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(): Reveal<T> {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(skip) // reduced motion / no IO: visible from the first paint
  useEffect(() => {
    const el = ref.current
    if (shown || !el) return
    const show = () => setShown(true)
    const io = shared()
    pending.set(el, show)
    io.observe(el)
    el.addEventListener('focusin', show) // a focus-scroll can stop inside the -10% band
    return () => {
      io.unobserve(el)
      pending.delete(el)
      el.removeEventListener('focusin', show)
    }
  }, [shown])
  return { ref, shown, className: shown ? 'reveal in' : 'reveal' }
}

/** Inline stagger for a `.reveal` element. */
export const revealDelay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties
```
Notes:
- The state lives in React, not `classList`, so a re-render or language switch never drops `in`.
- StrictMode double effects are safe.

### `src/index.css` (EDIT)
```css
/* replace the existing .reveal line (default delay 0s = backward compatible) */
.reveal { opacity: 0; transform: translateY(18px); transition: opacity .6s ease, transform .6s ease; transition-delay: var(--reveal-delay, 0s); }

/* append after the reduced-motion block */
@media print { .reveal { opacity: 1; transform: none; } }
```
The existing reduced-motion rule (`.reveal { opacity:1; transform:none; transition:none }`) also cancels the delay.

### `src/lib/a11y.ts` (EDIT) and `src/hooks/useCarousel.ts` (EDIT)
```ts
// a11y.ts (append)
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
```
```diff
// useCarousel.ts
+import { prefersReducedMotion } from '../lib/a11y'
 interface Options {
   /** Autoplay delay per slide in ms. */
   interval?: number
+  /** false: never advance on a timer (manual carousel). Default true, so Hero is unchanged. */
+  autoplay?: boolean
 }
-const reducedMotion = () => ...
-export function useCarousel(count: number, { interval = 6000 }: Options = {}): Carousel {
+export function useCarousel(count: number, { interval = 6000, autoplay = true }: Options = {}): Carousel {
-  const [manual, setManual] = useState(() => reducedMotion())
+  const [manual, setManual] = useState(() => !autoplay || prefersReducedMotion())
```
Do not use `interval: Infinity` instead. Browsers clamp an overflowing `setTimeout` delay to about 0.

### `src/components/art/Pixels.tsx` (NEW) - one logo-pixel motif
`Pixels` moves verbatim out of `Hero/SlideArt.tsx` lines 3-16. `PixelCluster` is a standalone decorative SVG.
```tsx
/** Token colours for decorative SVG art (CSS vars, never hex). */
export const ART_COLOR = {
  blue: 'var(--color-brand-500)',
  cyan: 'var(--color-accent-300)',
  navy: 'var(--color-brand-900)',
} as const

export type PixelCell = readonly [x: number, y: number, size: number, opacity: number]

/** Pixel-square cluster echoing the logo mark: every third cyan, the rest brand blue. */
export function Pixels({ cells }: { cells: readonly PixelCell[] }) {
  return (
    <g>
      {cells.map(([x, y, s, o], i) => (
        <rect key={i} x={x} y={y} width={s} height={s} rx={s * 0.22} fill={i % 3 === 0 ? ART_COLOR.cyan : ART_COLOR.blue} opacity={o} />
      ))}
    </g>
  )
}

const CLUSTER: readonly PixelCell[] = [[52, 4, 22, 0.95], [78, 30, 14, 0.7], [56, 34, 10, 0.5], [30, 14, 12, 0.45], [84, 4, 8, 0.4], [34, 40, 6, 0.3]]

/** Standalone decorative cluster (aria-hidden). */
export function PixelCluster({ cells = CLUSTER, viewBox = '0 0 96 64', className = '' }: { cells?: readonly PixelCell[]; viewBox?: string; className?: string }) {
  return (
    <svg viewBox={viewBox} className={className} aria-hidden="true" focusable="false">
      <Pixels cells={cells} />
    </svg>
  )
}
```
In `Hero/SlideArt.tsx`, replace lines 3-16 with the two lines below. The rest of the file is unchanged. Check all four Hero slides visually afterwards.
```tsx
import { ART_COLOR, Pixels } from '../art/Pixels'
const { blue: BLUE, cyan: CYAN, navy: NAVY } = ART_COLOR
```

### `src/components/SectionHeader.tsx` (NEW) - eyebrow, h2 and lead for every section
```tsx
import { useReveal } from '../hooks/useReveal'
import { useT, type TKey } from '../i18n'

interface Props {
  titleId: string
  eyebrow: TKey
  title: TKey
  lead?: TKey
  /** split: lg+ eyebrow/title left, lead right (bottom-aligned). */
  layout?: 'split' | 'start' | 'center'
  /** dark: on brand-900/night; the caller puts .on-dark on the section. */
  tone?: 'light' | 'dark'
  /** false for anchor landing zones (#contact) that must be readable on arrival. */
  reveal?: boolean
  /** layout/placement only (grid placement, min-w-0). Never opacity/transition utilities. */
  className?: string
}

const LAYOUT = {
  split: 'lg:grid lg:grid-cols-2 lg:items-end lg:gap-12',
  start: 'max-w-3xl',
  center: 'mx-auto max-w-3xl text-center',
} as const

const TONE = {
  light: { eyebrow: 'text-brand-700', title: 'text-brand-900', lead: 'text-slate-brand' },
  dark: { eyebrow: 'text-accent-300', title: 'text-white', lead: 'text-white/80' },
} as const

export function SectionHeader({ titleId, eyebrow, title, lead, layout = 'start', tone = 'light', reveal = true, className = '' }: Props) {
  const { t } = useT()
  const r = useReveal<HTMLDivElement>()
  const c = TONE[tone]
  return (
    <div ref={r.ref} className={`${reveal ? r.className : ''} ${LAYOUT[layout]} ${className}`}>
      <div className={layout === 'split' ? 'max-w-2xl' : ''}>
        <p className={`flex items-center gap-3 text-small font-semibold uppercase tracking-[0.2em] ${layout === 'center' ? 'justify-center' : ''} ${c.eyebrow}`}>
          <span aria-hidden="true" className="flex gap-1">
            <span className="size-1.5 rounded-xs bg-brand-500" />
            <span className="size-1.5 rounded-xs bg-accent-400" />
          </span>
          {t(eyebrow)}
        </p>
        <h2 id={titleId} className={`mt-4 text-h2 font-extrabold tracking-tight text-balance ${c.title}`}>{t(title)}</h2>
      </div>
      {lead && (
        <p className={`mt-4 max-w-prose text-pretty ${c.lead} ${layout === 'split' ? 'lg:mt-0 lg:justify-self-end' : ''} ${layout === 'center' ? 'mx-auto' : ''}`}>
          {t(lead)}
        </p>
      )}
    </div>
  )
}
```

### `src/lib/links.ts` (NEW) - the only place that builds `tel:`, `mailto:`, map and external hrefs
```ts
import { isPlaceholder } from './site.config'

/** Filled in: not empty and not a "[placeholder]". isPlaceholder('') is false, so guard empty too. */
export const hasValue = (v: string): boolean => {
  const s = v.trim()
  return s !== '' && !isPlaceholder(s)
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** mailto: URL, or null while empty/placeholder/malformed. encodeURIComponent (RFC 6068), CRLF body breaks. */
export function mailtoHref(email: string, opts: { subject?: string; body?: string } = {}): string | null {
  const addr = email.trim()
  if (!hasValue(addr) || !EMAIL.test(addr)) return null
  const q = [
    opts.subject && `subject=${encodeURIComponent(opts.subject)}`,
    opts.body && `body=${encodeURIComponent(opts.body.replace(/\r?\n/g, '\r\n'))}`,
  ].filter(Boolean).join('&')
  return `mailto:${addr}${q ? `?${q}` : ''}`
}

/** tel: URL (override wins, e.g. site.phoneHref), or null while the number is a placeholder. */
export function telHref(phone: string, override = ''): string | null {
  if (!hasValue(phone)) return null
  if (override) return override
  const digits = phone.replace(/[^\d+]/g, '')
  return digits ? `tel:${digits}` : null
}

/** Any configured URL (social, legal page), or null while placeholder. */
export const linkHref = (url: string): string | null => (hasValue(url) ? url.trim() : null)

/** Exact map URL if configured, else a Google Maps search for a real address, else null. */
export function mapHref(address: string, override = ''): string | null {
  if (hasValue(override)) return override.trim()
  if (!hasValue(address)) return null
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.replace(/\s*\n\s*/g, ', '))}`
}
```

### `src/components/ContactLink.tsx` (NEW) - the single placeholder gate
```tsx
import type { ReactNode } from 'react'
import { isPlaceholder } from '../lib/site.config'

/** Muted + dashed underline: label-type placeholders (map, privacy, terms). */
export const FLAG_LABEL = 'text-white/50 underline decoration-dashed decoration-white/40 underline-offset-4'

interface Props {
  /** From lib/links.ts. null = placeholder: flagged, non-focusable span, never a tel:/mailto:/https: link. */
  href: string | null
  external?: boolean
  label?: string
  labelledBy?: string
  describedBy?: string
  /** layout only, applied in both states (keep colours in the two props below: two text-* classes race). */
  className?: string
  linkClassName?: string
  placeholderClassName?: string
  children: ReactNode
}

export function ContactLink({ href, external = false, label, labelledBy, describedBy, className = '', linkClassName = '', placeholderClassName = 'text-white/50', children }: Props) {
  if (!href) return <span data-placeholder className={`${className} ${placeholderClassName}`}>{children}</span>
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={label}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      className={`${className} ${linkClassName}`}
    >
      {children}
    </a>
  )
}

/** Plain text value (address, hours): muted + data-placeholder while it is a placeholder. */
export function PlaceholderText({ value, className = '', children }: { value: string; className?: string; children: ReactNode }) {
  const flagged = isPlaceholder(value)
  return <span data-placeholder={flagged || undefined} className={`${className} ${flagged ? 'text-white/50' : ''}`}>{children}</span>
}
```
`TopBar.tsx` (EDIT) drops its local `Contact` helper. Behaviour is identical: same muted class and the same `tel:` rule.
```tsx
<ContactLink href={telHref(site.phone, site.phoneHref)} linkClassName="rounded-sm hover:text-white">{site.phone}</ContactLink>
<ContactLink href={mailtoHref(site.email)} linkClassName="rounded-sm hover:text-white">{site.email}</ContactLink>
<PlaceholderText value={site.hours[lang]}>{site.hours[lang]}</PlaceholderText>
```

### `src/lib/site.config.ts` (EDIT, additive)
```ts
export type SocialId = 'linkedin' | 'instagram'
export interface SocialLink { id: SocialId; label: string; href: string }

export const site = {
  // ...existing name, phone, phoneHref, email, hours, headOffice, workshop, year (unchanged)
  workshopPhones: ['[workshop phone]'],
  workshopEmail: '[workshop email]',
  /** Exact Google Maps share URLs. Empty = derive a Maps search link from the real address. */
  maps: { headOffice: '', workshop: '' },
  /** Network names are proper nouns (data, not UI copy). */
  social: [
    { id: 'linkedin', label: 'LinkedIn', href: '[linkedin url]' },
    { id: 'instagram', label: 'Instagram', href: '[instagram url]' },
  ] satisfies SocialLink[],
  legal: { privacy: '[privacy url]', terms: '[terms url]' },
}

/**
 * Sample portfolio/testimonial rows (BUILD_PLAN 5.6): shown in `npm run dev` and in previews built with
 * VITE_SHOW_PLACEHOLDERS=true, never in a plain production build. Contact placeholders ([phone] etc.)
 * are not affected: they always render flagged.
 */
export const SHOW_PLACEHOLDERS: boolean = import.meta.env.DEV || import.meta.env.VITE_SHOW_PLACEHOLDERS === 'true'
```

### Smaller shared edits
- **`src/components/nav.ts`**: append `export type SectionId = (typeof NAV_LINKS)[number]['section']`. Sections type their `id` with it, so a typo becomes a compile error.
- **`src/components/Logo.tsx`**: add a `full?: boolean` prop. The subline class becomes `` `mt-1 ${full ? 'block' : 'hidden sm:block'} …` ``. The header call is unchanged; the footer passes `full`.
- **`src/components/SliderButton.tsx`** (NEW): 44px round prev/next button, `tone: 'light' | 'dark'`. It uses `aria-disabled` rather than `disabled`, so focus is never dropped at a track end.
  ```tsx
  import { ChevronLeftIcon, ChevronRightIcon } from './icons'
  interface Props { dir: 'prev' | 'next'; label: string; onClick: () => void; disabled?: boolean; controls?: string; tone?: 'light' | 'dark' }
  const TONE = {
    light: 'border-slate-brand/20 bg-white text-brand-900 hover:border-brand-500 hover:text-brand-700',
    dark: 'border-white/30 text-white hover:border-accent-300 hover:text-accent-300',
  }
  export function SliderButton({ dir, label, onClick, disabled = false, controls, tone = 'light' }: Props) {
    const Icon = dir === 'prev' ? ChevronLeftIcon : ChevronRightIcon
    return (
      <button type="button" aria-label={label} aria-controls={controls} aria-disabled={disabled || undefined}
        onClick={disabled ? undefined : onClick}
        className={`grid size-11 place-items-center rounded-pill border transition-colors motion-reduce:transition-none aria-disabled:cursor-not-allowed aria-disabled:opacity-40 ${TONE[tone]}`}>
        <Icon width={22} height={22} />
      </button>
    )
  }
  ```
- **`src/components/PlaceholderBadge.tsx`** (NEW): a "Sample content" pill.
  ```tsx
  import { useT } from '../i18n'
  export function PlaceholderBadge({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
    const { t } = useT()
    return (
      <span data-placeholder className={`inline-flex shrink-0 items-center self-start rounded-pill border border-dashed px-3 py-1 text-small font-semibold ${
        tone === 'dark' ? 'border-accent-300/60 text-accent-300' : 'border-slate-brand/40 text-slate-brand'}`}>
        {t('common.sample')}
      </span>
    )
  }
  ```
- **`src/hooks/useSnapTrack.ts`** (NEW): scroll-snap track state plus one-card stepping.
  ```ts
  import { useLayoutEffect, useRef, useState } from 'react'
  export function useSnapTrack<T extends HTMLElement>() {
    const ref = useRef<T>(null)
    const [s, setS] = useState({ overflowing: false, atStart: true, atEnd: false })
    useLayoutEffect(() => {
      const el = ref.current
      if (!el) return
      let raf = 0
      const measure = () => {
        raf = 0
        const max = el.scrollWidth - el.clientWidth
        const n = { overflowing: max > 1, atStart: el.scrollLeft <= 1, atEnd: el.scrollLeft >= max - 1 }
        setS((p) => (p.overflowing === n.overflowing && p.atStart === n.atStart && p.atEnd === n.atEnd ? p : n))
      }
      const schedule = () => { if (!raf) raf = requestAnimationFrame(measure) }
      measure()
      el.addEventListener('scroll', schedule, { passive: true })
      const ro = new ResizeObserver(schedule) // viewport resize + EN/ID reflow
      ro.observe(el)
      return () => { el.removeEventListener('scroll', schedule); ro.disconnect(); cancelAnimationFrame(raf) }
    }, [])
    const step = (dir: 1 | -1) => {
      const el = ref.current
      const first = el?.firstElementChild as HTMLElement | null
      if (!el || !first) return
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0
      // No `behavior`: inherits CSS scroll-behavior (motion-safe:scroll-smooth), so reduced motion is pure CSS.
      el.scrollBy({ left: dir * (first.offsetWidth + gap) })
    }
    return { ref, ...s, prev: () => step(-1), next: () => step(1) }
  }
  ```
- **`src/hooks/useSwipe.ts`** (NEW): handles swipes from touch or pen only (a mouse drag still selects text), and only horizontal-dominant ones.
  ```ts
  import { useRef, type PointerEvent } from 'react'
  interface Options { onNext: () => void; onPrev: () => void; threshold?: number; touchOnly?: boolean }
  export function useSwipe({ onNext, onPrev, threshold = 50, touchOnly = true }: Options) {
    const start = useRef<{ x: number; y: number } | null>(null)
    return {
      onPointerDown: (e: PointerEvent) => {
        if (touchOnly && e.pointerType === 'mouse') return
        start.current = { x: e.clientX, y: e.clientY }
      },
      onPointerUp: (e: PointerEvent) => {
        const s = start.current
        start.current = null
        if (!s) return
        const dx = e.clientX - s.x
        const dy = e.clientY - s.y
        if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy)) return
        if (dx < 0) onNext()
        else onPrev()
      },
      onPointerCancel: () => { start.current = null },
    }
  }
  ```
  Pair it with `touch-pan-y touch-pinch-zoom` on the swipe surface.
- **`src/hooks/useActiveSection.ts`** (EDIT): two fixes.
  1. When nothing is in the observation band (while the unnamed CTA band fills it), keep the previous section active instead of clearing it.
  2. At the page bottom, force the last id (`contact`). On tall viewports the footer otherwise never reaches the band.
  ```ts
  let atEnd = false
  const last = sections[sections.length - 1]
  const pick = () => {
    const first = sections.find((s) => visible.has(s.id))
    setActive((prev) => (atEnd ? last.id : first ? first.id : prev))
  }
  // existing io callback: update `visible`, then pick()
  const end = document.createElement('div')
  end.setAttribute('aria-hidden', 'true')
  end.style.cssText = 'height:1px;pointer-events:none;'
  document.body.append(end)
  const endIo = new IntersectionObserver(([e]) => { atEnd = e.isIntersecting; pick() })
  endIo.observe(end)
  // cleanup: io.disconnect(); endIo.disconnect(); end.remove()
  ```
  All sections must mount eagerly (no `React.lazy`), because this hook looks the ids up once, on mount.

### `src/components/icons.tsx` (EDIT)
- Export the types: `export type IconProps = SVGProps<SVGSVGElement>` (currently local) and `export type IconComponent = (p: IconProps) => JSX.Element`.
- Add 17 icons, all wrapped in the existing `Icon` (so they are `aria-hidden` and `focusable="false"`).
- Copy every path from the Lucide source (ISC) and render-check each icon at 24px.

| Icon | Used by | Lucide name |
|---|---|---|
| `ArrowRightIcon` | Why, Services, CTA, Portfolio | `arrow-right` |
| `LayersIcon`, `RefreshCwIcon`, `HandshakeIcon`, `ShieldCheckIcon` | Why p1-p4 | `layers`, `refresh-cw`, `handshake`, `shield-check` |
| `CodeIcon`, `WrenchIcon`, `NetworkIcon`, `LightbulbIcon`, `WorkflowIcon`, `GraduationCapIcon` | Services s1-s6 | `code`, `wrench`, `network`, `lightbulb`, `workflow`, `graduation-cap` |
| `TrendingUpIcon`, `QuoteIcon` | Portfolio, Testimonials | `trending-up`, `quote` |
| `MapPinIcon`, `ArrowUpRightIcon`, `LinkedInIcon`, `InstagramIcon` | Footer | `map-pin`, `arrow-up-right`, `linkedin`, `instagram` |

The paths drafted in the module designs are kept in `scratchpad/wf/*.md` for reference.

---

## 1. Why Choose Us (#about)

**Files**
- NEW `src/components/WhyUs/WhyUs.tsx`
- NEW `src/components/WhyUs/WhyArt.tsx`
- NEW `src/components/WhyUs/points.ts`

**Decisions**
| Topic | Decision |
|---|---|
| Visual | Decorative inline SVG `WhyArt` (viewBox 480×440) on a dark brand panel. It draws the stack (p1), an iteration loop (p2), linked nodes (p3), a shield (p4) and the logo pixels. No stat tiles or stock photo. |
| `why.imageAlt` | Reserved and unused until a real team photo exists (Q18). |
| DOM order (= mobile order) | Header, visual, 4 points, CTA |
| md | Header left, visual right (vertically centred). Points 2×2 full width, then the CTA. |
| lg+ | Visual in the left `5fr` column, spanning 3 rows and **sticky** under the header. Header, points and CTA in the right `7fr` column. This zig-zags against the Hero. |
| Section background | **White** (changed from `bg-surface` so it does not touch Services). Cards are white with `border-brand-100 shadow-card`. |
| New i18n keys | None |

**`points.ts`**
```ts
import type { TKey } from '../../i18n'
export type WhyIcon = 'stack' | 'iterate' | 'partner' | 'secure'
export interface WhyPointData { id: string; title: TKey; text: TKey; icon: WhyIcon }
export const WHY_POINTS = [
  { id: 'p1', title: 'why.p1.title', text: 'why.p1.text', icon: 'stack' },   // modern tech-stack execution
  { id: 'p2', title: 'why.p2.title', text: 'why.p2.text', icon: 'iterate' }, // adaptive problem solving
  { id: 'p3', title: 'why.p3.title', text: 'why.p3.text', icon: 'partner' }, // partner, not vendor
  { id: 'p4', title: 'why.p4.title', text: 'why.p4.text', icon: 'secure' },  // secure by default
] as const satisfies readonly WhyPointData[]
```

**`WhyArt.tsx`** (decorative: no text, no animation, no `<defs>`)
```tsx
import { ART_COLOR as C, Pixels } from '../art/Pixels'

const W = 480, H = 440, STEP = 48
const GRID = [
  ...Array.from({ length: W / STEP + 1 }, (_, i) => `M${i * STEP} 0V${H}`),
  ...Array.from({ length: Math.floor(H / STEP) + 1 }, (_, i) => `M0 ${i * STEP}H${W}`),
].join('')
const plate = (cy: number) => `M240 ${cy - 56}L352 ${cy}L240 ${cy + 56}L128 ${cy}Z`
const side = (cy: number) => `M128 ${cy}v14l112 56 112-56v-14L240 ${cy + 56}Z`

/** Stack (p1), iteration loop (p2), linked nodes (p3), shield (p4), logo pixels. */
export function WhyArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} aria-hidden="true" focusable="false">
      <path d={GRID} fill="none" stroke="white" strokeOpacity={0.06} vectorEffect="non-scaling-stroke" />
      <path d="M44 245a196 92 0 0 1 392 0" fill="none" stroke={C.cyan} strokeWidth={3} strokeDasharray="2 10" strokeLinecap="round" opacity={0.4} />
      {[300, 240, 180].map((cy, i) => (
        <g key={cy}>
          <path d={side(cy)} fill={C.blue} opacity={0.45} />
          <path d={plate(cy)} fill={i === 2 ? C.cyan : C.blue} fillOpacity={[0.35, 0.7, 1][i]} stroke={C.blue} strokeWidth={2} />
        </g>
      ))}
      <path d="M214 170l-16 10 16 10M266 170l16 10-16 10M246 164l-12 32" fill="none" stroke={C.navy} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M436 245a196 92 0 0 1-392 0" fill="none" stroke={C.cyan} strokeWidth={4} strokeLinecap="round" opacity={0.9} />
      <path d="M44 226l10 16H34Z" fill={C.cyan} />
      <path d="M126 126L170 160" stroke={C.cyan} strokeOpacity={0.5} strokeWidth={2} strokeDasharray="6 8" />
      <path d="M96 52l40 14v30c0 28-18 46-40 56-22-10-40-28-40-56V66Z" fill={C.blue} />
      <path d="M78 100l12 12 24-26" fill="none" stroke="white" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M362 98L290 149" stroke={C.cyan} strokeOpacity={0.5} strokeWidth={2} strokeDasharray="6 8" />
      <path d="M380 86L430 140" stroke="white" strokeOpacity={0.5} strokeWidth={3} />
      <circle cx={380} cy={86} r={20} fill={C.cyan} />
      <circle cx={430} cy={140} r={14} fill="white" opacity={0.9} />
      <Pixels cells={[[36, 360, 16, 0.5], [60, 380, 10, 0.4], [28, 398, 8, 0.3], [412, 366, 14, 0.55], [436, 348, 8, 0.35], [226, 26, 12, 0.5], [246, 14, 8, 0.35]]} />
    </svg>
  )
}
```

**`WhyUs.tsx`**
```tsx
import { revealDelay, useReveal } from '../../hooks/useReveal'
import { useT } from '../../i18n'
import { ArrowRightIcon, HandshakeIcon, LayersIcon, RefreshCwIcon, ShieldCheckIcon, type IconComponent } from '../icons'
import type { SectionId } from '../nav'
import { SectionHeader } from '../SectionHeader'
import { WHY_POINTS, type WhyIcon, type WhyPointData } from './points'
import { WhyArt } from './WhyArt'

const SECTION_ID: SectionId = 'about'
const STAGGER_MS = 80
const ICONS: Record<WhyIcon, IconComponent> = { stack: LayersIcon, iterate: RefreshCwIcon, partner: HandshakeIcon, secure: ShieldCheckIcon }

function WhyPoint({ point, index }: { point: WhyPointData; index: number }) {
  const { t } = useT()
  const r = useReveal<HTMLLIElement>()
  const Icon = ICONS[point.icon]
  return (
    // The li IS the card: grid item, so cards in a row get equal height. Mobile: icon left; sm+: icon above.
    <li ref={r.ref} style={revealDelay(index * STAGGER_MS)}
      className={`${r.className} flex min-w-0 gap-4 rounded-card border border-brand-100 bg-white p-5 shadow-card sm:flex-col sm:gap-5 sm:p-6`}>
      <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
        <Icon width={24} height={24} />
      </span>
      <div className="min-w-0">
        <h3 className="text-h3 font-bold text-balance text-brand-900">{t(point.title)}</h3>
        <p className="mt-2 text-pretty text-slate-brand">{t(point.text)}</p>
      </div>
    </li>
  )
}

export function WhyUs() {
  const { t } = useT()
  const art = useReveal<HTMLDivElement>()
  return (
    // No overflow-* on the section: it would disable lg:sticky. The blobs are clipped by their own wrapper.
    <section id={SECTION_ID} aria-labelledby="why-title" className="relative isolate bg-white py-section">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 -top-40 size-[28rem] rounded-full bg-brand-100/70 blur-3xl" />
        <div className="absolute -bottom-48 -left-32 size-[24rem] rounded-full bg-accent-300/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-page grid-cols-1 gap-y-10 px-gutter md:grid-cols-2 md:items-center md:gap-x-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-x-12 xl:gap-x-16">
        {/* 1. Header: base row 1 | md col 1 row 1 | lg col 2 row 1 */}
        <SectionHeader titleId="why-title" eyebrow="why.eyebrow" title="why.title" lead="why.lead"
          className="min-w-0 md:col-start-1 md:row-start-1 lg:col-start-2 lg:row-start-1" />

        {/* 2. Visual: base row 2 | md col 2 row 1 | lg col 1 rows 1-3, sticky */}
        <div ref={art.ref} aria-hidden="true"
          className={`${art.className} relative isolate md:col-start-2 md:row-start-1 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:self-start`}>
          {/* Pixel squares bleeding off the frame: 12px bleed < 16px minimum gutter, so no page h-scroll. */}
          <span className="absolute -left-3 -top-3 z-10 size-6 rounded-md bg-accent-300 shadow-glow" />
          <span className="absolute -bottom-3 -right-3 -z-10 size-9 rounded-lg bg-brand-500" />
          <div className="relative isolate aspect-4/3 overflow-hidden rounded-card bg-brand-900 shadow-card lg:aspect-12/11">
            <div className="absolute inset-0 -z-10 bg-brand-gradient opacity-40" />
            <div className="hero-glow absolute inset-0 -z-10" />
            <WhyArt className="absolute inset-0 size-full p-4 sm:p-8" />
          </div>
        </div>

        {/* 3. Points: 1 col < sm, 2×2 from sm */}
        <ul role="list" className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:col-span-2 md:row-start-2 lg:col-span-1 lg:col-start-2 lg:row-start-2">
          {WHY_POINTS.map((p, i) => <WhyPoint key={p.id} point={p} index={i} />)}
        </ul>

        {/* 4. CTA: never revealed (a focus target must never be transparent) */}
        <div className="md:col-span-2 md:row-start-3 lg:col-span-1 lg:col-start-2 lg:row-start-3">
          <a href="#contact"
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-pill bg-brand-600 px-7 py-2.5 text-center font-semibold text-white shadow-card transition-colors hover:bg-brand-700 motion-reduce:transition-none sm:w-auto">
            {t('why.cta')}
            <ArrowRightIcon width={20} height={20} className="shrink-0 motion-safe:transition-transform motion-safe:group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
```

**Grid**
| Width | Tracks | Placement |
|---|---|---|
| base | `grid-cols-1`, `gap-y-10` | DOM order |
| md (48rem) | `md:grid-cols-2`, `gap-x-10`, `items-center` | Row 1: header and visual. Rows 2 and 3: points and CTA, each spanning 2 columns. |
| lg (64rem) | `minmax(0,5fr) minmax(0,7fr)`, `gap-x-12` (`xl:gap-x-16`), `items-start` | Visual: column 1, rows 1-3, sticky, `self-start`. Right column: header, points, CTA. |

Tailwind v4 emits the shorthands (`*-span-*`) before the longhands (`*-start-*`), so the paired placements above resolve as intended.

**Interaction and accessibility**
- Header, visual and each card reveal; cards stagger by 0 / 80 / 160 / 240ms. The CTA is static, and it is the section's only tab stop.
- Region `aria-labelledby="why-title"`. Headings: one h2 and four h3. The list is `<ul role="list">`, because preflight's `list-style:none` makes Safari drop list semantics.
- Contrast: eyebrow `brand-700` on white is about 6.1:1. CTA white on `brand-600` is about 4.9:1.
- Arrow motion is `motion-safe:` only.

**Responsive**
| Width | Layout |
|---|---|
| 375 | Single column. Visual 343×257. Cards horizontal. CTA full width. |
| 768 | 2 columns. The ID h2 runs about 4 lines. Cards 2×2 at about 343px. |
| 1280 | Visual 480×440, sticky at `header-h + 2rem`. Cards 2×2 at about 326px. |

There are no fixed heights. `text-balance` and `text-pretty` are used, and `min-w-0` keeps long ID words such as "pengerjaan" from overflowing.

---

## 2. Services grid (#services)

**Files**
- NEW `src/components/Services/Services.tsx`
- NEW `src/components/Services/ServiceCard.tsx`
- NEW `src/components/Services/services.ts`

**New key**
- `services.learnMoreAbout`. It gives each "Learn more" link a unique accessible name that starts with the visible label (WCAG 2.5.3).

**`services.ts`**
```ts
import type { TKey } from '../../i18n'
import { CodeIcon, GraduationCapIcon, LightbulbIcon, NetworkIcon, WorkflowIcon, WrenchIcon, type IconComponent } from '../icons'

/** Target of every card link until per-service pages exist (BUILD_PLAN §3). null = static cards, no links. */
export const SERVICE_HREF: string | null = '#contact'

export const SERVICES = [
  { id: 's1', icon: CodeIcon,          title: 'services.s1.title', text: 'services.s1.text' },
  { id: 's2', icon: WrenchIcon,        title: 'services.s2.title', text: 'services.s2.text' },
  { id: 's3', icon: NetworkIcon,       title: 'services.s3.title', text: 'services.s3.text' },
  { id: 's4', icon: LightbulbIcon,     title: 'services.s4.title', text: 'services.s4.text' },
  { id: 's5', icon: WorkflowIcon,      title: 'services.s5.title', text: 'services.s5.text' },
  { id: 's6', icon: GraduationCapIcon, title: 'services.s6.title', text: 'services.s6.text' },
] as const satisfies readonly { id: string; icon: IconComponent; title: TKey; text: TKey }[]
export type Service = (typeof SERVICES)[number]
```
No placeholder gating is needed: the services copy holds no clients, metrics or contact values.

**`Services.tsx`**
```tsx
import { SectionHeader } from '../SectionHeader'
import { ServiceCard } from './ServiceCard'
import { SERVICE_HREF, SERVICES } from './services'

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative isolate bg-surface py-section">
      <Decor />
      <div className="mx-auto max-w-page px-gutter">
        <SectionHeader layout="split" titleId="services-title" eyebrow="services.eyebrow" title="services.title" lead="services.lead" />
        {/* 1 col < 768, 2 cols md, 3 cols lg: 6 divides by 2 and 3, so no orphan card. */}
        <ul role="list" className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:mt-16 lg:grid-cols-3 xl:gap-8">
          {SERVICES.map((s, i) => <ServiceCard key={s.id} service={s} index={i} href={SERVICE_HREF} />)}
        </ul>
      </div>
    </section>
  )
}

/** Decorative logo-style pixel squares, md+ only. */
function Decor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden md:block">
      <span className="absolute right-[6%] top-16 size-5 rounded-md bg-brand-500/15" />
      <span className="absolute right-[calc(6%+2.25rem)] top-10 size-3 rounded-sm bg-accent-300/60" />
      <span className="absolute right-[4%] top-28 size-2 rounded-xs bg-brand-500/25" />
      <span className="absolute bottom-16 left-[3%] size-4 rounded-md bg-accent-300/40" />
    </div>
  )
}
```

**`ServiceCard.tsx`**
```tsx
import { useReveal } from '../../hooks/useReveal'
import { useT } from '../../i18n'
import { ArrowRightIcon } from '../icons'
import type { Service } from './services'

/** Reveal delay per index so each grid row cascades. MUST mirror the <ul> columns (1 / md:2 / lg:3). */
const STAGGER = [
  '',
  'md:[--reveal-delay:90ms]',
  'lg:[--reveal-delay:180ms]',
  'md:[--reveal-delay:90ms] lg:[--reveal-delay:0ms]',
  'lg:[--reveal-delay:90ms]',
  'md:[--reveal-delay:90ms] lg:[--reveal-delay:180ms]',
] as const

// Hover and keyboard focus look the same. Written in full so Tailwind's scanner finds them.
const CARD_ACTIVE = 'group-hover:border-brand-500 group-has-[a:focus-visible]:border-brand-500 motion-safe:group-hover:-translate-y-1 motion-safe:group-has-[a:focus-visible]:-translate-y-1'
const TILE_ACTIVE = 'group-hover:bg-brand-600 group-hover:text-white group-has-[a:focus-visible]:bg-brand-600 group-has-[a:focus-visible]:text-white'
const BAR_ACTIVE = 'group-hover:scale-x-100 group-has-[a:focus-visible]:scale-x-100'

export function ServiceCard({ service, index, href }: { service: Service; index: number; href: string | null }) {
  const { t } = useT()
  const r = useReveal<HTMLLIElement>()
  const { icon: Icon } = service
  const title = t(service.title)
  return (
    // li: reveal + hover group (it never moves). row-span-4 + subgrid: icon/title/text/link rows align across a grid row.
    <li ref={r.ref} className={`${r.className} group row-span-4 grid grid-rows-subgrid gap-y-3 ${STAGGER[index] ?? ''}`}>
      <div className={`relative row-span-4 grid grid-rows-subgrid gap-y-3 rounded-card border border-brand-100 bg-white p-6 shadow-card transition duration-300 ease-out motion-reduce:transition-none xl:p-8 ${href ? CARD_ACTIVE : ''}`}>
        {href && (
          <span aria-hidden="true"
            className={`absolute inset-x-6 top-0 h-1 origin-left scale-x-0 rounded-b-pill bg-brand-gradient transition-transform duration-300 ease-out motion-reduce:transition-none xl:inset-x-8 ${BAR_ACTIVE}`} />
        )}
        <div className="mb-3 flex items-start justify-between gap-4">
          <span className={`relative grid size-12 shrink-0 place-items-center rounded-card bg-brand-50 text-brand-700 transition-colors duration-300 motion-reduce:transition-none ${href ? TILE_ACTIVE : ''}`}>
            <Icon width={24} height={24} strokeWidth={1.75} />
            <span aria-hidden="true" className="absolute -right-1 -top-1 size-2.5 rounded-xs bg-accent-300 ring-2 ring-white" />
          </span>
          <span aria-hidden="true" className="text-small font-bold tabular-nums tracking-widest text-brand-900/30">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <h3 className="text-h3 font-bold tracking-tight text-balance wrap-break-word text-brand-900">{title}</h3>
        <p className="text-pretty text-slate-brand">{t(service.text)}</p>
        {href && (
          <a href={href} aria-label={t('services.learnMoreAbout', { service: title })}
            className="inline-flex min-h-11 items-center gap-2 self-end justify-self-start rounded-sm font-semibold text-brand-700 transition-colors after:absolute after:inset-0 after:rounded-card group-hover:text-brand-900">
            {t('services.learnMore')}
            <ArrowRightIcon width={18} height={18}
              className="shrink-0 transition-transform duration-300 motion-reduce:transition-none motion-safe:group-hover:translate-x-1 motion-safe:group-has-[a:focus-visible]:translate-x-1" />
          </a>
        )}
      </div>
    </li>
  )
}
```

**Grid**
| Width | Columns | Gap | Card padding |
|---|---|---|---|
| < 768 | 1 | `gap-4` | `p-6` |
| 768-1023 | `md:grid-cols-2` | `md:gap-6` | `p-6` |
| 1024-1279 | `lg:grid-cols-3` | 24px | `p-6` (keeps about a 256px measure for ID copy) |
| ≥ 1280 | 3 | `xl:gap-8` | `xl:p-8` |

- Equal heights come from `row-span-4` plus `grid-rows-subgrid` on the `li` and on the card. Do **not** add `auto-rows-fr`: with subgrid it would equalise all implicit tracks.
- Without subgrid support (Chrome 117+, Safari 16+, Firefox 71+), cards still stretch; only the rows stop aligning across cards.

**Interaction and accessibility**
- The whole card is clickable through the stretched `::after` of the link. The global `:focus-visible` outline stays on the link, and the card mirrors the hover state through `group-has-[a:focus-visible]`.
- The link name comes from `services.learnMoreAbout`. Numerals, bar, pixel and icons are `aria-hidden`.
- Link `brand-700` on white is about 6.1:1.

**Responsive**
| Width | Layout |
|---|---|
| 375 | 1 column, about a 295px measure. The ID s3 title wraps to 2 lines. |
| 768 | 2×3. Subgrid aligns uneven ID titles. |
| 1024 | 3×2. `wrap-break-word` guards `LAN/WAN,`. |

---

## 3. CTA banner

**Files**
- NEW `src/components/CtaBanner/CtaBanner.tsx`
- NEW `src/components/CtaBanner/actions.ts` (non-component exports stay out of the `.tsx`, for fast refresh)

**New keys**
- `cta.contactSubject`, `cta.quoteSubject`, `cta.mailLabel`, `cta.emailLabel`

**`actions.ts`**
```ts
import type { TKey } from '../../i18n'
import { mailtoHref } from '../../lib/links'

export interface CtaAction { id: 'contact' | 'quote'; label: TKey; subject: TKey; variant: 'primary' | 'secondary' }
export const CTA_ACTIONS = [
  { id: 'contact', label: 'cta.button', subject: 'cta.contactSubject', variant: 'primary' },
  { id: 'quote', label: 'cta.secondary', subject: 'cta.quoteSubject', variant: 'secondary' },
] as const satisfies readonly CtaAction[]

export const CONTACT_HASH = '#contact'

/** mailto with a localized subject once site.email is real; #contact while it is a placeholder. */
export function resolveCtaHref(email: string, subject: string): { href: string; mail: boolean } {
  const mail = mailtoHref(email, { subject })
  return mail ? { href: mail, mail: true } : { href: CONTACT_HASH, mail: false }
}
```

**`CtaBanner.tsx`**
```tsx
import { useId } from 'react'
import { revealDelay, useReveal } from '../../hooks/useReveal'
import { useT } from '../../i18n'
import { mailtoHref } from '../../lib/links'
import { site } from '../../lib/site.config'
import { PixelCluster, type PixelCell } from '../art/Pixels'
import { ContactLink } from '../ContactLink'
import { ArrowRightIcon, MailIcon } from '../icons'
import { CTA_ACTIONS, resolveCtaHref, type CtaAction } from './actions'

/** Corner squares in a 160×128 box; drawn cells end at y≤84, so they stay inside py-section at every width. */
const CORNER_PIXELS: readonly PixelCell[] = [
  [128, 0, 32, 0.55], [92, 6, 24, 0.45], [134, 38, 22, 0.4], [62, 4, 14, 0.3], [104, 40, 16, 0.3],
  [142, 70, 14, 0.25], [80, 34, 10, 0.2], [118, 68, 10, 0.2], [44, 18, 8, 0.15],
]

const BTN_BASE = 'group inline-flex min-h-12 items-center justify-center gap-2 rounded-pill border px-7 py-3 text-center font-semibold transition-colors motion-reduce:transition-none'
const VARIANT: Record<CtaAction['variant'], string> = {
  primary: 'border-transparent bg-white text-brand-900 shadow-glow hover:bg-accent-300',       // ~16:1 (Q6)
  secondary: 'border-white/60 bg-brand-900/30 text-white hover:border-accent-300 hover:text-accent-300',
}

export function CtaBanner() {
  const { t } = useT()
  const titleId = useId()
  const r = useReveal<HTMLDivElement>()
  return (
    <section aria-labelledby={titleId} className="on-dark relative isolate overflow-hidden bg-brand-900 text-white">
      {/* Same recipe as the Hero, without hero-glow (the contrast figures exclude it). Do not exceed 40%. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-brand-gradient opacity-40" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent-300/60 to-transparent" />
      <PixelCluster viewBox="0 0 160 128" cells={CORNER_PIXELS}
        className="pointer-events-none absolute right-0 top-0 -z-10 w-24 -translate-y-1/4 sm:w-32 lg:w-44 forced-colors:hidden" />
      <PixelCluster viewBox="0 0 160 128" cells={CORNER_PIXELS}
        className="pointer-events-none absolute bottom-0 left-0 -z-10 w-20 translate-y-1/4 rotate-180 sm:w-28 lg:w-36 forced-colors:hidden" />

      <div ref={r.ref} className="mx-auto grid max-w-page grid-cols-1 items-center gap-8 px-gutter py-section lg:grid-cols-[minmax(0,1fr)_minmax(14rem,auto)] lg:gap-12 xl:gap-16">
        <div className={`${r.className} min-w-0 max-w-3xl`}>
          <h2 id={titleId} className="text-h2 font-extrabold tracking-tight text-balance">{t('cta.title')}</h2>
          <p className="mt-4 max-w-prose text-body text-pretty text-white/90">{t('cta.text')}</p>
        </div>
        <div className={`${r.className} grid gap-4 lg:border-l lg:border-white/15 lg:pl-12`} style={revealDelay(120)}>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col lg:flex-nowrap">
            {CTA_ACTIONS.map((a) => {
              const label = t(a.label)
              const { href, mail } = resolveCtaHref(site.email, t(a.subject))
              const Icon = mail ? MailIcon : ArrowRightIcon
              return (
                <a key={a.id} href={href} data-cta={a.id} aria-label={mail ? t('cta.mailLabel', { label }) : undefined}
                  className={`${BTN_BASE} ${VARIANT[a.variant]}`}>
                  {label}
                  <Icon width={20} height={20} className="shrink-0 transition-transform motion-safe:group-hover:translate-x-0.5 motion-reduce:transition-none" />
                </a>
              )
            })}
          </div>
          {/* Fallback for visitors without a mail app; the placeholder renders muted + flagged, like TopBar. */}
          <p className="flex flex-wrap items-center gap-x-2 text-small text-white/90">
            <MailIcon width={16} height={16} className="shrink-0 text-accent-300" />
            <span>{t('cta.emailLabel')}</span>
            <ContactLink href={mailtoHref(site.email, { subject: t('cta.contactSubject') })} label={t('cta.mailLabel', { label: site.email })}
              className="inline-flex min-h-11 items-center break-all rounded-sm font-semibold"
              linkClassName="text-white underline decoration-accent-300/60 underline-offset-4 transition-colors hover:decoration-accent-300 motion-reduce:transition-none">
              {site.email}
            </ContactLink>
          </p>
        </div>
      </div>
    </section>
  )
}
```

**Grid**
| Width | Layout |
|---|---|
| base | 1 column. Pills stacked full width (48px each). |
| sm-md | Copy `max-w-3xl`. Pills in a wrapping row. |
| lg+ | `minmax(0,1fr) minmax(14rem,auto)`. Actions stacked at equal width behind a `white/15` divider. |

**Placeholder gating**
- With `site.email = '[email]'`, both pills link to `#contact` with an arrow icon, and the email line shows a muted `[email]` with `data-placeholder`. There is no `mailto:` anywhere in the band.
- Setting a real address switches all three to `mailto:` with localized subjects. No component change is needed.

**Accessibility**
- One h2. Pills are 48px and the email link 44px. The focus ring is `accent-400` through `.on-dark`.
- Contrast:
  - title about 8.8:1 mid-band and 5.0:1 at the cyan corner
  - `white/90` text 5.4:1 or better
  - secondary pill 7:1 or better
- Forced colours: the gradient drops out, the clusters are hidden and `border-transparent` becomes a visible edge.

---

## 4. Portfolio slider (#portfolio) and Testimonials slider (#clients)
These are merged from both designs. The judge stage for this module did not run (usage limit), so the merge was done here.

| Decision | Choice | Why |
|---|---|---|
| Portfolio mechanism | **Native scroll-snap track** with peeking cards (`grid-flow-col` + subgrid), prev/next in the header row. At lg all 3 cards fit, so the controls go `invisible` and there is no JS state. | Several cases visible at once. Native swipe momentum. Every card stays in the a11y tree with no `inert` juggling, and find-in-page works. |
| Testimonials mechanism | **Opacity stacking in one grid cell** (the Hero pattern) plus `useCarousel(n, { autoplay: false })` | One quote at a time. Height = tallest quote in either language, so no layout shift. |
| Shared `<Carousel>` component | **No.** Behaviour is shared through hooks (`useCarousel`, `useSwipe`, `useSnapTrack`) and atoms (`SliderButton`). | The three shells differ: Hero, snap track and quote panel. Hero stays untouched (zero regression). |
| Autoplay | Off for both | Below the fold, longer ID copy, WCAG 2.2.2 |
| "Client success metrics" framing | Each case card opens with a **dark metric panel**: the metric sentence with the number at `text-display` in `accent-300` (from A). | The metric is the hero of each card. |
| Placeholder gating | `SHOW_PLACEHOLDERS` (dev / opt-in only) + per-row `placeholder` flag + content sniffing (`[PLACEHOLDER]`, `[x]`, `[name]`). | A draft can never render unflagged and never ships in a plain production build. |
| Empty state | Portfolio: the "Your project could be next" invite card (from A). Testimonials: one honest sentence with no CTA. | Both `<section id>`s always render, because the nav anchors and `useActiveSection` depend on them. This also avoids two CTA blocks back to back. |

**Files**
- NEW `src/components/Proof/proof.ts`
- NEW `src/components/Proof/Portfolio.tsx`
- NEW `src/components/Proof/CaseCard.tsx`
- NEW `src/components/Proof/Testimonials.tsx`
- Shared pieces used: `SliderButton`, `PlaceholderBadge`, `useSnapTrack`, `useSwipe`, the `useCarousel` edit, `SectionHeader`, `PixelCluster`, plus the icons `TrendingUpIcon`, `QuoteIcon` and `ArrowRightIcon`.

**New keys**
- `portfolio.lead`, `portfolio.prev`, `portfolio.next`, `portfolio.invite.title`, `portfolio.invite.text`
- `testimonials.empty`
- `common.sample`, `common.slideOf`, `common.carousel`, `common.slide`

**`proof.ts`**
```ts
import type { Lang, TKey, TVars } from '../../i18n'
import { isPlaceholder, SHOW_PLACEHOLDERS } from '../../lib/site.config'

type TFn = (key: TKey, vars?: TVars) => string

/** Copy lives in en.ts/id.ts (typed keys, tsc enforces ID parity); facts live here. */
export interface CaseStudy {
  id: string
  title: TKey
  text: TKey
  /** Template containing {{x}}, e.g. '{{x}}% faster processing'. */
  metric: TKey
  /** Client-verified figure for {{x}}; null = unknown (renders '[x]', entry counts as draft). */
  metricValue: number | null
  /** Case-study URL. Omit until a page exists: no link is rendered without it. */
  href?: string
  placeholder: boolean
}

export interface Testimonial {
  id: string
  quote: TKey
  /** Template '{{name}}, {{role}}, {{company}}'. */
  author: TKey
  /** Language the client actually spoke; sets lang="" on the quote when it differs from the UI. */
  quoteLang?: Lang
  name: string
  role: Record<Lang, string>
  company: string
  /** Set false only with written client consent on file. */
  placeholder: boolean
}

// Type annotation, not `as const satisfies`: reading the optional href on literal row types would not compile.
export const CASE_STUDIES: readonly CaseStudy[] = [
  { id: 'p1', title: 'portfolio.p1.title', text: 'portfolio.p1.text', metric: 'portfolio.p1.metric', metricValue: null, placeholder: true },
  { id: 'p2', title: 'portfolio.p2.title', text: 'portfolio.p2.text', metric: 'portfolio.p2.metric', metricValue: null, placeholder: true },
  { id: 'p3', title: 'portfolio.p3.title', text: 'portfolio.p3.text', metric: 'portfolio.p3.metric', metricValue: null, placeholder: true },
]

const SAMPLE_PERSON = { name: '[name]', role: { en: '[role]', id: '[jabatan]' }, company: '[company]' }
export const TESTIMONIALS: readonly Testimonial[] = [
  { id: 't1', quote: 'testimonials.t1.quote', author: 'testimonials.t1.author', ...SAMPLE_PERSON, placeholder: true },
  { id: 't2', quote: 'testimonials.t2.quote', author: 'testimonials.t2.author', ...SAMPLE_PERSON, placeholder: true },
]

const FLAG = '[PLACEHOLDER]'
const NF: Record<Lang, Intl.NumberFormat> = { en: new Intl.NumberFormat('en-US'), id: new Intl.NumberFormat('id-ID') }

/** Draft if flagged OR any value/copy still carries a placeholder token: a forgotten token can never ship unflagged. */
export const isDraftCase = (c: CaseStudy, t: TFn) =>
  c.placeholder || c.metricValue === null || t(c.title).includes(FLAG) || t(c.text).includes(FLAG)
export const isDraftQuote = (q: Testimonial, t: TFn, lang: Lang) =>
  q.placeholder || [q.name, q.role[lang], q.company].some(isPlaceholder) || t(q.quote).includes(FLAG)

/** '1.200' in ID, '1,200' in EN; '[x]' while unknown. */
export const metricValue = (c: CaseStudy, lang: Lang) => (c.metricValue === null ? '[x]' : NF[lang].format(c.metricValue))

export const visibleCases = (t: TFn) => CASE_STUDIES.filter((c) => SHOW_PLACEHOLDERS || !isDraftCase(c, t))
export const visibleQuotes = (t: TFn, lang: Lang) => TESTIMONIALS.filter((q) => SHOW_PLACEHOLDERS || !isDraftQuote(q, t, lang))
```

**Adding real entries later**
1. Add `portfolio.p4.{title,metric,text}` to both dictionaries. `tsc` fails if ID is missing a key. `metric` must keep `{{x}}`.
2. Add the row: `{ id: 'p4', …, metricValue: 35, href: '/cases/p4.pdf', placeholder: false }`.
3. Testimonials work the same way: real `name` and `company`, a `role` per language, `quoteLang` if the client spoke only one language, and `placeholder: false` once consent is on file.
4. Delete the sample rows.

**`Portfolio.tsx`**
```tsx
import { useMemo } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { useSnapTrack } from '../../hooks/useSnapTrack'
import { useT } from '../../i18n'
import { PixelCluster } from '../art/Pixels'
import { ArrowRightIcon } from '../icons'
import { SectionHeader } from '../SectionHeader'
import { SliderButton } from '../SliderButton'
import { CaseCard } from './CaseCard'
import { visibleCases } from './proof'

export function Portfolio() {
  const { t } = useT()
  const items = useMemo(() => visibleCases(t), [t])
  const track = useSnapTrack<HTMLUListElement>()
  const list = useReveal<HTMLDivElement>()

  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="overflow-hidden bg-white py-section">
      <div className="mx-auto max-w-page px-gutter">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader titleId="portfolio-title" eyebrow="portfolio.eyebrow" title="portfolio.title" lead="portfolio.lead" className="min-w-0" />
          {/* invisible (not hidden): keeps its height and leaves the tab order while there is no overflow (lg+). */}
          {items.length > 1 && (
            <div className={`flex shrink-0 gap-2 self-end ${track.overflowing ? '' : 'invisible'}`}>
              <SliderButton dir="prev" label={t('portfolio.prev')} controls="portfolio-track" disabled={track.atStart} onClick={track.prev} />
              <SliderButton dir="next" label={t('portfolio.next')} controls="portfolio-track" disabled={track.atEnd} onClick={track.next} />
            </div>
          )}
        </div>

        {items.length === 0 ? (
          <InviteCard />
        ) : (
          // Reveal the wrapper, not the cards: cards scrolled out sideways never intersect the viewport.
          <div ref={list.ref} className={`${list.className} mt-10 lg:mt-12`}>
            {/* Track bleeds to the screen edge (-mx-gutter + px-gutter) so the next card peeks.
                -my-6/py-6 gives the shadow and hover lift room inside the overflow clip.
                3 subgrid rows (metric panel / body / footer) align across cards in EN and ID. */}
            <ul ref={track.ref} id="portfolio-track" role="list" aria-labelledby="portfolio-title"
              tabIndex={track.overflowing ? 0 : undefined}
              className="-mx-gutter -my-6 grid snap-x snap-mandatory scroll-px-gutter grid-flow-col grid-rows-[auto_1fr_auto] auto-cols-[calc(100%-3rem)] gap-x-4 overflow-x-auto overscroll-x-contain px-gutter py-6 motion-safe:scroll-smooth sm:auto-cols-[calc((100%-1rem)/2)] md:auto-cols-[calc((100%-1.5rem)/2)] md:gap-x-6 lg:auto-cols-[calc((100%-3rem)/3)]">
              {items.map((c) => (
                <li key={c.id} className="row-span-3 grid snap-start grid-rows-subgrid">
                  <CaseCard c={c} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

/** Empty state (no real cases yet): honest invitation, not invented work. */
function InviteCard() {
  const { t } = useT()
  return (
    <div className="on-dark relative isolate mt-10 flex flex-col overflow-hidden rounded-card bg-brand-900 p-6 text-white shadow-card sm:p-8 md:flex-row md:items-center md:justify-between md:gap-12 lg:mt-12 lg:p-12">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-brand-gradient opacity-40" />
      <div className="max-w-2xl">
        <PixelCluster className="w-16" />
        <h3 className="mt-8 text-h3 font-bold text-balance">{t('portfolio.invite.title')}</h3>
        <p className="mt-3 text-white/90">{t('portfolio.invite.text')}</p>
      </div>
      <a href="#contact" className="mt-8 inline-flex min-h-12 shrink-0 items-center gap-2 self-start rounded-pill bg-white px-6 font-semibold text-brand-900 transition-colors hover:bg-accent-300 motion-reduce:transition-none md:mt-0 md:self-center">
        {t('nav.cta')}
        <ArrowRightIcon width={18} height={18} />
      </a>
    </div>
  )
}
```

**`CaseCard.tsx`**
```tsx
import { useT } from '../../i18n'
import { PixelCluster } from '../art/Pixels'
import { ArrowRightIcon, TrendingUpIcon } from '../icons'
import { PlaceholderBadge } from '../PlaceholderBadge'
import { isDraftCase, metricValue, type CaseStudy } from './proof'

const MARK = '\u0000'

/** Translated metric sentence with only the number styled; translators keep word order. */
function Metric({ c }: { c: CaseStudy }) {
  const { t, lang } = useT()
  const value = metricValue(c, lang)
  const flagged = c.metricValue === null
  const parts = t(c.metric, { x: MARK }).split(MARK)
  const num = (
    <span data-placeholder={flagged || undefined}
      className={`text-display font-extrabold leading-none tracking-tight tabular-nums ${flagged ? 'text-white/50' : 'text-accent-300'}`}>
      {value}
    </span>
  )
  // If a translation dropped {{x}}, fall back to the plain sentence: only the highlight is lost.
  return parts.length === 2 ? <>{parts[0]}{num}{parts[1]}</> : <>{t(c.metric, { x: value })}</>
}

export function CaseCard({ c }: { c: CaseStudy }) {
  const { t } = useT()
  const draft = isDraftCase(c, t)
  const live = !draft && Boolean(c.href)
  const titleId = `case-${c.id}-title`
  return (
    <article aria-labelledby={titleId} data-placeholder={draft || undefined}
      className={`group relative row-span-3 grid grid-rows-subgrid overflow-hidden rounded-card bg-white shadow-card ${
        draft ? 'border-2 border-dashed border-slate-brand/30' : 'border border-brand-100'} ${
        live ? 'transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-glow motion-reduce:transition-none motion-reduce:hover:translate-y-0' : ''}`}>
      {/* DOM: heading first (H-key navigation lands on the title). Visual: metric panel on top via row-start-1. */}
      <div className="row-start-2 px-6 pt-6">
        <h3 id={titleId} className="text-h3 font-bold text-balance wrap-break-word text-brand-900">{t(c.title)}</h3>
        <p className="mt-3 text-pretty text-slate-brand">{t(c.text)}</p>
      </div>
      <div className="on-dark relative isolate row-start-1 flex flex-col gap-4 overflow-hidden bg-brand-900 px-6 pb-6 pt-6 text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-brand-gradient opacity-40" />
        <PixelCluster className="absolute right-4 top-4 -z-10 w-14 opacity-80" />
        {draft ? <PlaceholderBadge tone="dark" /> : <span aria-hidden="true" className="h-7" />}
        <p className="flex items-start gap-2 text-h3 font-bold text-balance wrap-break-word">
          <TrendingUpIcon width={20} height={20} className="mt-1.5 shrink-0 text-accent-300" />
          <span><Metric c={c} /></span>
        </p>
      </div>
      <div className="row-start-3 px-6 pb-6 pt-4">
        {live ? (
          <a href={c.href} aria-describedby={titleId}
            className="inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold text-brand-700 transition-colors after:absolute after:inset-0 hover:text-brand-900">
            {t('portfolio.viewCase')}
            <ArrowRightIcon width={18} height={18} className="transition-transform motion-safe:group-hover:translate-x-1 motion-reduce:transition-none" />
          </a>
        ) : draft ? (
          <span data-placeholder className="inline-flex min-h-11 items-center font-semibold text-slate-brand/70">{t('portfolio.viewCase')}</span>
        ) : null}
      </div>
    </article>
  )
}
```
**`Testimonials.tsx`**
```tsx
import { useMemo, type KeyboardEvent } from 'react'
import { useCarousel } from '../../hooks/useCarousel'
import { useReveal } from '../../hooks/useReveal'
import { useSwipe } from '../../hooks/useSwipe'
import { useT } from '../../i18n'
import { inertWhen } from '../../lib/a11y'
import { QuoteIcon } from '../icons'
import { PlaceholderBadge } from '../PlaceholderBadge'
import { SectionHeader } from '../SectionHeader'
import { SliderButton } from '../SliderButton'
import { isDraftQuote, visibleQuotes } from './proof'

export function Testimonials() {
  const { t, lang } = useT()
  const items = useMemo(() => visibleQuotes(t, lang), [t, lang])
  const count = items.length
  const slider = count > 1
  const { index, next, prev } = useCarousel(Math.max(count, 1), { autoplay: false }) // max: modulo guard for 0
  const swipe = useSwipe({ onNext: next, onPrev: prev })
  const panel = useReveal<HTMLDivElement>()

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next() }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
  }

  return (
    <section id="clients" aria-labelledby="clients-title" aria-roledescription={slider ? t('common.carousel') : undefined}
      className="bg-surface py-section">
      {/* Stacked < lg; lg+: heading 5fr | quote panel 7fr */}
      <div className="mx-auto grid max-w-page items-center gap-10 px-gutter lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <SectionHeader titleId="clients-title" eyebrow="testimonials.eyebrow" title="testimonials.title" className="min-w-0" />

        {count === 0 ? (
          <div className="rounded-card border border-dashed border-slate-brand/30 bg-white p-8 sm:p-12">
            <p className="max-w-prose text-body text-pretty text-slate-brand">{t('testimonials.empty')}</p>
          </div>
        ) : (
          <div ref={panel.ref} onKeyDown={slider ? onKey : undefined}
            className={`${panel.className} on-dark relative isolate min-w-0 overflow-hidden rounded-card bg-brand-900 text-white shadow-card`}>
            <div aria-hidden="true" className="hero-glow absolute inset-0 -z-10" />
            <QuoteIcon width={64} height={64} fill="currentColor" stroke="none" className="absolute right-6 top-6 -z-10 text-accent-300/25 sm:right-10 sm:top-10" />

            {/* One grid cell for all slides: panel height = tallest quote in the current language. */}
            <div id="clients-slides" aria-live={slider ? 'polite' : undefined} {...(slider ? swipe : {})}
              className="grid touch-pan-y touch-pinch-zoom [&>*]:col-start-1 [&>*]:row-start-1">
              {items.map((q, i) => {
                const current = i === index
                const draft = isDraftQuote(q, t, lang)
                return (
                  <div key={q.id} role={slider ? 'group' : undefined}
                    aria-roledescription={slider ? t('common.slide') : undefined}
                    aria-label={slider ? t('common.slideOf', { n: i + 1, total: count }) : undefined}
                    aria-hidden={!current || undefined} inert={inertWhen(!current)} data-placeholder={draft || undefined}
                    className={`flex flex-col gap-6 p-6 transition-opacity duration-500 motion-reduce:transition-none sm:p-10 ${current ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
                    {draft && <PlaceholderBadge tone="dark" />}
                    <figure className="flex flex-col gap-6">
                      <blockquote lang={q.quoteLang && q.quoteLang !== lang ? q.quoteLang : undefined}
                        className={`text-h3 font-semibold text-pretty wrap-break-word ${draft ? 'text-white/75' : 'text-white'}`}>
                        <p>{t(q.quote)}</p>
                      </blockquote>
                      <figcaption className="flex items-center gap-3">
                        <span aria-hidden="true" className="h-0.5 w-8 shrink-0 rounded-pill bg-accent-300" />
                        <span className={`min-w-0 text-body wrap-break-word ${draft ? 'text-white/70' : 'text-white/85'}`}>
                          {t(q.author, { name: q.name, role: q.role[lang], company: q.company })}
                        </span>
                      </figcaption>
                    </figure>
                  </div>
                )
              })}
            </div>

            {slider && (
              <div className="flex items-center justify-between gap-4 border-t border-white/10 px-6 py-3 sm:px-10">
                <div aria-hidden="true" className="flex items-center gap-2">
                  {items.map((q, i) => (
                    <span key={q.id} className={`block h-1.5 rounded-pill transition-[width] duration-300 motion-reduce:transition-none ${i === index ? 'w-8 bg-accent-300' : 'w-3 bg-white/30'}`} />
                  ))}
                </div>
                <div className="flex gap-2">
                  <SliderButton tone="dark" dir="prev" label={t('testimonials.prev')} controls="clients-slides" onClick={prev} />
                  <SliderButton tone="dark" dir="next" label={t('testimonials.next')} controls="clients-slides" onClick={next} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
```

**Grid and responsive**
| Width | Portfolio track | Testimonials |
|---|---|---|
| 375 | Card `100%-3rem` (about 295px), next card peeks 32px, `gap-x-4`, controls under the lead | Stacked. Panel `p-6`. Quote at `text-h3` (about 20.6px). |
| 640-1023 | 2 exact columns (`gap-x-4`, then `md:gap-x-6`); the 3rd card scrolls in | Stacked. Panel `p-10`. |
| ≥ 1024 | 3 exact columns: no overflow, controls `invisible`, track `tabIndex` removed | `5fr / 7fr`, `gap-16` |

**Interaction and accessibility**
- Portfolio track:
  - native swipe plus `snap-start`; `overscroll-x-contain` stops browser back-gesture navigation
  - buttons step one card and are `aria-disabled` at the ends
  - Tab focuses the track while it overflows (arrow keys then scroll it natively)
- Testimonials:
  - wrap-around buttons, ArrowLeft/Right inside the panel, and touch swipe (50px threshold, horizontal-dominant)
  - 500ms crossfade, no autoplay
  - inactive slides get `aria-hidden` plus `inertWhen`
  - the slide container is `aria-live="polite"`; the dots are `aria-hidden`, and the position is announced through each slide's label
- `.reveal` is never on an element with `opacity-*` utilities (the slides).
- Headings: h2 per section and h3 for case titles. Quotes are `<figure><blockquote><p>` with a `<figcaption>`.
- Each "View case study" link gets `aria-describedby` = its title.
- Contrast:
  - chip/link `brand-700` on white about 6.1:1
  - `white/70` on `brand-900` about 6.5:1
  - placeholder `[x]` `white/50` about 4.9:1 (pre-launch only)

---

## 5. Footer (#contact)
This module's judge also did not run, so the merge was done here. Base is design B: contact tier first in the DOM, one shared column template, `ContactLink` gating and the bottom-sentinel fix. Grafted from A:
- the contact tier is **not** revealed (it is the anchor landing zone)
- a 4px gradient seam at the top
- `Logo full`
- `LangToggle` in the legal row
- map names through `aria-labelledby` (no string literal)
- a map link derived from the address

**Files**
- NEW `src/components/Footer/Footer.tsx`
- NEW `src/components/Footer/LocationCard.tsx`
- NEW `src/components/Footer/locations.ts`

**New keys**
- `footer.contactTitle`, `footer.contactLead`, `common.newTab`

**`locations.ts`**
```ts
import type { Lang, TKey } from '../../i18n'
import { site } from '../../lib/site.config'

export interface Phone { value: string; override?: string }
export interface Location {
  id: 'head' | 'workshop'
  titleKey: TKey
  addressKey: TKey
  address: Record<Lang, string>
  phones: readonly Phone[]
  email: string
  hours?: Record<Lang, string>
  mapUrl: string
}

export const LOCATIONS: readonly Location[] = [
  { id: 'head', titleKey: 'footer.headTitle', addressKey: 'footer.headAddress', address: site.headOffice,
    phones: [{ value: site.phone, override: site.phoneHref }], email: site.email, hours: site.hours, mapUrl: site.maps.headOffice },
  { id: 'workshop', titleKey: 'footer.workshopTitle', addressKey: 'footer.workshopAddress', address: site.workshop,
    phones: site.workshopPhones.map((value) => ({ value })), email: site.workshopEmail, mapUrl: site.maps.workshop },
]
```

**`Footer.tsx`**
```tsx
import { useReveal } from '../../hooks/useReveal'
import { useT } from '../../i18n'
import { linkHref } from '../../lib/links'
import { site, type SocialId } from '../../lib/site.config'
import { ContactLink, FLAG_LABEL } from '../ContactLink'
import { InstagramIcon, LinkedInIcon, type IconComponent } from '../icons'
import { LangToggle } from '../LangToggle'
import { Logo } from '../Logo'
import { NAV_LINKS } from '../nav'
import { SectionHeader } from '../SectionHeader'
import { LocationCard } from './LocationCard'
import { LOCATIONS } from './locations'

/** Shared by both tiers so their columns align: 1 / md:2 / xl:4. Do not add items-* (stretch = equal heights). */
const COLS = 'grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-12'
const LINK = 'text-white/85 transition-colors hover:text-accent-300 motion-reduce:transition-none'
const NEW_TAB_ID = 'footer-new-tab'
const SOCIAL_ICONS: Record<SocialId, IconComponent> = { linkedin: LinkedInIcon, instagram: InstagramIcon }

export function Footer() {
  const { t } = useT()
  const tier2 = useReveal<HTMLDivElement>()
  return (
    // Sibling of <main> = the page's contentinfo landmark. id="contact" is the target of every Contact CTA.
    <footer id="contact" className="on-dark relative isolate overflow-hidden bg-brand-900 text-white/75">
      <div aria-hidden="true" className="h-1 bg-brand-gradient" />
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0 -z-10 opacity-30" />

      <div className="mx-auto max-w-page px-gutter pb-12 pt-section">
        {/* Tier 1: contact. First in DOM and static (not revealed): readable the moment #contact lands. */}
        <div className={COLS}>
          <SectionHeader tone="dark" reveal={false} titleId="contact-title" eyebrow="nav.contact" title="footer.contactTitle" lead="footer.contactLead"
            className="min-w-0 md:col-span-2 xl:col-span-1" />
          {LOCATIONS.map((loc) => <LocationCard key={loc.id} location={loc} newTabId={NEW_TAB_ID} />)}
          <div className="flex min-w-0 flex-col border-t border-white/15 pt-6 md:col-span-2 xl:col-span-1">
            <h3 id="footer-social-title" className="text-h3 font-bold text-white">{t('footer.followUs')}</h3>
            <ul aria-labelledby="footer-social-title" className="mt-4 flex flex-wrap gap-3">
              {site.social.map((s) => {
                const Icon = SOCIAL_ICONS[s.id]
                return (
                  <li key={s.id}>
                    <ContactLink href={linkHref(s.href)} external describedBy={NEW_TAB_ID}
                      className="grid size-11 place-items-center rounded-pill border"
                      linkClassName="border-white/25 text-white transition-colors hover:border-accent-300 hover:text-accent-300 motion-reduce:transition-none"
                      placeholderClassName="border-dashed border-white/20 text-white/40">
                      <Icon width={20} height={20} />
                      <span className="sr-only">{s.label}</span>
                    </ContactLink>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Tier 2: brand + quick links, same COLS template. */}
        <div ref={tier2.ref} className={`${tier2.className} ${COLS} mt-12 border-t border-white/10 pt-12`}>
          <div className="min-w-0 xl:col-span-2">
            <Logo full />
            <p className="mt-6 text-small font-semibold uppercase tracking-[0.2em] text-balance text-accent-300">{t('footer.tagline')}</p>
            <p className="mt-3 max-w-prose">{t('footer.about')}</p>
          </div>
          <nav aria-labelledby="footer-links-title" className="min-w-0 xl:col-span-2">
            <h2 id="footer-links-title" className="text-small font-semibold uppercase tracking-[0.2em] text-white">{t('footer.quickLinks')}</h2>
            <ul className="mt-2 grid grid-cols-2 gap-x-6 xl:grid-cols-3">
              {NAV_LINKS.map((l) => (
                <li key={l.section}>
                  <a href={`#${l.section}`} className={`inline-flex min-h-11 items-center rounded-sm ${LINK}`}>{t(l.key)}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Legal row: night band mirrors the header's night top bar. */}
      <div className="bg-night">
        <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-8 gap-y-1 px-gutter py-3 text-small text-white/60">
          <p className="py-2.5">{t('footer.rights', { year: site.year })}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <ul className="flex flex-wrap gap-x-6">
              <li><ContactLink href={linkHref(site.legal.privacy)} className="inline-flex min-h-11 items-center rounded-sm" linkClassName={LINK} placeholderClassName={FLAG_LABEL}>{t('footer.privacy')}</ContactLink></li>
              <li><ContactLink href={linkHref(site.legal.terms)} className="inline-flex min-h-11 items-center rounded-sm" linkClassName={LINK} placeholderClassName={FLAG_LABEL}>{t('footer.terms')}</ContactLink></li>
            </ul>
            <LangToggle variant="onDark" />
          </div>
        </div>
      </div>
      <span id={NEW_TAB_ID} hidden>{t('common.newTab')}</span>
    </footer>
  )
}
```

**`LocationCard.tsx`**
```tsx
import { useT } from '../../i18n'
import { mailtoHref, mapHref, telHref } from '../../lib/links'
import { ContactLink, FLAG_LABEL, PlaceholderText } from '../ContactLink'
import { ArrowUpRightIcon, ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from '../icons'
import type { Location } from './locations'

const ROW = 'grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-3' // 20px icon track: every value aligns
const VALUE = 'inline-flex min-h-11 items-center rounded-sm wrap-anywhere'
const LINK = 'text-white/85 transition-colors hover:text-accent-300 motion-reduce:transition-none'

export function LocationCard({ location: loc, newTabId }: { location: Location; newTabId: string }) {
  const { t, lang } = useT()
  const address = loc.address[lang]
  const hours = loc.hours?.[lang]
  const titleId = `footer-${loc.id}-title`
  const mapId = `footer-${loc.id}-map`
  return (
    <div className="flex min-w-0 flex-col border-t border-white/15 pt-6">
      <h3 id={titleId} className="flex items-center gap-3 text-h3 font-bold text-white">
        <span aria-hidden="true" className="size-2.5 shrink-0 rounded-xs bg-accent-300 shadow-glow" />
        {t(loc.titleKey)}
      </h3>
      <address className="mt-4 not-italic">
        <p className={`${ROW} items-start`}>
          <MapPinIcon className="mt-0.5 text-accent-300" />
          <PlaceholderText value={address} className="whitespace-pre-line wrap-break-word">{t(loc.addressKey, { address })}</PlaceholderText>
        </p>
        <dl className="mt-2">
          <div className={`${ROW} items-center`}>
            <dt><PhoneIcon className="text-accent-300" /><span className="sr-only">{t('footer.phone')}</span></dt>
            {loc.phones.map((p) => (
              <dd key={p.value} className="col-start-2">
                <ContactLink href={telHref(p.value, p.override)} className={VALUE} linkClassName={LINK}>{p.value}</ContactLink>
              </dd>
            ))}
          </div>
          <div className={`${ROW} items-center`}>
            <dt><MailIcon className="text-accent-300" /><span className="sr-only">{t('footer.email')}</span></dt>
            <dd><ContactLink href={mailtoHref(loc.email)} className={VALUE} linkClassName={LINK}>{loc.email}</ContactLink></dd>
          </div>
          {hours && (
            <div className={`${ROW} items-center`}>
              <dt><ClockIcon className="text-accent-300" /><span className="sr-only">{t('footer.hours')}</span></dt>
              <dd className="flex min-h-11 items-center"><PlaceholderText value={hours}>{hours}</PlaceholderText></dd>
            </div>
          )}
        </dl>
      </address>
      {/* mt-auto: siblings stretch to equal height, so both map links sit on one baseline. */}
      <p className="mt-auto pt-4">
        <ContactLink href={mapHref(address, loc.mapUrl)} external labelledBy={`${mapId} ${titleId}`} describedBy={newTabId}
          className="inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold"
          linkClassName="text-accent-300 transition-colors hover:text-white motion-reduce:transition-none" placeholderClassName={FLAG_LABEL}>
          <span id={mapId}>{t('footer.map')}</span>
          <ArrowUpRightIcon width={16} height={16} />
        </ContactLink>
      </p>
    </div>
  )
}
```

**Grid**
| Width | Tier 1 (contact) | Tier 2 | Legal |
|---|---|---|---|
| < 768 | 1 column: intro, Head Office, Workshop, Follow us | Brand, then links (list in 2 columns) | Wraps: rights, then links and toggle |
| ≥ 768 | Intro spans 2; Head Office \| Workshop side by side at equal height; Follow us spans 2 | Brand \| links | One row if it fits |
| ≥ 1280 | 4 columns at about 264px, `gap-x-12` | Brand spans 2, links span 2 (list in 3 columns) | One row |

Four columns start at `xl` rather than `lg`. At 1024px, columns would be about 216px, which breaks long ID addresses and emails.

**Accessibility**
- `<footer>` is outside `<main>`, so it is the `contentinfo` landmark. Quick links are a `<nav aria-labelledby>`, distinct from the header's "Menu" nav.
- Headings:
  - h2 "Let's connect" with h3 Head Office, Workshop and Follow us under it
  - h2 "Quick links" (styled small)
- Contact data uses `<address class="not-italic">` with a `<dl>`. Each `dt` holds the icon and an sr-only label.
- Map links are named "View on map Head Office" / "View on map Workshop" through `aria-labelledby`. External links get the hidden "Opens in a new tab" description.
- Gated values are non-focusable `span[data-placeholder]`. Today the footer tab order is: logo, 6 quick links, language toggle.
- Contrast:
  - `white/75` on `brand-900` about 9.5:1
  - `white/60` on night about 7.3:1
  - placeholder `white/50` about 4.9:1
- Every target is at least 44px.

---

## App.tsx wiring
```tsx
<a href="#main" …>{t('common.skipToContent')}</a>   {/* unchanged */}
<Header />
<main id="main">
  <Hero />          {/* #top */}
  <WhyUs />         {/* #about */}
  <Services />      {/* #services */}
  <CtaBanner />     {/* unnamed band; links to #contact */}
  <Portfolio />     {/* #portfolio */}
  <Testimonials />  {/* #clients */}
</main>
<Footer />          {/* #contact, contentinfo */}
```
Every `NAV_LINKS` anchor resolves. All sections mount eagerly (no `React.lazy`).

Heading outline:
- h1 (Hero slide 1)
- h2 Why: 4 × h3
- h2 Services: 6 × h3
- h2 CTA
- h2 Portfolio: 3 × h3
- h2 Testimonials
- h2 Contact: 3 × h3
- h2 Quick links

---

## New i18n keys
Add to **both** `src/i18n/en.ts` and `src/i18n/id.ts` (`tsc` enforces parity). `invite` is a nested group under `portfolio`.

| Key | EN | ID |
|---|---|---|
| `services.learnMoreAbout` | Learn more about {{service}} | Selengkapnya tentang {{service}} |
| `cta.contactSubject` | Website inquiry | Pertanyaan dari situs web |
| `cta.quoteSubject` | Quote request via website | Permintaan penawaran melalui situs web |
| `cta.mailLabel` | {{label}} (opens your email app) | {{label}} (membuka aplikasi email Anda) |
| `cta.emailLabel` | Prefer email? | Lebih suka lewat email? |
| `portfolio.lead` | We measure every engagement by the outcome it creates for the client. | Kami mengukur setiap proyek dari hasil nyata yang dirasakan klien. |
| `portfolio.prev` | Previous project | Proyek sebelumnya |
| `portfolio.next` | Next project | Proyek berikutnya |
| `portfolio.invite.title` | Your project could be next | Proyek Anda bisa jadi berikutnya |
| `portfolio.invite.text` | As a new team, every client gets our full attention. Tell us what you want to build. | Sebagai tim baru, setiap klien mendapat perhatian penuh dari kami. Ceritakan apa yang ingin Anda bangun. |
| `testimonials.empty` | Our first client stories are being written. We would love yours to be one of them. | Kisah klien pertama kami sedang ditulis. Kami ingin kisah Anda menjadi salah satunya. |
| `footer.contactTitle` | Let's connect | Mari terhubung |
| `footer.contactLead` | Reach our team by phone or email, or visit us in person. | Hubungi tim kami melalui telepon atau email, atau kunjungi kami secara langsung. |
| `common.sample` | Sample content | Contoh konten |
| `common.slideOf` | {{n}} of {{total}} | {{n}} dari {{total}} |
| `common.carousel` | carousel | karosel |
| `common.slide` | slide | slide |
| `common.newTab` | Opens in a new tab | Terbuka di tab baru |

These value-only changes (keys unchanged) are recommended and pending approval:

| Key | Now | Proposed |
|---|---|---|
| `testimonials.prev` / `.next` | Previous / Next (Sebelumnya / Berikutnya) | Previous testimonial / Next testimonial (Testimoni sebelumnya / Testimoni berikutnya). Q11. |
| `why.cta` | Meet the team (Kenali Tim Kami) | Talk to our engineers (Bicara dengan engineer kami). Q1. |

---

## File tree changes (under `WEBSITE/`)
```
NEW   docs/PLAN-sections.md                    (this file)
NEW   src/hooks/useReveal.ts  useSnapTrack.ts  useSwipe.ts
NEW   src/lib/links.ts
NEW   src/components/art/Pixels.tsx
NEW   src/components/SectionHeader.tsx  SliderButton.tsx  PlaceholderBadge.tsx  ContactLink.tsx
NEW   src/components/WhyUs/WhyUs.tsx  WhyArt.tsx  points.ts
NEW   src/components/Services/Services.tsx  ServiceCard.tsx  services.ts
NEW   src/components/CtaBanner/CtaBanner.tsx  actions.ts
NEW   src/components/Proof/proof.ts  Portfolio.tsx  CaseCard.tsx  Testimonials.tsx
NEW   src/components/Footer/Footer.tsx  LocationCard.tsx  locations.ts
EDIT  src/index.css               .reveal reads --reveal-delay; print rule
EDIT  src/lib/a11y.ts             prefersReducedMotion()
EDIT  src/lib/site.config.ts      workshopPhones, workshopEmail, maps, social, legal, SocialId/SocialLink, SHOW_PLACEHOLDERS
EDIT  src/hooks/useCarousel.ts    autoplay option; shared prefersReducedMotion
EDIT  src/hooks/useActiveSection.ts  keep previous when none visible; bottom sentinel -> last id
EDIT  src/components/icons.tsx    export IconProps/IconComponent; 17 icons
EDIT  src/components/nav.ts       SectionId type
EDIT  src/components/Logo.tsx     full prop
EDIT  src/components/TopBar.tsx   ContactLink + links.ts (identical output)
EDIT  src/components/Hero/SlideArt.tsx  import Pixels from ../art/Pixels (identical output)
EDIT  src/i18n/en.ts  src/i18n/id.ts   18 new keys
EDIT  src/App.tsx                 section order + Footer
EDIT  CLAUDE.md                   rules for useReveal/SectionHeader/ContactLink/links.ts, SHOW_PLACEHOLDERS, data-placeholder check
UNCHANGED  package.json (no new deps), vite.config.ts, tsconfig.json, Hero.tsx, Header/Navbar/MobileMenu, LangToggle, I18nProvider
```

**Implementation order.** Run `npm run build` at the end of every phase.
1. Shared pieces, plus the TopBar and SlideArt refactors. The Hero and TopBar must look identical.
2. Why Choose Us and Services.
3. CTA banner.
4. Portfolio and Testimonials.
5. Footer and the `useActiveSection` edit.
6. `CLAUDE.md` update.

---

## Verification
1. `npx tsc --noEmit` and `npm run build` after every phase (key parity, `noUnusedLocals`).
2. Dev server, EN and ID, at 320 / 375 / 768 / 1024 / 1280:
   - no horizontal scroll
   - no clipped ID copy
   - toggling the language mid-page keeps reveal state and the testimonial index
3. Every nav link (header, mobile menu, footer quick links) lands below the sticky header. The active link updates through every section, including Contact on a 1200px-tall viewport.
4. Keyboard only:
   - one tab stop in Why
   - 6 unique "Learn more about…" links in Services
   - the Portfolio track is focusable while it overflows
   - ←/→ in Testimonials
   - the footer order matches the visual order
   - focus is visible on light (`brand-500`) and dark (`accent-400`) sections
5. Reduced-motion emulation:
   - every section visible immediately
   - no crossfade, lift or smooth scroll
   - no autoplay anywhere except the Hero, which already pauses
6. `grep -rE '#[0-9a-fA-F]{6}' src --include=*.tsx --include=*.ts` returns nothing.
7. Placeholders:
   - in dev: drafts render flagged; `document.querySelectorAll('a[href^="mailto:"],a[href^="tel:"]').length === 0`
   - `npm run build && npm run preview`: Portfolio shows the invite card and Testimonials the empty sentence; `#portfolio` and `#clients` still resolve
8. Hero art visual diff after the `Pixels` move. TopBar is unchanged at 375 / 768 / 1280.
9. Lighthouse a11y 95 or better and axe clean (no `scrollable-region-focusable` or `list` violations). Print preview shows all content.

---

## Open questions for the owner
1. **Why CTA copy:** `why.cta` "Meet the team" links to `#contact`, and there is no team section. Change it to "Talk to our engineers" / "Bicara dengan engineer kami"?
2. **24/7 support:** is it real at launch? It is claimed in `hero.s4`, `topbar.support` and `why.p4.text`.
3. **"We reply within one business day"** (`cta.text`): can you honour it from launch?
4. **Services links:** should "Learn more" go to `#contact` (current), to per-service pages later, or should the cards be static (`SERVICE_HREF = null`)?
5. **Physical cabling and installation:** does DATHA really do it (`services.s3`, BUILD_PLAN open item 3)?
6. **CTA band primary pill:** do you approve the white pill? `brand-600` only reaches about 1.5:1 against the band.
7. **Placeholders in production:** the plan hides sample portfolio and testimonial rows in production builds and shows the empty states. Is that OK, or do you want the sections and their nav links removed until real content exists?
8. **Case studies:** will they get pages, PDFs or links? Without an `href`, real cards render no "View case study" link.
9. **Consent:** is written client consent on file for every quote (name, role, company), and has each client signed off its metric figure?
10. **Testimonial autoplay:** recommended off. Confirm?
11. **Slider button labels:** approve the `testimonials.prev/next` value change?
12. **Workshop:** is it a real separate location? Does it have its own phone, email and hours?
13. **Social channels:** LinkedIn and Instagram are assumed. Add WhatsApp click-to-chat (common in Indonesia)? Lucide no longer maintains brand icons, so the official marks may be needed.
14. **Privacy Policy and Terms:** pages, external URLs, or hidden for now? A privacy notice is advisable under UU PDP 27/2022.
15. **Maps:** is a Google Maps search link derived from the address acceptable, or will you supply exact share URLs?
16. **Real contact data:** phone, info email, hours, both addresses.
17. **Copy review:** a native speaker should review the 18 new ID strings (BUILD_PLAN 6.7).
18. **Team photo:** is a real team photo planned for Why? If yes, it replaces `WhyArt` and uses `why.imageAlt`.

---

## Review log
The adversarial review and synthesis agents did not run (usage limit). This consolidation pass was done inline against the source instead. Changes made to the merged module plans:
- **Three incompatible `useReveal` APIs** (`{ref,className}`, `{ref,shown}`, `[ref,cls]`) were reduced to one, `{ ref, shown, className }`. It has one shared observer, `threshold: 0`, a `focusin` fallback and reduced motion in its initial state.
- **Stagger mechanism:** inline `transitionDelay` and `--reveal-delay` classes were unified on `--reveal-delay`. `.reveal` reads the variable, and `revealDelay()` handles the inline case.
- **Three pixel-motif modules** (`art/Pixels`, `PixelCluster`, `PixelMotif`) became one, `components/art/Pixels.tsx`.
- **`ArrowRightIcon` defined in 4 plans** is now defined once. `IconProps` and `IconComponent` are exported once.
- **Placeholder helpers** were split across `site.config` (helpers), `links.ts` and two gate components. They are now `lib/links.ts` plus one `ContactLink`/`PlaceholderText`. TopBar is migrated with identical output.
- **Background collision:** Why and Services were both `bg-surface` and adjacent. Why is now white.
- **`showPlaceholders: true` manual flag** became an env-based `SHOW_PLACEHOLDERS`, so a plain production build can never ship sample clients or metrics.
- **Footer contact tier** was scroll-revealed. It is now static, because a fade after the anchor jump reads as lag.
- **`useActiveSection`:** the CTA band's "nothing active" gap and the "Contact never active on tall screens" gap are fixed together.
- **Portfolio:** B's flex track and A's subgrid track were merged into A's subgrid track (row alignment in both languages) with B's header controls and `useSnapTrack`. A's scrubber was dropped. The invite card moved from inside the track to the empty state.
- **Card lift transition:** `transition-[transform,box-shadow]` would not animate v4's `translate` property, so it is now `transition-[translate,box-shadow]`.
- **Footer map link names:** an sr-only `": "` literal was replaced by `aria-labelledby`.
- **`SectionHeader`** gained `reveal={false}` for the footer landing zone and is now used by all 5 modules. That removes four hand-written eyebrow/h2 blocks.
- **Testimonials `aria-roledescription`** is localized through `common.carousel` / `common.slide`. Hero still hard-codes English; that is a follow-up.

## Follow-ups (not in this plan)
- Hero: adopt `useSwipe` (it lacks `touch-action`, and mouse drags trigger swipes), localized `aria-roledescription` and `common.slideOf`.
- Rename `.hero-glow` to a generic `.glow`. It is now used by 4 sections.
- Pre-launch check: `document.querySelectorAll('[data-placeholder]').length === 0` and a grep for `[` placeholders.
