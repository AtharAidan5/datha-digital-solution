import { useEffect, useLayoutEffect, useRef, type RefObject } from 'react'
import { useT } from '../i18n'
import { inertWhen } from '../lib/a11y'
import { NAV_LINKS, navHref } from './nav'

interface Props {
  open: boolean
  onClose: () => void
  active: string | null
  returnFocusTo: RefObject<HTMLButtonElement>
}

const DESKTOP = '(width >= 64rem)'

/** Full-height panel under the header for < lg. Lives outside <nav> (its backdrop-filter would trap `fixed`). */
export function MobileMenu({ open, onClose, active, returnFocusTo }: Props) {
  const { t } = useT()
  const firstLink = useRef<HTMLAnchorElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  // --header-h has two steps, but while the top bar scrolls away (scrollY 0 to --topbar-h) the navbar's bottom
  // moves 1:1 with the page. Pin the panel to the measured bottom before paint, and again if the page still moves
  // while open (user scroll is locked, programmatic scrolls are not). Kept after close so the fade-out does not jump.
  useLayoutEffect(() => {
    const el = panel.current
    if (!open || !el) return
    const pin = () => {
      const bottom = returnFocusTo.current?.closest('nav')?.getBoundingClientRect().bottom
      if (bottom !== undefined) el.style.top = `${bottom}px`
    }
    pin()
    addEventListener('scroll', pin, { passive: true })
    return () => removeEventListener('scroll', pin)
  }, [open, returnFocusTo])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const mq = window.matchMedia(DESKTOP)
    const onResize = () => {
      if (mq.matches) onClose()
    }
    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onResize)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // The panel covers <main> and the footer: make them inert so Tab cannot land on hidden controls.
    const background = [document.getElementById('main'), document.querySelector('footer')]
    background.forEach((el) => el?.setAttribute('inert', ''))
    firstLink.current?.focus()
    const burger = returnFocusTo.current
    return () => {
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onResize)
      document.body.style.overflow = prevOverflow
      background.forEach((el) => el?.removeAttribute('inert'))
      burger?.focus()
    }
  }, [open, onClose, returnFocusTo])

  return (
    <div
      ref={panel}
      id="mobile-menu"
      inert={inertWhen(!open)}
      className={`on-dark fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto bg-brand-900 text-white transition-opacity duration-200 motion-reduce:transition-none lg:hidden ${
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <ul className="grid gap-1 p-gutter">
        {NAV_LINKS.map((l, i) => {
          const current = active === l.section
          return (
            <li key={l.section}>
              <a
                ref={i === 0 ? firstLink : undefined}
                href={navHref(l.section)}
                onClick={onClose}
                aria-current={current ? 'location' : undefined}
                className={`flex min-h-14 items-center rounded-card px-4 text-h3 font-semibold transition-colors hover:bg-white/10 ${
                  current ? 'text-accent-300' : 'text-white'
                }`}
              >
                {t(l.key)}
              </a>
            </li>
          )
        })}
        <li className="mt-4">
          <a
            href="#contact"
            onClick={onClose}
            className="flex min-h-14 items-center justify-center rounded-pill bg-brand-600 px-6 font-semibold text-white hover:bg-brand-700"
          >
            {t('nav.cta')}
          </a>
        </li>
      </ul>
    </div>
  )
}
