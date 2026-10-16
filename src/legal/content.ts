import type { Lang, TKey } from '../i18n'

export type LegalPageId = 'privacy' | 'terms'

export interface LegalSection {
  /** Optional h2. */
  heading?: string
  /** One string per paragraph. */
  body: readonly string[]
}

export interface LegalDoc {
  /** Shown as "Last updated: {{date}}", e.g. '30 October 2026' / '30 Oktober 2026'. */
  updated: string
  sections: readonly LegalSection[]
}

/** h1 of each page (same keys as the footer links). */
export const LEGAL_TITLE: Record<LegalPageId, TKey> = { privacy: 'footer.privacy', terms: 'footer.terms' }

/**
 * Final wording is supplied by the owner (lawyer-reviewed), EN and ID. Until then each page shows one flagged
 * placeholder. Replace the strings below; no component change is needed. Then set LEGAL_APPROVED in site.config.ts.
 * The text should match how the site works: no forms, no analytics, contact only by email/phone/WhatsApp,
 * localStorage holds only the language choice, Google Fonts (visitor IP reaches Google), Vercel server logs,
 * links to LinkedIn/Instagram/WhatsApp/Google Maps, UU PDP No. 27/2022.
 */
export const LEGAL: Record<LegalPageId, Record<Lang, LegalDoc>> = {
  privacy: {
    en: { updated: '[date]', sections: [{ body: ['[privacy policy text]'] }] },
    id: { updated: '[tanggal]', sections: [{ body: ['[teks kebijakan privasi]'] }] },
  },
  terms: {
    en: { updated: '[date]', sections: [{ body: ['[terms text]'] }] },
    id: { updated: '[tanggal]', sections: [{ body: ['[teks syarat dan ketentuan]'] }] },
  },
}
