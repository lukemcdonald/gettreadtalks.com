import React from 'react'

import { App } from './src/app'
import './src/assets/css/styles.css'
import { AppProviders } from './src/context'

function wrapPageElement({ element, props }) {
  return (
    <AppProviders>
      <App {...props}>{element}</App>
    </AppProviders>
  )
}

export { wrapPageElement }
