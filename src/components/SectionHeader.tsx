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
  /** Layout/placement only (grid placement, min-w-0). Never opacity/transition utilities. */
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

/** Eyebrow + h2 + optional lead, shared by every section. */
export function SectionHeader({ titleId, eyebrow, title, lead, layout = 'start', tone = 'light', reveal = true, className = '' }: Props) {
  const { t } = useT()
  const r = useReveal<HTMLDivElement>()
  const c = TONE[tone]
  return (
    <div ref={r.ref} className={`${reveal ? r.className : ''} ${LAYOUT[layout]} ${className}`}>
      <div className={layout === 'split' ? 'max-w-2xl' : ''}>
        <p
          className={`flex items-center gap-3 text-small font-semibold uppercase tracking-[0.2em] ${
            layout === 'center' ? 'justify-center' : ''
          } ${c.eyebrow}`}
        >
          <span aria-hidden="true" className="flex gap-1">
            <span className="size-1.5 rounded-xs bg-brand-500" />
            <span className="size-1.5 rounded-xs bg-accent-400" />
          </span>
          {t(eyebrow)}
        </p>
        <h2 id={titleId} className={`mt-4 text-h2 font-extrabold tracking-tight text-balance ${c.title}`}>
          {t(title)}
        </h2>
      </div>
      {lead && (
        <p
          className={`mt-4 max-w-prose text-pretty ${c.lead} ${layout === 'split' ? 'lg:mt-0 lg:justify-self-end' : ''} ${
            layout === 'center' ? 'mx-auto' : ''
          }`}
        >
          {t(lead)}
        </p>
      )}
    </div>
  )
}
