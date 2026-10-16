import { PlaceholderText } from '../components/ContactLink'
import { ChevronLeftIcon } from '../components/icons'
import { useT } from '../i18n'
import { LEGAL_APPROVED } from '../lib/site.config'
import { LEGAL, LEGAL_TITLE, type LegalPageId } from './content'

const MUTED = 'text-slate-brand/60'

/** Privacy Policy / Terms body. Text lives in ./content.ts per language. */
export function LegalPage({ page }: { page: LegalPageId }) {
  const { t, lang } = useT()
  const doc = LEGAL[page][lang]

  return (
    <article className="bg-white py-section">
      <div className="mx-auto max-w-page px-gutter">
        <div className="max-w-prose">
          <a href="/" className="inline-flex min-h-11 items-center gap-1 rounded-sm font-semibold text-brand-700 hover:text-brand-900">
            <ChevronLeftIcon width={18} height={18} />
            {t('legal.back')}
          </a>

          {!LEGAL_APPROVED && (
            <p className="mt-6">
              <span
                data-placeholder
                className="inline-flex items-center rounded-pill border border-dashed border-slate-brand/40 px-3 py-1 text-small font-semibold text-slate-brand"
              >
                {t('legal.draft')}
              </span>
            </p>
          )}

          <h1 className="mt-6 text-h2 font-extrabold tracking-tight text-balance text-brand-900">{t(LEGAL_TITLE[page])}</h1>
          <p className="mt-3 text-small text-slate-brand">
            <PlaceholderText value={doc.updated} placeholderClassName={MUTED}>
              {t('legal.updated', { date: doc.updated })}
            </PlaceholderText>
          </p>

          <div className="mt-10 grid gap-8 text-slate-brand">
            {doc.sections.map((s, i) => (
              <section key={i}>
                {s.heading && <h2 className="text-h3 font-bold text-balance text-brand-900">{s.heading}</h2>}
                {s.body.map((para, j) => (
                  <p key={j} className={`${s.heading || j > 0 ? 'mt-3' : ''} text-pretty`}>
                    <PlaceholderText value={para} placeholderClassName={MUTED}>
                      {para}
                    </PlaceholderText>
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
