// todo: Consider moving UsersProvider around the areas that need it.
import type { ReactNode } from 'react'

import { Layout } from '~/components/layout'
import { UsersProvider } from '~/context/users'

interface Props {
  children: ReactNode
}

function AuthenticatedApp({ children }: Props) {
  return (
    <UsersProvider>
      <Layout>{children}</Layout>
    </UsersProvider>
  )
}

export default AuthenticatedApp
