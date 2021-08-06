import * as React from 'react'
import { useAuth } from 'context/auth'
import { FullPageLogo } from 'components/loader'
// import { Layout } from 'components/layout'

const AuthenticatedApp = React.lazy(() =>
	import(/* webpackPrefetch: true */ 'components/layout')
)
const UnauthenticatedApp = React.lazy(() => import('components/layout'))

function App({ children }) {
	const { user } = useAuth()

	return (
		<React.Suspense fallback={<FullPageLogo />}>
			{user ? (
				<AuthenticatedApp>{children}</AuthenticatedApp>
			) : (
				<UnauthenticatedApp>{children}</UnauthenticatedApp>
			)}
		</React.Suspense>
	)
}

export { App }
