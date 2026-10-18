// Single source of truth for contact data. Replace PLACEHOLDER values before launch.
export type SocialId = 'linkedin' | 'instagram' | 'whatsapp'
export interface SocialLink { id: SocialId; label: string; href: string }

export const site = {
  name: 'DATHA Digital Solution',
  phone: '0823-2180-2323',
  /** International form so the tel: link also works from outside Indonesia. */
  phoneHref: 'tel:+6282321802323',
  email: 'info@dathadigital.com',
  hours: { en: 'Mon–Fri, 09:00–17:00 WIB', id: 'Senin–Jumat, 09.00–17.00 WIB' },
  /** Line breaks render as separate lines in the footer and become ", " in the Maps search link. */
  headOffice: {
    en: 'Jl. Margasatwa Raya 50, RT 001/RW 03\nPondok Labu, Cilandak\nJakarta Selatan',
    id: 'Jl. Margasatwa Raya 50, RT 001/RW 03\nPondok Labu, Cilandak\nJakarta Selatan',
  },
  /** Exact Google Maps share URL. Empty = the footer derives a Maps search link from the real address. */
  maps: { headOffice: '' },
  /** Network names are proper nouns (data, not UI copy). WhatsApp takes the number, e.g. '+62 812-3456-7890'. */
  social: [
    { id: 'linkedin', label: 'LinkedIn', href: '[linkedin url]' },
    { id: 'instagram', label: 'Instagram', href: '[instagram url]' },
    { id: 'whatsapp', label: 'WhatsApp', href: '0823-2180-2323' },
  ] satisfies SocialLink[],
  year: new Date().getFullYear(),
}
/** "[...]" or "{{...}}", single- or multi-line (addresses may contain line breaks). */
export const isPlaceholder = (v: string) => /^\s*(\[[\s\S]*\]|\{\{[\s\S]*\}\})\s*$/.test(v)

/** Set true once the final Privacy Policy and Terms text is in src/legal/content.ts and approved. */
export const LEGAL_APPROVED = false
