/**
 * Turns on CSS smooth scrolling (`html[data-smooth-scroll]` in index.css) only once the page has loaded AND the
 * visitor has pressed a key or pointer. Every scroll the browser makes by itself (jump to /#section on arrival,
 * restoring the position on reload or Back / Forward, which can run after `load`) must stay instant: smoothed, it
 * visibly glides, or ends at the #section instead of the reader's position. A click before `load` stays instant too:
 * a smooth scroll in flight while web fonts swap in lands short.
 */
export function smoothScrollAfterLoad() {
  let loaded = document.readyState === 'complete'
  let interacted = false
  const enable = () => {
    if (loaded && interacted) document.documentElement.setAttribute('data-smooth-scroll', '')
  }
  if (!loaded) {
    addEventListener(
      'load',
      () => {
        loaded = true
        enable()
      },
      { once: true },
    )
  }
  // Capture phase: runs before the click / key handler that starts an in-page jump.
  const onInput = () => {
    interacted = true
    enable()
  }
  addEventListener('pointerdown', onInput, { once: true, capture: true })
  addEventListener('keydown', onInput, { once: true, capture: true })
}

const SCROLL_KEY = 'scrollY'

/**
 * Puts the reader back where they were on reload and on Back / Forward (when the page is not served from bfcache).
 * Safari and Firefox restore the position, then jump to the #section in the URL once the page has loaded, so the
 * reader lands on the section instead. Safari also restores too early for this client-rendered page. So: the position
 * is kept in this history entry's state, re-applied right after the synchronous first render (before the first
 * paint), and the #fragment is hidden from the URL until load is over. Call right after the first render.
 */
export function restoreScrollOnReturn() {
  const save = () => {
    try {
      history.replaceState({ ...(history.state as object | null), [SCROLL_KEY]: scrollY }, '')
    } catch {
      // Safari throttles history writes; the next save catches up.
    }
  }
  // Saved once scrolling stops, and on any click or key press (before a link navigates or Ctrl/Cmd+R reloads). Not on
  // pagehide: Firefox drops history writes made then, and Safari loses the entry's state altogether.
  let timer: number | undefined
  addEventListener(
    'scroll',
    () => {
      clearTimeout(timer)
      timer = window.setTimeout(save, 150)
    },
    { passive: true },
  )
  addEventListener('click', save, { capture: true })
  addEventListener('keydown', save, { capture: true })

  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
  if (nav?.type !== 'reload' && nav?.type !== 'back_forward') return
  // Take the #fragment's target out of reach until load is over, so the engines' load-time jump finds nothing.
  let id = location.hash.slice(1)
  try {
    id = decodeURIComponent(id)
  } catch {
    // Malformed escape: matches no id anyway.
  }
  const target = id ? document.getElementById(id) : null
  if (target) {
    target.removeAttribute('id')
    addEventListener('load', () => setTimeout(() => (target.id = id)), { once: true })
  }
  const saved = (history.state as Record<string, unknown> | null)?.[SCROLL_KEY]
  if (typeof saved === 'number') scrollTo({ top: saved, behavior: 'instant' })
}
