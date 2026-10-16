import type { ReactNode } from 'react'
import { useT } from '../i18n'
import { Footer } from './Footer/Footer'
import { Header } from './Header'

/** Page chrome shared by the home page and the legal pages: skip link, sticky header, <main>, footer. */
export function Layout({ children }: { children: ReactNode }) {
  const { t } = useT()
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-pill bg-brand-600 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t('common.skipToContent')}
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  )
}
