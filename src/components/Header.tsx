import { useCallback, useEffect, useRef, useState } from 'react'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrolled } from '../hooks/useScrolled'
import { MobileMenu } from './MobileMenu'
import { Navbar } from './Navbar'
import { TRACKED_SECTION_IDS } from './nav'
import { TopBar } from './TopBar'

/**
 * Sticky header: utility top bar + navbar + mobile menu panel. It sticks at top: -topbar-h, so the top bar scrolls
 * away with the page while the navbar stays pinned. The header never changes height, so anchor jumps land in the
 * same place with smooth or instant (reduced-motion) scrolling.
 */
export function Header() {
  // True once the top bar has fully scrolled out of view. 1px shorter than the bar: an edge-adjacent sentinel still
  // counts as intersecting, which would keep the flag off at exactly scrollY = --topbar-h.
  const scrolled = useScrolled('calc(var(--topbar-h) - 1px)')
  const [open, setOpen] = useState(false)
  const active = useActiveSection(TRACKED_SECTION_IDS)
  const burgerRef = useRef<HTMLButtonElement>(null)

  // index.css reads this: --header-h (visible header height) drops to the navbar alone.
  useEffect(() => {
    document.documentElement.toggleAttribute('data-scrolled', scrolled)
  }, [scrolled])

  const close = useCallback(() => setOpen(false), [])

  return (
    <header className="sticky top-[calc(var(--topbar-h)*-1)] z-50">
      <TopBar offscreen={scrolled} />
      <Navbar open={open} onToggle={() => setOpen((o) => !o)} active={active} burgerRef={burgerRef} />
      <MobileMenu open={open} onClose={close} active={active} returnFocusTo={burgerRef} />
    </header>
  )
}
