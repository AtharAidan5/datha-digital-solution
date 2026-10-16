import { useContext } from 'react'
import { I18nContext, type I18nValue } from './I18nProvider'

export function useT(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useT must be used inside <I18nProvider>')
  return ctx
}
