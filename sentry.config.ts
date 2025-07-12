import * as Sentry from '@sentry/gatsby'
import type { AuthUser } from '~/context/auth'

const COMMIT_SHA = process.env.GATSBY_COMMIT_SHA
const IS_PROD = process.env.NODE_ENV === 'production'
const NODE_ENV = process.env.NODE_ENV
const SENTRY_DSN = process.env.GATSBY_SENTRY_DSN
console.log('GATSBY_SENTRY_DSN:', process.env.GATSBY_SENTRY_DSN)
console.log('SENTRY_DSN:', SENTRY_DSN)

Sentry.init({
  debug: !IS_PROD,
  dsn: SENTRY_DSN,
  environment: NODE_ENV,
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  release: IS_PROD ? COMMIT_SHA : 'dev',
  replaysOnErrorSampleRate: IS_PROD ? 1.0 : 0,
  replaysSessionSampleRate: IS_PROD ? 0.1 : 0,
  sendDefaultPii: IS_PROD,
  tracePropagationTargets: ['localhost'],
  tracesSampleRate: IS_PROD ? 0.1 : 0,
})

/**
 * Utility to report errors to Sentry from anywhere in the app.
 * Supports level, tags, user, fingerprint, transactionName, and extras.
 *
 * @param error - The error to report.
 * @param context - Optional context object for extra debugging info.
 *   Special keys: level, tags, user, fingerprint, transactionName
 *   All other keys are sent as extras.
 */
export function captureException(error: unknown, context?: Record<string, any>) {
  const sentryScopeKeys = new Set(['fingerprint', 'level', 'tags', 'transactionName', 'user'])

  Sentry.withScope((scope) => {
    const { fingerprint, level, tags, transactionName, user, ...extras } = context ?? {}

    console.log('context', context)

    if (fingerprint) {
      scope.setFingerprint(fingerprint)
      // Also add as extra for visibility in Sentry UI
      scope.setExtra(
        'fingerprint',
        Array.isArray(fingerprint) ? fingerprint.join('|') : fingerprint,
      )
    }
    if (level) {
      scope.setLevel(level)
    }
    if (tags) {
      Object.entries(tags).forEach(([k, v]) => scope.setTag(k, v as string))
    }
    if (transactionName) {
      scope.setTransactionName(transactionName)
    }
    if (user) {
      scope.setUser(user)
    }

    Object.entries(extras).forEach(([key, value]) => {
      if (!sentryScopeKeys.has(key)) {
        scope.setExtra(key, value)
      }
    })

    Sentry.captureException(error)
  })
}

/**
 * Set the user context for Sentry.
 *
 * @param user - The user object.
 */
export function setSentryUser(user: AuthUser) {
  Sentry.setUser({
    id: user?.uid,
  })
}
