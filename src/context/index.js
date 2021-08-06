import React from 'react'

import { AuthProvider } from 'context/auth'

function AppProviders({ children }) {
	return <AuthProvider>{children}</AuthProvider>
}

export { AppProviders }
