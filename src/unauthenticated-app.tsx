import React from 'react'

import { Layout } from '~/components/layout'

interface Props {
  children: React.ReactNode
}

function UnauthenticatedApp({ children }: Props) {
  return <Layout>{children}</Layout>
}

export default UnauthenticatedApp
