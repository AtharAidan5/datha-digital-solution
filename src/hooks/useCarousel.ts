import { useCallback, useEffect, useRef, useState } from 'react'

interface Options {
  /** Autoplay delay per slide in ms. */
  interval?: number
}

export interface Carousel {
  index: number
  /** True while autoplay is suspended (hover, focus, hidden tab, reduced motion, or after a manual change). */
  paused: boolean
  /** Hover/focus pause: temporary, autoplay resumes when released. */
  setHovered: (v: boolean) => void
  go: (i: number) => void
  next: () => void
  prev: () => void
}

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Slide index + autoplay. A manual change (go/next/prev) stops autoplay for good: users who
 * pick a slide should not have it taken away. Hover/focus only pause it.
 */
export function useCarousel(count: number, { interval = 6000 }: Options = {}): Carousel {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [hidden, setHidden] = useState(() => typeof document !== 'undefined' && document.hidden)
  const [manual, setManual] = useState(() => reducedMotion())
  const timer = useRef<number | undefined>(undefined)

  const paused = hovered || hidden || manual

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  useEffect(() => {
    if (paused || count < 2) return
    timer.current = window.setTimeout(() => setIndex((i) => (i + 1) % count), interval)
    return () => window.clearTimeout(timer.current)
  }, [index, paused, count, interval])

  const go = useCallback(
    (i: number) => {
      setManual(true)
      setIndex(((i % count) + count) % count)
    },
    [count],
  )
  const next = useCallback(() => go(index + 1), [go, index])
  const prev = useCallback(() => go(index - 1), [go, index])

  return { index, paused, setHovered, go, next, prev }
}
