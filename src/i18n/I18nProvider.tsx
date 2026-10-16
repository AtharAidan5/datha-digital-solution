import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { site } from '../lib/site.config'
import { en } from './en'
import { id } from './id'
import type { Dictionary, Lang, TKey, TVars } from './types'

const STORAGE_KEY = 'datha.lang'
const dictionaries: Record<Lang, Dictionary> = { en, id }

export interface I18nValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: TKey, vars?: TVars) => string
}

export const I18nContext = createContext<I18nValue | null>(null)

const isLang = (v: unknown): v is Lang => v === 'en' || v === 'id'

function detectLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isLang(stored)) return stored
  } catch {
    // storage blocked: fall through to browser language
  }
  if (typeof navigator === 'undefined') return 'en'
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language]
  return langs.some((l) => l?.toLowerCase().startsWith('id')) ? 'id' : 'en'
}

function lookup(dict: Dictionary, key: TKey): string {
  let node: unknown = dict
  for (const part of key.split('.')) node = (node as Record<string, unknown> | undefined)?.[part]
  return typeof node === 'string' ? node : key
}

/** `pageTitle`: sub-page title key; the tab title becomes "<title> — DATHA Digital Solution" (home uses meta.title). */
export function I18nProvider({ children, pageTitle }: { children: ReactNode; pageTitle?: TKey }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  const t = useCallback(
    (key: TKey, vars?: TVars) => {
      const raw = lookup(dictionaries[lang], key)
      if (!vars) return raw
      return raw.replace(/\{\{(\w+)\}\}/g, (m, name: string) => (name in vars ? String(vars[name]) : m))
    },
    [lang],
  )

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // storage blocked: choice lasts for this session only
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = pageTitle ? `${lookup(dictionaries[lang], pageTitle)} — ${site.name}` : dictionaries[lang].meta.title
    // Sub-pages keep the description from their own HTML.
    if (!pageTitle) document.querySelector('meta[name="description"]')?.setAttribute('content', dictionaries[lang].meta.description)
  }, [lang, pageTitle])

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
