import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'
import { prefersReducedMotion } from '../lib/a11y'

// One observer for the whole page; elements are unobserved after their first reveal.
const pending = new WeakMap<Element, () => void>()
let observer: IntersectionObserver | undefined

function shared(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries, io) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        pending.get(e.target)?.()
        pending.delete(e.target)
        io.unobserve(e.target)
      }
    },
    // threshold 0 (not a ratio): a ratio is never reached by elements taller than the viewport.
    { rootMargin: '0px 0px -10% 0px', threshold: 0 },
  )
  return observer
}

const skip = () => typeof IntersectionObserver === 'undefined' || prefersReducedMotion()

export interface Reveal<T extends HTMLElement> {
  ref: RefObject<T>
  shown: boolean
  /** 'reveal' until first in view (or focused), then 'reveal in'. Rules live in index.css. */
  className: 'reveal' | 'reveal in'
}

/**
 * One-shot fade/slide-in on scroll. Attach `ref` to an always-rendered element.
 * RULES: `.reveal` is unlayered CSS and beats Tailwind utilities, so never put transition-, duration-,
 * delay- or opacity- utilities on the same element. Stagger with revealDelay() or a
 * `[--reveal-delay:Xms]` class. Never put it on a focusable element (focusin reveals the container instead).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(): Reveal<T> {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(skip) // reduced motion / no IO: visible from the first paint
  useEffect(() => {
    const el = ref.current
    if (shown || !el) return
    const show = () => setShown(true)
    const io = shared()
    pending.set(el, show)
    io.observe(el)
    el.addEventListener('focusin', show) // a focus-scroll can stop inside the -10% band
    return () => {
      io.unobserve(el)
      pending.delete(el)
      el.removeEventListener('focusin', show)
    }
  }, [shown])
  return { ref, shown, className: shown ? 'reveal in' : 'reveal' }
}

/** Inline stagger for a `.reveal` element. */
export const revealDelay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties
