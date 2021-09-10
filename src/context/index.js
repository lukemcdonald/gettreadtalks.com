// todo: Consider moving AuthProvider around the areas that need it. Notably the account navigation dropdown, account screens, and user action buttons on talk pages.

import React from 'react'

import { AuthProvider } from 'context/auth'
import { FirebaseProvider } from 'context/firebase'
import { NotificationProvider } from 'context/notifications'

function AppProviders({ children }) {
	return (
		<NotificationProvider>
			<FirebaseProvider>
				<AuthProvider>{children}</AuthProvider>
			</FirebaseProvider>
		</NotificationProvider>
	)
}

export { AppProviders }
