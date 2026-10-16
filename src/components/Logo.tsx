import markUrl from '../assets/logo-mark.png'
import { site } from '../lib/site.config'
import { navHref } from './nav'

/**
 * Brand lockup: "D" mark as a 156x132 transparent PNG (3x of the 44px display height, ~10 KB,
 * rasterized from assets/logo-mark.svg which is a 190 KB trace and too heavy to ship),
 * wordmark as live text so it stays white and crisp on the dark header (the traced wordmark is navy).
 * `full`: also show "DIGITAL SOLUTION" below sm (footer).
 */
export function Logo({ className = '', full = false }: { className?: string; full?: boolean }) {
  return (
    <a href={navHref('top')} aria-label={site.name} className={`flex min-h-11 min-w-0 items-center gap-2.5 rounded-sm ${className}`}>
      <img src={markUrl} alt="" width={156} height={132} decoding="async" className="h-9 w-auto md:h-11" />
      <span className="min-w-0 leading-none">
        <span className="block text-h3 font-extrabold tracking-wide text-white">DATHA</span>
        <span className={`mt-1 text-[0.625rem] font-semibold tracking-[0.28em] text-white/60 ${full ? 'block' : 'hidden sm:block'}`}>
          DIGITAL SOLUTION
        </span>
      </span>
    </a>
  )
}
