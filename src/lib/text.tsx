import type { ReactNode } from 'react'

const COMPOUND = /(\S*\w-\w\S*)/

/**
 * Keeps hyphenated compounds ("Next-Gen", "tech-stack", "end-to-end") on one line in headings,
 * so balanced wrapping never splits them at the hyphen. Other words wrap normally.
 */
export function keepCompounds(text: string): ReactNode {
  const parts = text.split(COMPOUND)
  if (parts.length === 1) return text
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  )
}
