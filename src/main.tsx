import { StrictMode } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { I18nProvider } from './i18n'
import { smoothScrollAfterLoad } from './lib/scroll'

const root = createRoot(document.getElementById('root')!)
// Synchronous first render: the sections must exist before the browser runs its own jump to /#section, its scroll
// restoration on reload / back, and its Tab starting point. createRoot alone renders a task later, too late for them.
flushSync(() =>
  root.render(
    <StrictMode>
      <I18nProvider>
        <App />
      </I18nProvider>
    </StrictMode>,
  ),
)
smoothScrollAfterLoad()
