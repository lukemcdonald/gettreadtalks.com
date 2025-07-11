import type { ReactNode } from 'react'
import { ErrorBoundary as SentryErrorBoundry } from '@sentry/gatsby'
import { FullPageErrorFallback } from '../loader'

function ErrorBoundary({ children }: { children: ReactNode }) {
  return <SentryErrorBoundry fallback={FullPageErrorFallback}>{children}</SentryErrorBoundry>
}

export default ErrorBoundary
