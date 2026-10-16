/** `inert` attribute value for React 18: present (empty string) when `cond`, absent otherwise. */
export const inertWhen = (cond: boolean): '' | undefined => (cond ? '' : undefined)

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
