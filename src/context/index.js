// todo: Consider moving AuthProvider around the areas that need it. Notably the account navigation dropdown, account screens, and user action buttons on talk pages.

import React from 'react'

import { AuthProvider } from 'context/auth'

function AppProviders({ children }) {
	return <AuthProvider>{children}</AuthProvider>
}

export { AppProviders }
