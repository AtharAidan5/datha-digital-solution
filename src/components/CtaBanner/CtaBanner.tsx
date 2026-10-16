import { useId } from 'react'
import { revealDelay, useReveal } from '../../hooks/useReveal'
import { useT } from '../../i18n'
import { mailtoHref } from '../../lib/links'
import { site } from '../../lib/site.config'
import { PixelCluster, type PixelCell } from '../art/Pixels'
import { ContactLink } from '../ContactLink'
import { ArrowRightIcon, MailIcon } from '../icons'
import { CTA_ACTIONS, resolveCtaHref, type CtaAction } from './actions'

/** Corner squares in a 160x128 box; drawn cells end at y<=84, so with the 25% offset they stay inside the panel padding. */
const CORNER_PIXELS: readonly PixelCell[] = [
  [128, 0, 32, 0.55],
  [92, 6, 24, 0.45],
  [134, 38, 22, 0.4],
  [62, 4, 14, 0.3],
  [104, 40, 16, 0.3],
  [142, 70, 14, 0.25],
  [80, 34, 10, 0.2],
  [118, 68, 10, 0.2],
  [44, 18, 8, 0.15],
]

const BTN_BASE =
  'group inline-flex min-h-12 items-center justify-center gap-2 rounded-pill border px-7 py-3 text-center font-semibold transition-colors motion-reduce:transition-none'
const VARIANT: Record<CtaAction['variant'], string> = {
  // White primary: brand-900 on white ~16:1, on accent-300 hover ~13:1. border-transparent shows an edge in forced colours.
  primary: 'border-transparent bg-white text-brand-900 shadow-glow hover:bg-accent-300',
  // Translucent navy fill keeps the white label >= 4.5:1 anywhere on the gradient.
  secondary: 'border-white/60 bg-brand-900/30 text-white hover:border-accent-300 hover:text-accent-300',
}

/**
 * Mid-page action banner. Inset dark panel on a white section, so it never touches the dark footer.
 * Links go to #contact while site.email is a placeholder, mailto: with a localized subject once it is real.
 */
export function CtaBanner() {
  const { t } = useT()
  const titleId = useId()
  const r = useReveal<HTMLDivElement>()

  return (
    <section aria-labelledby={titleId} className="bg-white py-section">
      <div className="mx-auto max-w-page px-gutter">
        <div className="on-dark relative isolate overflow-hidden rounded-card bg-brand-900 text-white shadow-card">
          {/* Same recipe as the Hero, without hero-glow (the contrast figures exclude it). Do not exceed 40%. */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-brand-gradient opacity-40" />
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent-300/60 to-transparent" />
          <PixelCluster
            viewBox="0 0 160 128"
            cells={CORNER_PIXELS}
            className="pointer-events-none absolute right-0 top-0 -z-10 w-24 -translate-y-1/4 sm:w-32 lg:w-44 forced-colors:hidden"
          />
          <PixelCluster
            viewBox="0 0 160 128"
            cells={CORNER_PIXELS}
            className="pointer-events-none absolute bottom-0 left-0 -z-10 w-20 translate-y-1/4 rotate-180 sm:w-28 lg:w-36 forced-colors:hidden"
          />

          <div
            ref={r.ref}
            className="grid grid-cols-1 items-center gap-8 px-6 py-12 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(14rem,auto)] lg:gap-12 lg:px-16 lg:py-16 xl:gap-16"
          >
            <div className={`${r.className} min-w-0 max-w-3xl`}>
              <h2 id={titleId} className="text-h2 font-extrabold tracking-tight text-balance">
                {t('cta.title')}
              </h2>
              <p className="mt-4 max-w-prose text-body text-pretty text-white/90">{t('cta.text')}</p>
            </div>

            <div className={`${r.className} grid gap-4 lg:border-l lg:border-white/15 lg:pl-12`} style={revealDelay(120)}>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col lg:flex-nowrap">
                {CTA_ACTIONS.map((a) => {
                  const label = t(a.label)
                  const { href, mail } = resolveCtaHref(site.email, t(a.subject))
                  const Icon = mail ? MailIcon : ArrowRightIcon
                  return (
                    <a
                      key={a.id}
                      href={href}
                      data-cta={a.id}
                      aria-label={mail ? t('cta.mailLabel', { label }) : undefined}
                      className={`${BTN_BASE} ${VARIANT[a.variant]}`}
                    >
                      {label}
                      <Icon
                        width={20}
                        height={20}
                        className="shrink-0 transition-transform motion-safe:group-hover:translate-x-0.5 motion-reduce:transition-none"
                      />
                    </a>
                  )
                })}
              </div>

              {/* Fallback for visitors without a mail app. The placeholder renders muted + flagged, like TopBar. */}
              <p className="flex flex-wrap items-center gap-x-2 text-small text-white/90">
                <MailIcon width={16} height={16} className="shrink-0 text-accent-300" />
                <span>{t('cta.emailLabel')}</span>
                <ContactLink
                  href={mailtoHref(site.email, { subject: t('cta.contactSubject') })}
                  label={t('cta.mailLabel', { label: site.email })}
                  className="inline-flex min-h-11 items-center break-all rounded-sm font-semibold"
                  linkClassName="text-white underline decoration-accent-300/60 underline-offset-4 transition-colors hover:decoration-accent-300 motion-reduce:transition-none"
                >
                  {site.email}
                </ContactLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
