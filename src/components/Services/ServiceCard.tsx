import { useReveal } from '../../hooks/useReveal'
import { useT } from '../../i18n'
import { keepCompounds } from '../../lib/text'
import { ArrowRightIcon } from '../icons'
import type { Service } from './data'

/**
 * Reveal delay per index so each grid row cascades left to right.
 * MUST mirror the <ul> columns: 1 col < md, 2 cols md..lg, 3 cols lg+.
 */
const STAGGER = [
  '',
  'md:[--reveal-delay:90ms]',
  'lg:[--reveal-delay:180ms]',
  'md:[--reveal-delay:90ms] lg:[--reveal-delay:0ms]',
  'lg:[--reveal-delay:90ms]',
  'md:[--reveal-delay:90ms] lg:[--reveal-delay:180ms]',
] as const

// Hover and keyboard focus look the same. Written out in full so Tailwind's scanner finds them.
const CARD_ACTIVE =
  'group-hover:border-brand-500 group-has-[a:focus-visible]:border-brand-500 motion-safe:group-hover:-translate-y-1 motion-safe:group-has-[a:focus-visible]:-translate-y-1'
const TILE_ACTIVE =
  'group-hover:bg-brand-600 group-hover:text-white group-has-[a:focus-visible]:bg-brand-600 group-has-[a:focus-visible]:text-white'
const BAR_ACTIVE = 'group-hover:scale-x-100 group-has-[a:focus-visible]:scale-x-100'

interface Props {
  service: Service
  index: number
  href: string | null
}

export function ServiceCard({ service, index, href }: Props) {
  const { t } = useT()
  const r = useReveal<HTMLLIElement>()
  const { icon: Icon } = service
  const title = t(service.title)
  // Static cards (href null) have no link row: span 3 subgrid rows, not 4, so there is no empty bottom track.
  const rows = href ? 'row-span-4' : 'row-span-3'

  return (
    // li: reveal + hover group (it never moves). Subgrid: icon/title/text/link rows align across a grid row.
    <li ref={r.ref} className={`${r.className} group ${rows} grid grid-rows-subgrid gap-y-3 ${STAGGER[index] ?? ''}`}>
      {/* card: hover/focus visuals only (.reveal must never sit on an element with transition utilities). */}
      <div
        className={`relative ${rows} grid grid-rows-subgrid gap-y-3 rounded-card border border-brand-100 bg-white p-6 shadow-card transition duration-300 ease-out motion-reduce:transition-none xl:p-8 ${
          href ? CARD_ACTIVE : ''
        }`}
      >
        {href && (
          <span
            aria-hidden="true"
            className={`absolute inset-x-6 top-0 h-1 origin-left scale-x-0 rounded-b-pill bg-brand-gradient transition-transform duration-300 ease-out motion-reduce:transition-none xl:inset-x-8 ${BAR_ACTIVE}`}
          />
        )}

        {/* Row 1: icon tile + logo pixel + index numeral */}
        <div className="mb-3 flex items-start justify-between gap-4">
          <span
            className={`relative grid size-12 shrink-0 place-items-center rounded-card bg-brand-50 text-brand-700 transition-colors duration-300 motion-reduce:transition-none ${
              href ? TILE_ACTIVE : ''
            }`}
          >
            <Icon width={24} height={24} strokeWidth={1.75} />
            <span aria-hidden="true" className="absolute -right-1 -top-1 size-2.5 rounded-xs bg-accent-300 ring-2 ring-white" />
          </span>
          <span aria-hidden="true" className="text-small font-bold tabular-nums tracking-widest text-brand-900/30">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Row 2 */}
        <h3 className="text-h3 font-bold tracking-tight text-balance wrap-break-word text-brand-900">{keepCompounds(title)}</h3>

        {/* Row 3 */}
        <p className="text-pretty text-slate-brand">{t(service.text)}</p>

        {/* Row 4: stretched ::after makes the whole card the hit area; the focus outline stays on the link. */}
        {href && (
          <a
            href={href}
            aria-label={t('services.learnMoreAbout', { service: title })}
            className="inline-flex min-h-11 items-center gap-2 self-end justify-self-start rounded-sm font-semibold text-brand-700 transition-colors after:absolute after:inset-0 after:rounded-card group-hover:text-brand-900"
          >
            {t('services.learnMore')}
            <ArrowRightIcon
              width={18}
              height={18}
              className="shrink-0 transition-transform duration-300 motion-reduce:transition-none motion-safe:group-hover:translate-x-1 motion-safe:group-has-[a:focus-visible]:translate-x-1"
            />
          </a>
        )}
      </div>
    </li>
  )
}
