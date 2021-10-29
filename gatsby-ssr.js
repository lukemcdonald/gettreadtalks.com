import React from 'react'
import { App } from './src/app'
import { AppProviders } from './src/context'

import './src/assets/css/styles.css'

function wrapPageElement({ element, props }) {
  return (
    <AppProviders>
      <App {...props}>{element}</App>
    </AppProviders>
  )
}

export { wrapPageElement }
