import { isPlaceholder, type SocialLink } from './site.config'

// The only place that builds tel:, mailto:, map and external hrefs. null = value is still a placeholder.

/** Filled in: not empty and not a "[placeholder]". isPlaceholder('') is false, so guard empty too. */
export const hasValue = (v: string): boolean => {
  const s = v.trim()
  return s !== '' && !isPlaceholder(s)
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** mailto: URL, or null while empty/placeholder/malformed. encodeURIComponent (RFC 6068), CRLF body breaks. */
export function mailtoHref(email: string, opts: { subject?: string; body?: string } = {}): string | null {
  const addr = email.trim()
  if (!hasValue(addr) || !EMAIL.test(addr)) return null
  const q = [
    opts.subject && `subject=${encodeURIComponent(opts.subject)}`,
    opts.body && `body=${encodeURIComponent(opts.body.replace(/\r?\n/g, '\r\n'))}`,
  ]
    .filter(Boolean)
    .join('&')
  return `mailto:${addr}${q ? `?${q}` : ''}`
}

/** tel: URL (override wins, e.g. site.phoneHref), or null while the number is a placeholder. */
export function telHref(phone: string, override = ''): string | null {
  if (!hasValue(phone)) return null
  if (override) return override
  const digits = phone.replace(/[^\d+]/g, '')
  return digits ? `tel:${digits}` : null
}

/** https://wa.me/<digits>. Local Indonesian numbers (0812…) become international (62812…). */
export function whatsappHref(number: string): string | null {
  if (!hasValue(number)) return null
  const digits = number.replace(/\D/g, '')
  if (!digits) return null
  return `https://wa.me/${digits.startsWith('0') ? `62${digits.slice(1)}` : digits}`
}

/** Any configured URL (profile, page), or null while placeholder. */
export const linkHref = (url: string): string | null => (hasValue(url) ? url.trim() : null)

export const socialHref = (s: SocialLink): string | null => (s.id === 'whatsapp' ? whatsappHref(s.href) : linkHref(s.href))

/** Exact map URL if configured, else a Google Maps search for a real address, else null. */
export function mapHref(address: string, override = ''): string | null {
  if (hasValue(override)) return override.trim()
  if (!hasValue(address)) return null
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.replace(/\s*\n\s*/g, ', '))}`
}
