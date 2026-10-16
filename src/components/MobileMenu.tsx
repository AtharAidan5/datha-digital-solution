import { useEffect, useRef, type RefObject } from 'react'
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
