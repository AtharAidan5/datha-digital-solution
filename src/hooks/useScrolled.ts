import { useEffect, useState } from 'react'

/**
 * True once the page has scrolled past `offset` px. Uses an IntersectionObserver on a
 * sentinel element instead of a scroll listener, so it costs nothing while idle.
 */
export function useScrolled(offset = 24): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const sentinel = document.createElement('div')
    sentinel.setAttribute('aria-hidden', 'true')
    sentinel.style.cssText = `position:absolute;top:0;left:0;width:1px;height:${offset}px;pointer-events:none;`
    document.body.prepend(sentinel)

    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), { threshold: 0 })
    io.observe(sentinel)
    return () => {
      io.disconnect()
      sentinel.remove()
    }
  }, [offset])

  return scrolled
}
