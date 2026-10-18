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
