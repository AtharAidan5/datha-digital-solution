import type { Lang, TKey } from '../../i18n'
import { site } from '../../lib/site.config'

export interface Phone { value: string; override?: string }

export interface Location {
  id: 'head'
  titleKey: TKey
  addressKey: TKey
  address: Record<Lang, string>
  phones: readonly Phone[]
  email: string
  hours?: Record<Lang, string>
  mapUrl: string
}

/** One office for now (no workshop yet). Add entries here; they stack in the footer's contact column. */
export const LOCATIONS: readonly Location[] = [
  {
    id: 'head',
    titleKey: 'footer.headTitle',
    addressKey: 'footer.headAddress',
    address: site.headOffice,
    phones: [{ value: site.phone, override: site.phoneHref }],
    email: site.email,
    hours: site.hours,
    mapUrl: site.maps.headOffice,
  },
]
