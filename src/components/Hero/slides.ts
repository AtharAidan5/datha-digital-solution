import type { TKey } from '../../i18n'
import type { ArtKind } from './SlideArt'

export const SLIDES = [
  { id: 's1', eyebrow: 'hero.s1.eyebrow', title: 'hero.s1.title', text: 'hero.s1.text', art: 'rocket' },
  { id: 's2', eyebrow: 'hero.s2.eyebrow', title: 'hero.s2.title', text: 'hero.s2.text', art: 'target' },
  { id: 's3', eyebrow: 'hero.s3.eyebrow', title: 'hero.s3.title', text: 'hero.s3.text', art: 'team' },
  { id: 's4', eyebrow: 'hero.s4.eyebrow', title: 'hero.s4.title', text: 'hero.s4.text', art: 'support' },
] as const satisfies readonly { id: string; eyebrow: TKey; title: TKey; text: TKey; art: ArtKind }[]

export const HERO_INTERVAL_MS = 6000
