import * as React from 'react'
import { useAuth } from 'context/auth'
import { FullPageLogo } from 'components/loader'

const AuthenticatedApp = React.lazy(() =>
	import(/* webpackPrefetch: true */ 'appAuthenticated')
)
const UnauthenticatedApp = React.lazy(() => import('appUnauthenticated'))

function App({ children }) {
	const { profile } = useAuth()

	return (
		<React.Suspense fallback={<FullPageLogo />}>
			{profile ? (
				<AuthenticatedApp>{children}</AuthenticatedApp>
			) : (
				<UnauthenticatedApp>{children}</UnauthenticatedApp>
			)}
		</React.Suspense>
	)
}

export { App }
