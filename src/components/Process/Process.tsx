import { revealDelay, useReveal } from '../../hooks/useReveal'
import { useT } from '../../i18n'
import { keepCompounds } from '../../lib/text'
import { SectionHeader } from '../SectionHeader'
import { PROCESS_STEPS, type ProcessStep } from './data'

const STAGGER_MS = 90

function Step({ step, index }: { step: ProcessStep; index: number }) {
  const { t } = useT()
  const r = useReveal<HTMLLIElement>()
  const { icon: Icon } = step
  return (
    <li ref={r.ref} style={revealDelay(index * STAGGER_MS)} className={`${r.className} relative min-w-0`}>
      <div className="flex items-center gap-4">
        {/* bg-white ring masks the lg connector line behind the tile. */}
        <span aria-hidden="true" className="relative grid size-12 shrink-0 place-items-center rounded-card bg-brand-50 text-brand-700 ring-8 ring-white">
          <Icon width={24} height={24} strokeWidth={1.75} />
        </span>
        {/* bg-white breaks the connector line around the number instead of striking through it. */}
        <span aria-hidden="true" className="relative bg-white px-2 text-small font-bold tabular-nums tracking-widest text-brand-900/30">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <h3 className="mt-5 text-h3 font-bold text-balance text-brand-900">{keepCompounds(t(step.title))}</h3>
      <p className="mt-2 text-pretty text-slate-brand">{t(step.text)}</p>
    </li>
  )
}

/**
 * "How we work": four delivery steps. Honest proof while there are no case studies yet.
 * No bottom padding: the next section (CtaBanner) is also white and its py-section makes the single gap.
 */
export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="bg-white pt-section">
      <div className="mx-auto max-w-page px-gutter">
        <SectionHeader layout="split" titleId="process-title" eyebrow="process.eyebrow" title="process.title" lead="process.lead" />
        {/* <ol> carries the order for assistive tech; the visible 01-04 numbers are decorative. */}
        <ol role="list" className="relative mt-12 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {/* lg only: line through the icon tiles (tile centre = 24px) to show the sequence. */}
          <span aria-hidden="true" className="absolute inset-x-6 top-6 hidden h-px bg-brand-100 lg:block" />
          {PROCESS_STEPS.map((s, i) => (
            <Step key={s.id} step={s} index={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}
