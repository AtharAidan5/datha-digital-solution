// One-off: trim the traced full logo down to the "D" mark (transparent, no wordmark).
// Usage: node scripts/build-logo.mjs   (reads public/logo-full.svg, writes src/assets/logo-mark.svg)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'

const SRC = 'public/logo-full.svg'
const OUT = 'src/assets/logo-mark.svg'
const MARK_MAX_Y = 640 // paths starting below this belong to the wordmark/tagline
const VIEWBOX = '395 30 715 605'

const svg = readFileSync(SRC, 'utf8')
const re = /<path d="([^"]*)" fill="(#[0-9a-fA-F]{6})" transform="translate\(([-\d.]+),([-\d.]+)\)"\/>/g

const round = (d) => d.replace(/-?\d+\.\d+/g, (n) => String(Math.round(Number(n) * 10) / 10))

const kept = []
let total = 0
for (const m of svg.matchAll(re)) {
  total++
  const [, d, fill, x, y] = m
  if (Number(x) === 0 && Number(y) === 0) continue // full-canvas background rect
  if (Number(y) >= MARK_MAX_Y) continue
  kept.push(`<path d="${round(d)}" fill="${fill}" transform="translate(${x},${y})"/>`)
}

const out = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEWBOX}" width="715" height="605">\n${kept.join('\n')}\n</svg>\n`
mkdirSync('src/assets', { recursive: true })
writeFileSync(OUT, out)
console.log(`paths: ${total} -> ${kept.length}; ${(out.length / 1024).toFixed(1)} KB`)
