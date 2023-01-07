import { lazy, Suspense } from 'react'
import type { PageProps } from 'gatsby'

import { useAuth } from '~/context/auth'
import { FullPageLogo } from '~/components/loader'

const AuthenticatedApp = lazy(() => import(/* webpackPrefetch: true */ './authenticated-app'))
const UnauthenticatedApp = lazy(() => import('./unauthenticated-app'))

function App({ children }: PageProps) {
  const { profile } = useAuth()

  return (
    <Suspense fallback={<FullPageLogo />}>
      {profile ? (
        <AuthenticatedApp>{children}</AuthenticatedApp>
      ) : (
        <UnauthenticatedApp>{children}</UnauthenticatedApp>
      )}
    </Suspense>
  )
}

export { App }
