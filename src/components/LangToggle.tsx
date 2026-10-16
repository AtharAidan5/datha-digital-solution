import { useRef, useState, type KeyboardEvent } from 'react'
import { LANGS, useT, type Lang } from '../i18n'

interface Props {
  variant?: 'onDark' | 'onLight'
  className?: string
}

const tone = {
  onDark: { track: 'bg-white/10 on-dark', idle: 'text-white/70 hover:text-white' },
  onLight: { track: 'bg-brand-900/10', idle: 'text-brand-900/70 hover:text-brand-900' },
}

/** EN | ID pill. Segments have fixed width so switching language never shifts the layout. */
export function LangToggle({ variant = 'onDark', className = '' }: Props) {
  const { lang, setLang, t } = useT()
  const [announce, setAnnounce] = useState(false)
  const refs = useRef<Partial<Record<Lang, HTMLButtonElement | null>>>({})
  const styles = tone[variant]

  const select = (next: Lang) => {
    if (next === lang) return
    setLang(next)
    setAnnounce(true)
    refs.current[next]?.focus()
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return
    e.preventDefault()
    const i = LANGS.indexOf(lang)
    const step = e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 1
    select(LANGS[(i + step + LANGS.length) % LANGS.length])
  }

  return (
    <div
      role="radiogroup"
      aria-label={t('common.langLabel')}
      onKeyDown={onKeyDown}
      // Two toggles can be on screen (header + footer): clear this one's announcement once focus leaves it.
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setAnnounce(false)
      }}
      className={`relative inline-grid h-8 w-24 grid-cols-2 items-center rounded-pill p-0.5 text-small font-semibold ${styles.track} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-y-0.5 left-0.5 w-[calc(50%-0.125rem)] rounded-pill bg-brand-600 shadow-card transition-transform duration-200 motion-reduce:transition-none ${
          lang === 'id' ? 'translate-x-full' : 'translate-x-0'
        }`}
      />
      {LANGS.map((code) => {
        const active = code === lang
        return (
          <button
            key={code}
            ref={(el) => {
              refs.current[code] = el
            }}
            type="button"
            role="radio"
            aria-checked={active}
            lang={code}
            tabIndex={active ? 0 : -1}
            onClick={() => select(code)}
            className={`relative z-10 h-8 rounded-pill uppercase transition-colors before:absolute before:-inset-y-1.5 before:inset-x-0 before:content-[''] ${
              active ? 'text-white' : styles.idle
            }`}
          >
            {code}
          </button>
        )
      })}
      <span role="status" aria-live="polite" className="sr-only">
        {announce ? t('common.langSwitched') : ''}
      </span>
    </div>
  )
}
