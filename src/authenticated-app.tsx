// todo: Consider moving UsersProvider around the areas that need it.
import React from 'react'

import { Layout } from '~/components/layout'
import { UsersProvider } from '~/context/users'

interface Props {
  children: React.ReactNode
}

function AuthenticatedApp({ children }: Props) {
  return (
    <UsersProvider>
      <Layout>{children}</Layout>
    </UsersProvider>
  )
}

export default AuthenticatedApp
