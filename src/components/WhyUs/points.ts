import type { TKey } from '../../i18n'

export type WhyIcon = 'stack' | 'iterate' | 'partner' | 'secure'
export interface WhyPointData { id: string; title: TKey; text: TKey; icon: WhyIcon }

export const WHY_POINTS = [
  { id: 'p1', title: 'why.p1.title', text: 'why.p1.text', icon: 'stack' }, // modern tech-stack execution
  { id: 'p2', title: 'why.p2.title', text: 'why.p2.text', icon: 'iterate' }, // adaptive problem solving
  { id: 'p3', title: 'why.p3.title', text: 'why.p3.text', icon: 'partner' }, // partner, not vendor
  { id: 'p4', title: 'why.p4.title', text: 'why.p4.text', icon: 'secure' }, // secure by default
] as const satisfies readonly WhyPointData[]
