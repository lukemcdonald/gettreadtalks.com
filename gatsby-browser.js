import React from 'react'
import 'firebase/auth'
import { Layout } from './src/components/layout'

import './src/assets/css/styles.css'

function wrapPageElement({ element, props }) {
	return <Layout {...props}>{element}</Layout>
}

export { wrapPageElement }
