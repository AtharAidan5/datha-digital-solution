import { useReveal } from '../../hooks/useReveal'
import { useT } from '../../i18n'
import { socialHref } from '../../lib/links'
import { site, type SocialId } from '../../lib/site.config'
import { ContactLink } from '../ContactLink'
import { InstagramIcon, LinkedInIcon, MessageCircleIcon, type IconComponent } from '../icons'
import { LangToggle } from '../LangToggle'
import { Logo } from '../Logo'
import { NAV_LINKS, navHref } from '../nav'
import { SectionHeader } from '../SectionHeader'
import { LocationCard } from './LocationCard'
import { LOCATIONS } from './locations'

/** Shared by both tiers so their columns align: 1 / md:2 / xl:3. No items-* (stretch = equal heights). */
const COLS = 'grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-12'
const LINK = 'text-white/85 transition-colors hover:text-accent-300 motion-reduce:transition-none'
const NEW_TAB_ID = 'footer-new-tab'
const SOCIAL_ICONS: Record<SocialId, IconComponent> = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  whatsapp: MessageCircleIcon,
}

/** Single-office footer. id="contact" is the target of every Contact CTA, so the contact tier comes first. */
export function Footer() {
  const { t } = useT()
  const tier2 = useReveal<HTMLDivElement>()

  return (
    // Sibling of <main> = the page's contentinfo landmark.
    <footer id="contact" className="on-dark relative isolate overflow-hidden bg-brand-900 text-white/75">
      <div aria-hidden="true" className="h-1 bg-brand-gradient" />
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0 -z-10 opacity-30" />

      <div className="mx-auto max-w-page px-gutter pb-12 pt-section">
        {/* Tier 1: contact. Static (not revealed): readable the moment #contact lands. */}
        <div className={COLS}>
          <SectionHeader
            tone="dark"
            reveal={false}
            titleId="contact-title"
            eyebrow="nav.contact"
            title="footer.contactTitle"
            lead="footer.contactLead"
            className="min-w-0 md:col-span-2 xl:col-span-1"
          />

          {LOCATIONS.map((loc) => (
            <LocationCard key={loc.id} location={loc} newTabId={NEW_TAB_ID} />
          ))}

          <div className="flex min-w-0 flex-col border-t border-white/15 pt-6">
            <h3 id="footer-social-title" className="text-h3 font-bold text-white">
              {t('footer.followUs')}
            </h3>
            <ul role="list" aria-labelledby="footer-social-title" className="mt-4 flex flex-wrap gap-3">
              {site.social.map((s) => {
                const Icon = SOCIAL_ICONS[s.id]
                return (
                  <li key={s.id}>
                    <ContactLink
                      href={socialHref(s)}
                      external
                      describedBy={NEW_TAB_ID}
                      className="grid size-11 place-items-center rounded-pill border"
                      linkClassName="border-white/25 text-white transition-colors hover:border-accent-300 hover:text-accent-300 motion-reduce:transition-none"
                      placeholderClassName="border-dashed border-white/20 text-white/40"
                    >
                      <Icon width={20} height={20} />
                      <span className="sr-only">{s.label}</span>
                    </ContactLink>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Tier 2: brand + quick links, same column template. */}
        <div ref={tier2.ref} className={`${tier2.className} ${COLS} mt-12 border-t border-white/10 pt-12`}>
          <div className="min-w-0">
            <Logo full />
            <p className="mt-6 text-small font-semibold uppercase tracking-[0.2em] text-balance text-accent-300">
              {/* A no-break space ties each bullet to the word before it, so a line never starts with "•". */}
              {t('footer.tagline').split(/\s*•\s*/).join('\u00a0• ')}
            </p>
            <p className="mt-3 max-w-prose">{t('footer.about')}</p>
          </div>
          <nav aria-labelledby="footer-links-title" className="min-w-0 xl:col-span-2">
            <h2 id="footer-links-title" className="text-small font-semibold uppercase tracking-[0.2em] text-white">
              {t('footer.quickLinks')}
            </h2>
            <ul className="mt-2 grid w-fit grid-cols-2 gap-x-12">
              {NAV_LINKS.map((l) => (
                <li key={l.section}>
                  <a href={navHref(l.section)} className={`inline-flex min-h-11 items-center rounded-sm ${LINK}`}>
                    {t(l.key)}
                  </a>
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
            <ul role="list" className="flex flex-wrap gap-x-6">
              <li>
                <a href="/privacy/" className={`inline-flex min-h-11 items-center rounded-sm ${LINK}`}>
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="/terms/" className={`inline-flex min-h-11 items-center rounded-sm ${LINK}`}>
                  {t('footer.terms')}
                </a>
              </li>
            </ul>
            <LangToggle variant="onDark" />
          </div>
        </div>
      </div>
      <span id={NEW_TAB_ID} hidden>
        {t('common.newTab')}
      </span>
    </footer>
  )
}
