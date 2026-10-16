import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Layout } from './components/Layout'
import { I18nProvider } from './i18n'
import { LEGAL_TITLE, type LegalPageId } from './legal/content'
import { LegalPage } from './legal/LegalPage'

// Entry for /privacy/ and /terms/ (Vite multi-page). The page id comes from <body data-page="…">.
const page: LegalPageId = document.body.dataset.page === 'terms' ? 'terms' : 'privacy'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider pageTitle={LEGAL_TITLE[page]}>
      <Layout>
        <LegalPage page={page} />
      </Layout>
    </I18nProvider>
  </StrictMode>,
)
