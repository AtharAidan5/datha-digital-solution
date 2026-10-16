import { ART_COLOR, Pixels } from '../art/Pixels'

export type ArtKind = 'rocket' | 'target' | 'team' | 'support'

const { blue: BLUE, cyan: CYAN, navy: NAVY } = ART_COLOR

const ART: Record<ArtKind, () => JSX.Element> = {
  rocket: () => (
    <>
      <Pixels
        cells={[
          [40, 200, 14, 0.5],
          [62, 214, 10, 0.4],
          [30, 230, 8, 0.3],
          [250, 40, 16, 0.6],
          [276, 58, 10, 0.4],
          [236, 70, 8, 0.3],
        ]}
      />
      <path d="M160 36c38 28 58 72 58 124l-58 46-58-46c0-52 20-96 58-124Z" fill={BLUE} />
      <path d="M160 36c-16 32-24 72-24 124l24 46 24-46c0-52-8-92-24-124Z" fill={CYAN} opacity={0.9} />
      <circle cx="160" cy="128" r="18" fill={NAVY} />
      <circle cx="160" cy="128" r="10" fill="white" opacity={0.9} />
      <path d="M102 160l-30 40 30-6Zm116 0l30 40-30-6Z" fill={BLUE} opacity={0.8} />
      <path d="M146 206h28l-14 40Z" fill={CYAN} />
    </>
  ),
  target: () => (
    <>
      <Pixels
        cells={[
          [34, 44, 14, 0.5],
          [54, 30, 8, 0.3],
          [270, 210, 16, 0.6],
          [252, 232, 8, 0.4],
        ]}
      />
      <circle cx="160" cy="130" r="96" fill="none" stroke={BLUE} strokeWidth="14" opacity={0.6} />
      <circle cx="160" cy="130" r="64" fill="none" stroke={CYAN} strokeWidth="14" opacity={0.8} />
      <circle cx="160" cy="130" r="32" fill="none" stroke="white" strokeWidth="14" opacity={0.9} />
      <circle cx="160" cy="130" r="10" fill={CYAN} />
      <path d="M236 54l40-40v26h26l-40 40h-26Z" fill="white" opacity={0.9} />
      <path d="M160 130l78-78" stroke="white" strokeWidth="6" strokeLinecap="round" />
    </>
  ),
  team: () => (
    <>
      <Pixels
        cells={[
          [24, 40, 12, 0.4],
          [280, 36, 14, 0.5],
          [296, 58, 8, 0.3],
          [40, 220, 10, 0.3],
        ]}
      />
      <g opacity={0.75}>
        <circle cx="84" cy="104" r="30" fill={BLUE} />
        <path d="M30 210c0-36 24-58 54-58s54 22 54 58Z" fill={BLUE} />
      </g>
      <g opacity={0.75}>
        <circle cx="236" cy="104" r="30" fill={BLUE} />
        <path d="M182 210c0-36 24-58 54-58s54 22 54 58Z" fill={BLUE} />
      </g>
      <circle cx="160" cy="84" r="38" fill={CYAN} />
      <path d="M92 222c0-46 30-74 68-74s68 28 68 74Z" fill={CYAN} />
      <circle cx="160" cy="84" r="38" fill="white" opacity={0.25} />
    </>
  ),
  support: () => (
    <>
      <Pixels
        cells={[
          [28, 60, 14, 0.5],
          [48, 42, 8, 0.3],
          [262, 206, 16, 0.6],
          [286, 190, 8, 0.4],
        ]}
      />
      <path d="M72 150v-20c0-50 40-88 88-88s88 38 88 88v20" fill="none" stroke={BLUE} strokeWidth="16" strokeLinecap="round" />
      <rect x="56" y="130" width="40" height="64" rx="14" fill={CYAN} />
      <rect x="224" y="130" width="40" height="64" rx="14" fill={CYAN} />
      <path d="M244 194c0 30-24 44-60 44" fill="none" stroke={BLUE} strokeWidth="12" strokeLinecap="round" />
      <rect x="160" y="226" width="40" height="24" rx="12" fill="white" opacity={0.9} />
      {/* Check mark (not "24/7": support runs on business hours). */}
      <circle cx="160" cy="142" r="30" fill="white" opacity={0.95} />
      <path d="M146 142l10 10 20-22" fill="none" stroke={NAVY} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
}

export function SlideArt({ kind, className = '' }: { kind: ArtKind; className?: string }) {
  const Art = ART[kind]
  return (
    <svg viewBox="0 0 320 260" className={className} aria-hidden="true" focusable="false">
      <Art />
    </svg>
  )
}
