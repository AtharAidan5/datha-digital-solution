import 'react'

declare module 'react' {
  interface HTMLAttributes<T> {
    /**
     * React 18 has no native `inert` support: unknown attributes are forwarded as strings and
     * booleans are dropped. Pass '' to enable, undefined to disable (see `inertWhen`).
     */
    inert?: '' | undefined
  }
}
