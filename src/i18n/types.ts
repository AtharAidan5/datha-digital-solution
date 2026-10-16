import type { en } from './en'

export type Lang = 'en' | 'id'
export const LANGS: readonly Lang[] = ['en', 'id']

/** Key shape is derived from en.ts; id.ts must match it. */
export type Dictionary = typeof en

type Path<T> = {
  [K in keyof T & string]: T[K] extends string ? K : `${K}.${Path<T[K]>}`
}[keyof T & string]

export type TKey = Path<Dictionary>
export type TVars = Record<string, string | number>
