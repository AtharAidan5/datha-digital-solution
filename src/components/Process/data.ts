import type { TKey } from '../../i18n'
import { CodeIcon, LifeBuoyIcon, PenToolIcon, SearchIcon, type IconComponent } from '../icons'

/** Delivery steps, in order. Copy lives in en.ts / id.ts under `process`. */
export const PROCESS_STEPS = [
  { id: 's1', icon: SearchIcon, title: 'process.s1.title', text: 'process.s1.text' },
  { id: 's2', icon: PenToolIcon, title: 'process.s2.title', text: 'process.s2.text' },
  { id: 's3', icon: CodeIcon, title: 'process.s3.title', text: 'process.s3.text' },
  { id: 's4', icon: LifeBuoyIcon, title: 'process.s4.title', text: 'process.s4.text' },
] as const satisfies readonly { id: string; icon: IconComponent; title: TKey; text: TKey }[]

export type ProcessStep = (typeof PROCESS_STEPS)[number]
