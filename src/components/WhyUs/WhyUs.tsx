import { revealDelay, useReveal } from '../../hooks/useReveal'
import { useT } from '../../i18n'
import { keepCompounds } from '../../lib/text'
import { ArrowRightIcon, HandshakeIcon, LayersIcon, RefreshCwIcon, ShieldCheckIcon, type IconComponent } from '../icons'
import type { SectionId } from '../nav'
import { SectionHeader } from '../SectionHeader'
import { WHY_POINTS, type WhyIcon, type WhyPointData } from './points'
import { WhyArt } from './WhyArt'

const SECTION_ID: SectionId = 'about'
const STAGGER_MS = 80
const ICONS: Record<WhyIcon, IconComponent> = {
  stack: LayersIcon,
  iterate: RefreshCwIcon,
  partner: HandshakeIcon,
  secure: ShieldCheckIcon,
}

function WhyPoint({ point, index }: { point: WhyPointData; index: number }) {
  const { t } = useT()
  const r = useReveal<HTMLLIElement>()
  const Icon = ICONS[point.icon]
  return (
    // The li IS the card: grid item, so cards in a row get equal height. Mobile: icon left; sm+: icon above.
    <li
      ref={r.ref}
      style={revealDelay(index * STAGGER_MS)}
      className={`${r.className} flex min-w-0 gap-4 rounded-card border border-brand-100 bg-white p-5 shadow-card sm:flex-col sm:gap-5 sm:p-6`}
    >
      <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
        <Icon width={24} height={24} />
      </span>
      <div className="min-w-0">
        <h3 className="text-h3 font-bold text-balance text-brand-900">{keepCompounds(t(point.title))}</h3>
        <p className="mt-2 text-pretty text-slate-brand">{t(point.text)}</p>
      </div>
    </li>
  )
}

/** Why Choose Us: split section. lg+: sticky visual left (zig-zag against the Hero), content right. */
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
        <SectionHeader
          titleId="why-title"
          eyebrow="why.eyebrow"
          title="why.title"
          lead="why.lead"
          className="min-w-0 md:col-start-1 md:row-start-1 lg:col-start-2 lg:row-start-1"
        />

        {/* 2. Visual: base row 2 | md col 2 row 1 | lg col 1 rows 1-3, sticky under the header */}
        <div
          ref={art.ref}
          aria-hidden="true"
          className={`${art.className} relative isolate md:col-start-2 md:row-start-1 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:self-start`}
        >
          {/* Pixel squares bleeding off the frame: 12px bleed < 16px minimum gutter, so no page h-scroll. */}
          <span className="absolute -left-3 -top-3 z-10 size-6 rounded-md bg-accent-300 shadow-glow" />
          <span className="absolute -bottom-3 -right-3 -z-10 size-9 rounded-lg bg-brand-500" />
          <div className="relative isolate aspect-4/3 overflow-hidden rounded-card bg-brand-900 shadow-card lg:aspect-12/11">
            <div className="absolute inset-0 -z-10 bg-brand-gradient opacity-40" />
            <div className="hero-glow absolute inset-0 -z-10" />
            <WhyArt className="absolute inset-0 size-full p-4 sm:p-8" />
          </div>
        </div>

        {/* 3. Points: 1 col < sm, 2x2 from sm. role="list": preflight's list-style:none drops semantics in Safari. */}
        <ul
          role="list"
          className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:col-span-2 md:row-start-2 lg:col-span-1 lg:col-start-2 lg:row-start-2"
        >
          {WHY_POINTS.map((p, i) => (
            <WhyPoint key={p.id} point={p} index={i} />
          ))}
        </ul>

        {/* 4. CTA: never revealed (a focus target must never be transparent) */}
        <div className="md:col-span-2 md:row-start-3 lg:col-span-1 lg:col-start-2 lg:row-start-3">
          <a
            href="#contact"
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-pill bg-brand-600 px-7 py-2.5 text-center font-semibold text-white shadow-card transition-colors hover:bg-brand-700 motion-reduce:transition-none sm:w-auto"
          >
            {t('why.cta')}
            <ArrowRightIcon width={20} height={20} className="shrink-0 motion-safe:transition-transform motion-safe:group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
