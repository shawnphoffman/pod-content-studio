// projectId + dataset have literal fallbacks because this module gets bundled
// into two different runtimes:
//
//  - Next.js (Vercel): env vars are inlined at build time. The literal
//    fallback is unused.
//  - Sanity hosted studio (shawnpod.sanity.studio, built by `sanity deploy`):
//    Vite doesn't inline `process.env.NEXT_PUBLIC_*` in the browser bundle, so
//    these reads return undefined at runtime. The literal fallback is what
//    actually runs there.
//
// Both values are public identifiers (the projectId is in every request URL),
// so they're safe to commit.
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-11'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'uc06juhv'

export const useCdn = false
