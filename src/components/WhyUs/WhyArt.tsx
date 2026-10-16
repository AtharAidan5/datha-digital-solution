import { ART_COLOR as C, Pixels } from '../art/Pixels'

const W = 480
const H = 440
const STEP = 48
const GRID = [
  ...Array.from({ length: W / STEP + 1 }, (_, i) => `M${i * STEP} 0V${H}`),
  ...Array.from({ length: Math.floor(H / STEP) + 1 }, (_, i) => `M0 ${i * STEP}H${W}`),
].join('')
const plate = (cy: number) => `M240 ${cy - 56}L352 ${cy}L240 ${cy + 56}L128 ${cy}Z`
const side = (cy: number) => `M128 ${cy}v14l112 56 112-56v-14L240 ${cy + 56}Z`

/** Decorative: stack (p1), iteration loop (p2), linked nodes (p3), shield (p4), logo pixels. No text, no motion. */
export function WhyArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} aria-hidden="true" focusable="false">
      <path d={GRID} fill="none" stroke="white" strokeOpacity={0.06} vectorEffect="non-scaling-stroke" />
      {/* iteration loop, back half */}
      <path d="M44 245a196 92 0 0 1 392 0" fill="none" stroke={C.cyan} strokeWidth={3} strokeDasharray="2 10" strokeLinecap="round" opacity={0.4} />
      {/* modern stack: three platforms */}
      {[300, 240, 180].map((cy, i) => (
        <g key={cy}>
          <path d={side(cy)} fill={C.blue} opacity={0.45} />
          <path d={plate(cy)} fill={i === 2 ? C.cyan : C.blue} fillOpacity={[0.35, 0.7, 1][i]} stroke={C.blue} strokeWidth={2} />
        </g>
      ))}
      {/* </> glyph on the top platform */}
      <path d="M214 170l-16 10 16 10M266 170l16 10-16 10M246 164l-12 32" fill="none" stroke={C.navy} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      {/* iteration loop, front half + arrowhead */}
      <path d="M436 245a196 92 0 0 1-392 0" fill="none" stroke={C.cyan} strokeWidth={4} strokeLinecap="round" opacity={0.9} />
      <path d="M44 226l10 16H34Z" fill={C.cyan} />
      {/* secure by default */}
      <path d="M126 126L170 160" stroke={C.cyan} strokeOpacity={0.5} strokeWidth={2} strokeDasharray="6 8" />
      <path d="M96 52l40 14v30c0 28-18 46-40 56-22-10-40-28-40-56V66Z" fill={C.blue} />
      <path d="M78 100l12 12 24-26" fill="none" stroke="white" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
      {/* partner: linked nodes */}
      <path d="M362 98L290 149" stroke={C.cyan} strokeOpacity={0.5} strokeWidth={2} strokeDasharray="6 8" />
      <path d="M380 86L430 140" stroke="white" strokeOpacity={0.5} strokeWidth={3} />
      <circle cx={380} cy={86} r={20} fill={C.cyan} />
      <circle cx={430} cy={140} r={14} fill="white" opacity={0.9} />
      <Pixels
        cells={[
          [36, 360, 16, 0.5],
          [60, 380, 10, 0.4],
          [28, 398, 8, 0.3],
          [412, 366, 14, 0.55],
          [436, 348, 8, 0.35],
          [226, 26, 12, 0.5],
          [246, 14, 8, 0.35],
        ]}
      />
    </svg>
  )
}
