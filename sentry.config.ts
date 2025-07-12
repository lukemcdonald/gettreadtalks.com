import * as Sentry from '@sentry/gatsby'
import type { AuthUser } from '~/context/auth'

const COMMIT_SHA = process.env.GATSBY_COMMIT_SHA
const IS_PROD = process.env.NODE_ENV === 'production'
const NODE_ENV = process.env.NODE_ENV
const SENTRY_DSN = process.env.SENTRY_DSN

Sentry.init({
  debug: !IS_PROD,
  dsn: IS_PROD ? SENTRY_DSN : undefined,
  environment: NODE_ENV,
  integrations: [Sentry.replayIntegration()],
  release: IS_PROD ? COMMIT_SHA : undefined,
  replaysOnErrorSampleRate: IS_PROD ? 1.0 : 0,
  replaysSessionSampleRate: IS_PROD ? 0.1 : 0,
  tracesSampleRate: IS_PROD ? 0.1 : 0,
})

/**
 * Set the user context for Sentry.
 *
 * @param user - The user object.
 */
export function setSentryUser(user: AuthUser) {
  if (!user) {
    Sentry.setUser(null)
    return
  }

  const { displayName, email, uid } = user

  Sentry.setUser({
    id: uid,
    email: email ?? undefined,
    username: displayName ?? undefined,
  })
}
