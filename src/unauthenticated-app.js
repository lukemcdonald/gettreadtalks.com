import React from 'react'

import Layout from '~/components/layout'

function UnauthenticatedApp({ children }) {
  return <Layout>{children}</Layout>
}

export default UnauthenticatedApp
