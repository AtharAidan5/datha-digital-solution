import { useRef, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'
import { useCarousel } from '../../hooks/useCarousel'
import { useT } from '../../i18n'
import { inertWhen } from '../../lib/a11y'
import { ChevronLeftIcon, ChevronRightIcon } from '../icons'
import { SlideArt } from './SlideArt'
import { HERO_INTERVAL_MS, SLIDES } from './slides'

const SWIPE_PX = 50

export function Hero() {
  const { t } = useT()
  const { index, paused, setHovered, go, next, prev } = useCarousel(SLIDES.length, { interval: HERO_INTERVAL_MS })
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const pointerStart = useRef<number | null>(null)

  const onPointerDown = (e: PointerEvent) => {
    pointerStart.current = e.clientX
  }
  const onPointerUp = (e: PointerEvent) => {
    if (pointerStart.current === null) return
    const dx = e.clientX - pointerStart.current
    pointerStart.current = null
    if (dx <= -SWIPE_PX) next()
    else if (dx >= SWIPE_PX) prev()
  }

  // Arrow keys anywhere in the region (except inside the tablist, which handles its own).
  const onRegionKey = (e: KeyboardEvent) => {
    if ((e.target as HTMLElement).closest('[role="tablist"]')) return
    if (e.key === 'ArrowRight') next()
    else if (e.key === 'ArrowLeft') prev()
  }

  const onTabKey = (e: KeyboardEvent) => {
    const last = SLIDES.length - 1
    let target: number | null = null
    if (e.key === 'ArrowRight') target = index === last ? 0 : index + 1
    else if (e.key === 'ArrowLeft') target = index === 0 ? last : index - 1
    else if (e.key === 'Home') target = 0
    else if (e.key === 'End') target = last
    if (target === null) return
    e.preventDefault()
    go(target)
    tabs.current[target]?.focus()
  }

  return (
    <section
      id="top"
      role="region"
      aria-roledescription="carousel"
      aria-label={t('nav.home')}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHovered(false)
      }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onKeyDown={onRegionKey}
      className="on-dark relative isolate grid min-h-[calc(100svh-var(--header-h))] overflow-hidden bg-brand-900 text-white md:min-h-[36rem] md:max-h-[52rem]"
      style={{ '--hero-interval': `${HERO_INTERVAL_MS}ms` } as CSSProperties}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-brand-gradient opacity-40" />
      <div aria-hidden="true" className="hero-glow absolute inset-0 -z-10" />

      {/* All slides share one grid cell: the section is as tall as the tallest slide, so longer ID copy never clips. */}
      {/* The page's one h1 lives outside the slides: inactive slides are aria-hidden + inert. */}
      <h1 className="sr-only">{t('meta.title')}</h1>
      <div aria-live={paused ? 'polite' : 'off'} className="grid [&>*]:col-start-1 [&>*]:row-start-1">
        {SLIDES.map((s, i) => {
          const current = i === index
          return (
            <div
              key={s.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${SLIDES.length}`}
              aria-hidden={!current}
              inert={inertWhen(!current)}
              className={`transition-opacity duration-500 motion-reduce:transition-none ${
                current ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <div className="mx-auto grid h-full max-w-page grid-cols-1 items-center gap-10 px-gutter pb-28 pt-section lg:grid-cols-[1.1fr_0.9fr]">
                <div className="max-w-2xl">
                  <p className="mb-4 text-small font-semibold uppercase tracking-[0.2em] text-accent-300">{t(s.eyebrow)}</p>
                  <h2 className="text-display font-extrabold tracking-tight text-balance">{t(s.title)}</h2>
                  <p className="mt-6 max-w-prose text-body text-white/80">{t(s.text)}</p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <a
                      href="#contact"
                      className="inline-flex min-h-12 items-center rounded-pill bg-brand-600 px-7 font-semibold text-white shadow-glow transition-colors hover:bg-brand-700"
                    >
                      {t('hero.cta')}
                    </a>
                    <a
                      href="#services"
                      className="inline-flex min-h-12 items-center rounded-pill border border-white/40 px-7 font-semibold text-white transition-colors hover:border-accent-300 hover:text-accent-300"
                    >
                      {t('hero.ctaSecondary')}
                    </a>
                  </div>
                </div>
                <SlideArt kind={s.art} className="hidden w-full max-w-md justify-self-center lg:block" />
              </div>
            </div>
          )
        })}
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto flex max-w-page items-center justify-between px-gutter pb-6">
          <div role="tablist" aria-label={t('nav.home')} onKeyDown={onTabKey} className="flex items-center">
            {SLIDES.map((s, i) => {
              const current = i === index
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabs.current[i] = el
                  }}
                  type="button"
                  role="tab"
                  aria-selected={current}
                  aria-label={t('hero.goTo', { n: i + 1 })}
                  tabIndex={current ? 0 : -1}
                  onClick={() => go(i)}
                  className="grid size-11 place-items-center rounded-pill"
                >
                  <span className={`block h-1.5 overflow-hidden rounded-pill bg-white/30 transition-[width] ${current ? 'w-8' : 'w-3'}`}>
                    {current && (
                      <span key={index} data-paused={paused || undefined} className="hero-progress block h-full w-full bg-accent-300" />
                    )}
                  </span>
                </button>
              )
            })}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label={t('hero.prev')}
              className="grid size-11 place-items-center rounded-pill border border-white/30 transition-colors hover:border-accent-300 hover:text-accent-300"
            >
              <ChevronLeftIcon width={22} height={22} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label={t('hero.next')}
              className="grid size-11 place-items-center rounded-pill border border-white/30 transition-colors hover:border-accent-300 hover:text-accent-300"
            >
              <ChevronRightIcon width={22} height={22} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
