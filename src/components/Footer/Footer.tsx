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

const LINK = 'text-white/85 transition-colors hover:text-accent-300 motion-reduce:transition-none'
/** Small-caps column heading (Follow us, Quick links). */
const COL_TITLE = 'text-small font-semibold uppercase tracking-[0.2em] text-white'
const NEW_TAB_ID = 'footer-new-tab'
const SOCIAL_ICONS: Record<SocialId, IconComponent> = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  whatsapp: MessageCircleIcon,
}

/**
 * Single-office footer in one grid: brand | contact | quick links (lg), brand + links | contact (md), stacked below.
 * The contact column carries id="contact", the target of every Contact CTA, so a jump lands on the contact details
 * on every width. Nothing here is revealed: it must be readable the moment #contact lands.
 */
export function Footer() {
  const { t } = useT()

  return (
    // Sibling of <main> = the page's contentinfo landmark. Tracked as the "Contact" section as a whole (nav state);
    // the jump target #contact is its contact column.
    <footer data-section="contact" className="on-dark relative isolate overflow-hidden bg-brand-900 text-white/75">
      <div aria-hidden="true" className="h-1 bg-brand-gradient" />
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0 -z-10 opacity-30" />

      <div className="mx-auto grid max-w-page grid-cols-1 gap-x-8 gap-y-12 px-gutter pb-12 pt-section md:grid-cols-2 lg:grid-cols-12 lg:gap-x-12">
        <div className="min-w-0 lg:col-span-4">
          <Logo full />
          <p className="mt-6 text-small font-semibold uppercase tracking-[0.2em] text-balance text-accent-300">
            {/* A no-break space ties each bullet to the word before it, so a line never starts with "•". */}
            {t('footer.tagline').split(/\s*•\s*/).join(' • ')}
          </p>
          <p className="mt-3 max-w-prose">{t('footer.about')}</p>

          <h2 id="footer-social-title" className={`mt-8 ${COL_TITLE}`}>
            {t('footer.followUs')}
          </h2>
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

        {/* md: spans both rows next to brand + links. */}
        <div id="contact" className="flex min-w-0 flex-col gap-8 md:row-span-2 lg:col-span-5 lg:row-span-1">
          <SectionHeader
            tone="dark"
            reveal={false}
            titleId="contact-title"
            eyebrow="nav.contact"
            title="footer.contactTitle"
            lead="footer.contactLead"
          />
          {LOCATIONS.map((loc) => (
            <LocationCard key={loc.id} location={loc} newTabId={NEW_TAB_ID} />
          ))}
        </div>

        <nav aria-labelledby="footer-links-title" className="min-w-0 lg:col-span-3">
          <h2 id="footer-links-title" className={COL_TITLE}>
            {t('footer.quickLinks')}
          </h2>
          <ul className="mt-2 grid w-fit grid-cols-2 gap-x-12 lg:grid-cols-1">
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
