import type { TKey } from '../../i18n'
import { mailtoHref } from '../../lib/links'

export interface CtaAction {
  id: 'contact' | 'quote'
  label: TKey
  /** mailto subject, used only once site.email is a real address */
  subject: TKey
  variant: 'primary' | 'secondary'
}

export const CTA_ACTIONS = [
  { id: 'contact', label: 'cta.button', subject: 'cta.contactSubject', variant: 'primary' },
  { id: 'quote', label: 'cta.secondary', subject: 'cta.quoteSubject', variant: 'secondary' },
] as const satisfies readonly CtaAction[]

/** Footer contact block: the target while the email is a placeholder. */
export const CONTACT_HASH = '#contact'

/** mailto with a localized subject once site.email is real; #contact while it is a placeholder. */
export function resolveCtaHref(email: string, subject: string): { href: string; mail: boolean } {
  const mail = mailtoHref(email, { subject })
  return mail ? { href: mail, mail: true } : { href: CONTACT_HASH, mail: false }
}
