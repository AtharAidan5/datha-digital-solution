import type { TKey } from '../../i18n'
import { CodeIcon, GraduationCapIcon, LightbulbIcon, SmartphoneIcon, WorkflowIcon, WrenchIcon, type IconComponent } from '../icons'

/**
 * Target of every card's "Learn more" link. null = static cards: no link, no hover lift, no tab stops.
 * Static for now (owner decision); set '#contact' or per-service URLs later.
 */
export const SERVICE_HREF: string | null = null

export const SERVICES = [
  { id: 's1', icon: CodeIcon, title: 'services.s1.title', text: 'services.s1.text' },
  { id: 's2', icon: WrenchIcon, title: 'services.s2.title', text: 'services.s2.text' },
  { id: 's3', icon: SmartphoneIcon, title: 'services.s3.title', text: 'services.s3.text' },
  { id: 's4', icon: LightbulbIcon, title: 'services.s4.title', text: 'services.s4.text' },
  { id: 's5', icon: WorkflowIcon, title: 'services.s5.title', text: 'services.s5.text' },
  { id: 's6', icon: GraduationCapIcon, title: 'services.s6.title', text: 'services.s6.text' },
] as const satisfies readonly { id: string; icon: IconComponent; title: TKey; text: TKey }[]

export type Service = (typeof SERVICES)[number]
