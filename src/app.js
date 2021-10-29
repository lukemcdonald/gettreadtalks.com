import * as React from 'react'
import { useAuth } from 'context/auth'
import { FullPageLogo } from 'components/loader'

const AuthenticatedApp = React.lazy(() => import(/* webpackPrefetch: true */ 'authenticated-app'))
const UnauthenticatedApp = React.lazy(() => import('unauthenticated-app'))

function App({ children }) {
  const { profile } = useAuth()

  return (
    <React.Suspense fallback={<FullPageLogo />}>
      {profile ? <AuthenticatedApp>{children}</AuthenticatedApp> : <UnauthenticatedApp>{children}</UnauthenticatedApp>}
    </React.Suspense>
  )
}

export { App }
