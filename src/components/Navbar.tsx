import type { RefObject } from 'react'
import { useT } from '../i18n'
import { LangToggle } from './LangToggle'
import { Logo } from './Logo'
import { NAV_LINKS, navHref } from './nav'
import { CloseIcon, MenuIcon } from './icons'

interface Props {
  open: boolean
  onToggle: () => void
  active: string | null
  burgerRef: RefObject<HTMLButtonElement>
}

export function Navbar({ open, onToggle, active, burgerRef }: Props) {
  const { t } = useT()

  return (
    <nav
      aria-label={t('nav.menu')}
      className="on-dark border-b border-white/10 bg-brand-900/95 text-white backdrop-blur supports-[backdrop-filter]:bg-brand-900/90"
    >
      <div className="mx-auto grid h-16 max-w-page grid-cols-[1fr_auto] items-center gap-x-6 px-gutter lg:h-20 lg:grid-cols-[auto_1fr_auto]">
        <Logo />

        <ul className="hidden items-center justify-center gap-x-8 lg:flex">
          {NAV_LINKS.map((l) => {
            const current = active === l.section
            return (
              <li key={l.section}>
                <a
                  href={navHref(l.section)}
                  aria-current={current ? 'location' : undefined}
                  className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-sm font-medium transition-colors hover:text-accent-300 ${
                    current ? 'text-accent-300' : 'text-white/85'
                  }`}
                >
                  {t(l.key)}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <LangToggle variant="onDark" />
          </div>
          <a
            href="#contact"
            className="hidden min-h-11 items-center whitespace-nowrap rounded-pill bg-brand-600 px-6 font-semibold text-white transition-colors hover:bg-brand-700 lg:inline-flex"
          >
            {t('nav.cta')}
          </a>
          <button
            ref={burgerRef}
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            className="grid size-11 place-items-center rounded-pill text-white hover:bg-white/10 lg:hidden"
          >
            {open ? <CloseIcon width={24} height={24} /> : <MenuIcon width={24} height={24} />}
          </button>
        </div>
      </div>
    </nav>
  )
}
