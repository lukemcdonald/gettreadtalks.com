// todo: Consider moving AuthProvider around the areas that need it. Notably the account navigation dropdown, account screens, and user action buttons on talk pages.

import React from 'react'

import { AuthProvider } from 'context/auth'
import { NotificationProvider } from 'context/notifications'

function AppProviders({ children }) {
	return (
		<NotificationProvider>
			<AuthProvider>{children}</AuthProvider>
		</NotificationProvider>
	)
}

export { AppProviders }
