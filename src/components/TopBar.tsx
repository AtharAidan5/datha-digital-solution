import { useT } from '../i18n'
import { inertWhen } from '../lib/a11y'
import { mailtoHref, telHref } from '../lib/links'
import { site } from '../lib/site.config'
import { ContactLink, PlaceholderText } from './ContactLink'
import { LangToggle } from './LangToggle'
import { ClockIcon, MailIcon, PhoneIcon } from './icons'

const LINK = 'rounded-sm hover:text-white'

/** Utility bar above the navbar. Scrolls away with the page (Header sticks at -topbar-h); `offscreen` once it has. */
export function TopBar({ offscreen }: { offscreen: boolean }) {
  const { t, lang } = useT()
  return (
    <div
      className="on-dark bg-night text-small text-white/80"
      // inert, not aria-hidden: once scrolled out above the pinned navbar it must also leave the tab order
      // (focusing it would yank the page back to the top).
      inert={inertWhen(offscreen)}
    >
      {/* h-10 = --topbar-h (2.5rem): the header's sticky offset depends on it. */}
      <div className="mx-auto grid h-10 max-w-page grid-cols-[1fr_auto] items-center gap-x-6 px-gutter">
        <ul className="flex min-w-0 items-center gap-x-6 overflow-hidden whitespace-nowrap py-1">
          <li className="flex items-center gap-2">
            <PhoneIcon width={16} height={16} className="shrink-0 text-accent-300" />
            <span className="sr-only">{t('topbar.phoneLabel')}:</span>
            <ContactLink href={telHref(site.phone, site.phoneHref)} linkClassName={LINK}>
              {site.phone}
            </ContactLink>
          </li>
          <li className="hidden items-center gap-2 sm:flex">
            <MailIcon width={16} height={16} className="shrink-0 text-accent-300" />
            <span className="sr-only">{t('topbar.emailLabel')}:</span>
            <ContactLink href={mailtoHref(site.email)} linkClassName={LINK}>
              {site.email}
            </ContactLink>
          </li>
          <li className="hidden items-center gap-2 lg:flex">
            <ClockIcon width={16} height={16} className="shrink-0 text-accent-300" />
            <span className="sr-only">{t('topbar.hoursLabel')}:</span>
            <PlaceholderText value={site.hours[lang]}>{site.hours[lang]}</PlaceholderText>
          </li>
          <li className="hidden font-medium text-accent-300 xl:block">{t('topbar.support')}</li>
        </ul>
        {/* Below md the toggle lives in the Navbar instead. Wrapper, not className: the pill sets its own display. */}
        <div className="hidden md:block">
          <LangToggle variant="onDark" />
        </div>
      </div>
    </div>
  )
}
