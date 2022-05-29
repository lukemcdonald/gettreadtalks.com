// todo: Consider moving UsersProvider around the areas that need it.
import React from 'react'

import { Layout } from '~/components/layout'
import { UsersProvider } from '~/context/users'

function AuthenticatedApp({ children }) {
  return (
    <UsersProvider>
      <Layout>{children}</Layout>
    </UsersProvider>
  )
}

export default AuthenticatedApp
