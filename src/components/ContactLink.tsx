import type { ReactNode } from 'react'
import { isPlaceholder } from '../lib/site.config'

/** Muted + dashed underline on dark backgrounds: label-type placeholders (map, social, legal links). */
export const FLAG_LABEL = 'text-white/50 underline decoration-dashed decoration-white/40 underline-offset-4'

interface Props {
  /** From lib/links.ts. null = placeholder: flagged, non-focusable span, never a tel:/mailto:/https: link. */
  href: string | null
  external?: boolean
  label?: string
  labelledBy?: string
  describedBy?: string
  /** Layout only, applied in both states. Keep colours in the two props below: two text-* classes race. */
  className?: string
  linkClassName?: string
  placeholderClassName?: string
  children: ReactNode
}

/** The single placeholder gate for contact values and outbound links. */
export function ContactLink({
  href,
  external = false,
  label,
  labelledBy,
  describedBy,
  className = '',
  linkClassName = '',
  placeholderClassName = 'text-white/50',
  children,
}: Props) {
  if (!href) {
    return (
      <span data-placeholder className={`${className} ${placeholderClassName}`}>
        {children}
      </span>
    )
  }
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={label}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      className={`${className} ${linkClassName}`}
    >
      {children}
    </a>
  )
}

/** Plain text value (address, hours, legal copy): muted + data-placeholder while it is a placeholder. */
export function PlaceholderText({
  value,
  className = '',
  placeholderClassName = 'text-white/50',
  children,
}: {
  value: string
  className?: string
  placeholderClassName?: string
  children: ReactNode
}) {
  const flagged = isPlaceholder(value)
  return (
    <span data-placeholder={flagged || undefined} className={`${className} ${flagged ? placeholderClassName : ''}`}>
      {children}
    </span>
  )
}
