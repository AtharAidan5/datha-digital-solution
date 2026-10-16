// Single source of truth for contact data. Replace PLACEHOLDER values before launch.
export type SocialId = 'linkedin' | 'instagram' | 'whatsapp'
export interface SocialLink { id: SocialId; label: string; href: string }

export const site = {
  name: 'DATHA Digital Solution',
  phone: '[phone]',
  phoneHref: '',
  email: '[email]',
  hours: { en: 'Mon–Fri, 09:00–17:00 WIB', id: 'Senin–Jumat, 09.00–17.00 WIB' },
  headOffice: { en: '[head office address]', id: '[head office address]' },
  /** Exact Google Maps share URL. Empty = the footer derives a Maps search link from the real address. */
  maps: { headOffice: '' },
  /** Network names are proper nouns (data, not UI copy). WhatsApp takes the number, e.g. '+62 812-3456-7890'. */
  social: [
    { id: 'linkedin', label: 'LinkedIn', href: '[linkedin url]' },
    { id: 'instagram', label: 'Instagram', href: '[instagram url]' },
    { id: 'whatsapp', label: 'WhatsApp', href: '[whatsapp number]' },
  ] satisfies SocialLink[],
  year: new Date().getFullYear(),
}
/** "[...]" or "{{...}}", single- or multi-line (addresses may contain line breaks). */
export const isPlaceholder = (v: string) => /^\s*(\[[\s\S]*\]|\{\{[\s\S]*\}\})\s*$/.test(v)

/** Set true once the final Privacy Policy and Terms text is in src/legal/content.ts and approved. */
export const LEGAL_APPROVED = false
