import { StrictMode } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Layout } from './components/Layout'
import { I18nProvider } from './i18n'
import { LEGAL_TITLE, type LegalPageId } from './legal/content'
import { LegalPage } from './legal/LegalPage'
import { restoreScrollOnReturn, smoothScrollAfterLoad } from './lib/scroll'

// Entry for /privacy/ and /terms/ (Vite multi-page). The page id comes from <body data-page="…">.
const page: LegalPageId = document.body.dataset.page === 'terms' ? 'terms' : 'privacy'

const root = createRoot(document.getElementById('root')!)
// Synchronous first render, as in main.tsx: scroll restoration on reload / back needs the text to exist.
flushSync(() =>
  root.render(
    <StrictMode>
      <I18nProvider pageTitle={LEGAL_TITLE[page]}>
        <Layout>
          <LegalPage page={page} />
        </Layout>
      </I18nProvider>
    </StrictMode>,
  ),
)
restoreScrollOnReturn()
smoothScrollAfterLoad()
