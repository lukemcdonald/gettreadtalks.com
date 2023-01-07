import type { ReactNode } from 'react'

import { Layout } from '~/components/layout'

interface Props {
  children: ReactNode
}

function UnauthenticatedApp({ children }: Props) {
  return <Layout>{children}</Layout>
}

export default UnauthenticatedApp
