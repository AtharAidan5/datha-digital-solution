import { useEffect, useState } from 'react'

/**
 * Id of the section (from `ids`) currently nearest the top of the viewport, below the sticky header.
 * The tracked area is the element with `data-section="<id>"` if there is one, else `#<id>`: the jump target can be
 * a part of the area (the footer is tracked as "contact", its contact column is the #contact target).
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const sections = ids
      .map((id) => ({ id, el: document.querySelector<HTMLElement>(`[data-section="${id}"]`) ?? document.getElementById(id) }))
      .filter((s): s is { id: string; el: HTMLElement } => s.el !== null)
    if (sections.length === 0) return
    const idOf = new Map(sections.map((s) => [s.el, s.id]))

    const visible = new Map<string, number>()
    const last = sections[sections.length - 1]
    let atEnd = false
    // First section (in document order) in the band. At the page bottom the last one wins (the footer is short
    // and may never reach the band on tall screens); with nothing in the band (e.g. the CTA panel) keep the previous.
    const pick = () => {
      const first = sections.find((s) => visible.has(s.id))
      setActive((prev) => (atEnd ? last.id : first ? first.id : prev))
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = idOf.get(e.target as HTMLElement)
          if (id === undefined) continue
          if (e.isIntersecting) visible.set(id, e.intersectionRatio)
          else visible.delete(id)
        }
        pick()
      },
      // Top margin offsets the sticky header; bottom margin biases toward the upper part of the viewport.
      { rootMargin: '-120px 0px -55% 0px', threshold: [0, 0.1] },
    )
    sections.forEach((s) => io.observe(s.el))

    const end = document.createElement('div')
    end.setAttribute('aria-hidden', 'true')
    end.style.cssText = 'height:1px;pointer-events:none;'
    document.body.append(end)
    const endIo = new IntersectionObserver(([e]) => {
      atEnd = e.isIntersecting
      pick()
    })
    endIo.observe(end)

    return () => {
      io.disconnect()
      endIo.disconnect()
      end.remove()
    }
  }, [ids])

  return active
}
