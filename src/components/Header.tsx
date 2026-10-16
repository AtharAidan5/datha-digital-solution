import { useCallback, useEffect, useRef, useState } from 'react'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrolled } from '../hooks/useScrolled'
import { MobileMenu } from './MobileMenu'
import { Navbar } from './Navbar'
import { TRACKED_SECTION_IDS } from './nav'
import { TopBar } from './TopBar'

/** Sticky header: utility top bar (collapses on scroll) + navbar + mobile menu panel. */
export function Header() {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  const active = useActiveSection(TRACKED_SECTION_IDS)
  const burgerRef = useRef<HTMLButtonElement>(null)

  // index.css reads this to shrink --header-h together with the collapsed top bar.
  useEffect(() => {
    document.documentElement.toggleAttribute('data-scrolled', scrolled)
  }, [scrolled])

  const close = useCallback(() => setOpen(false), [])

  return (
    <header className="sticky top-0 z-50">
      <TopBar collapsed={scrolled} />
      <Navbar open={open} onToggle={() => setOpen((o) => !o)} active={active} burgerRef={burgerRef} />
      <MobileMenu open={open} onClose={close} active={active} returnFocusTo={burgerRef} />
    </header>
  )
}
