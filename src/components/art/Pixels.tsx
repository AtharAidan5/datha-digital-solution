/** Token colours for decorative SVG art (CSS vars, never hex). */
export const ART_COLOR = {
  blue: 'var(--color-brand-500)',
  cyan: 'var(--color-accent-300)',
  navy: 'var(--color-brand-900)',
} as const

export type PixelCell = readonly [x: number, y: number, size: number, opacity: number]

/** Pixel-square cluster echoing the logo mark: every third cyan, the rest brand blue. */
export function Pixels({ cells }: { cells: readonly PixelCell[] }) {
  return (
    <g>
      {cells.map(([x, y, s, o], i) => (
        <rect key={i} x={x} y={y} width={s} height={s} rx={s * 0.22} fill={i % 3 === 0 ? ART_COLOR.cyan : ART_COLOR.blue} opacity={o} />
      ))}
    </g>
  )
}

const CLUSTER: readonly PixelCell[] = [
  [52, 4, 22, 0.95],
  [78, 30, 14, 0.7],
  [56, 34, 10, 0.5],
  [30, 14, 12, 0.45],
  [84, 4, 8, 0.4],
  [34, 40, 6, 0.3],
]

/** Standalone decorative cluster (aria-hidden). */
export function PixelCluster({
  cells = CLUSTER,
  viewBox = '0 0 96 64',
  className = '',
}: {
  cells?: readonly PixelCell[]
  viewBox?: string
  className?: string
}) {
  return (
    <svg viewBox={viewBox} className={className} aria-hidden="true" focusable="false">
      <Pixels cells={cells} />
    </svg>
  )
}
