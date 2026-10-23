import { site } from '../lib/site.config'
import { navHref } from './nav'

/**
 * "D" mark, white for the dark header and footer: a clean vector redraw of the traced brand mark
 * (assets/logo-mark.svg, viewBox kept), so it stays crisp at any size and never blends into the navy.
 * Tones follow the colour logo: outer band of the bowl full white, inner band and stem dimmer, pixels graded.
 */
function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="395 30 715 605" width={52} height={44} className={className} fill="currentColor" aria-hidden="true" focusable="false">
      <rect x="456" y="35" width="53" height="53" rx="9" opacity={0.4} />
      <rect x="521" y="72" width="103" height="103" rx="12" opacity={0.75} />
      <rect x="398" y="152" width="53" height="53" rx="9" opacity={0.55} />
      <rect x="474" y="203" width="102" height="102" rx="12" opacity={0.95} />
      <rect x="418" y="310" width="50" height="50" rx="9" opacity={0.85} />
      {/* Stem, then the foot: two parallel diagonal cuts, as in the colour mark. */}
      <path d="M521 312H685V456L521 594Z" opacity={0.8} />
      <path d="M521 627L690 476H858L691 627Z" opacity={0.92} />
      {/* Bowl (inner band tone), then its outer band on top at full white. */}
      <path
        d="M666 78H844C973.5 78 1103 216.5 1103 355C1103 491 984.5 627 866 627H706L896 450C912 425 921 390 920 355C919 300 870 252 811 249H666Z"
        opacity={0.8}
      />
      <path d="M705 78H844C973.5 78 1103 216.5 1103 355C1103 491 984.5 627 866 627C950 612 1066 540 1066 462C1067 420 1035 375 994 337Z" />
    </svg>
  )
}

/**
 * Brand lockup: vector mark + wordmark as live text (both white on the dark header and footer).
 * `full`: also show "DIGITAL SOLUTION" below sm (footer).
 */
export function Logo({ className = '', full = false }: { className?: string; full?: boolean }) {
  return (
    <a href={navHref('top')} aria-label={site.name} className={`flex min-h-11 min-w-0 items-center gap-2.5 rounded-sm ${className}`}>
      {/* Contrast themes force a light Canvas behind it, and print drops the navy: the white mark needs a dark ink there. */}
      <LogoMark className="h-9 w-auto shrink-0 text-white md:h-11 print:text-brand-900 forced-colors:text-[CanvasText]" />
      <span className="min-w-0 leading-none">
        <span className="block text-h3 font-extrabold tracking-wide text-white">DATHA</span>
        <span className={`mt-1 text-[0.625rem] font-semibold tracking-[0.28em] text-white/60 ${full ? 'block' : 'hidden sm:block'}`}>
          DIGITAL SOLUTION
        </span>
      </span>
    </a>
  )
}
