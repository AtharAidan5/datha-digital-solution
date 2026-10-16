import type { SectionId } from '../nav'
import { SectionHeader } from '../SectionHeader'
import { ServiceCard } from './ServiceCard'
import { SERVICE_HREF, SERVICES } from './data'

const SECTION_ID: SectionId = 'services'

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

/** 6-card services grid. Mounted eagerly: useActiveSection looks up #services once on mount. */
export function Services() {
  return (
    <section id={SECTION_ID} aria-labelledby="services-title" className="relative isolate bg-surface py-section">
      <Decor />
      <div className="mx-auto max-w-page px-gutter">
        <SectionHeader layout="split" titleId="services-title" eyebrow="services.eyebrow" title="services.title" lead="services.lead" />
        {/* 1 col < 768, 2 cols md, 3 cols lg: 6 divides by 2 and 3, so no orphan card. */}
        <ul role="list" className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:mt-16 lg:grid-cols-3 xl:gap-8">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} href={SERVICE_HREF} />
          ))}
        </ul>
      </div>
    </section>
  )
}
