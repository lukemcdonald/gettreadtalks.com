// todo: Consider moving AuthProvider around the areas that need it. Notably the account navigation dropdown, account screens, and user action buttons on talk pages.
import { AuthProvider } from '~/context/auth'
import { ErrorBoundary } from '~/components/error-boundary'
import { FirebaseProvider } from '~/context/firebase'
import { NotificationProvider } from '~/context/notifications'

interface Props {
  children: React.ReactNode
}

function AppProviders({ children }: Props) {
  return (
    <NotificationProvider>
      <FirebaseProvider>
        <AuthProvider>
          <ErrorBoundary>{children}</ErrorBoundary>
        </AuthProvider>
      </FirebaseProvider>
    </NotificationProvider>
  )
}

export { AppProviders }
