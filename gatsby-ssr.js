import React from 'react'
import 'firebase/auth'
import { Layout } from './src/components/layout'
import { AuthProvider } from './src/context/auth'

import './src/assets/css/styles.css'

function wrapPageElement({ element, props }) {
	return (
		<AuthProvider>
			<Layout {...props}>{element}</Layout>
		</AuthProvider>
	)
}

export { wrapPageElement }
