import { ErrorBoundary as SentryErrorBoundry } from '@sentry/react'
import { FullPageErrorFallback } from '../loader'

function ErrorBoundary({ children }) {
  return <SentryErrorBoundry fallback={FullPageErrorFallback}>{children}</SentryErrorBoundry>
}

export default ErrorBoundary
