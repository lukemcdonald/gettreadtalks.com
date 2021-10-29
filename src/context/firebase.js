// todo: update Firebase functionality to version 9 (currently version 8)
import React from 'react'
import { useAsync } from 'hooks/async'
import { FullPageLogo, FullPageErrorFallback } from 'components/loader'

const FirebaseContext = React.createContext({})
FirebaseContext.displayName = 'FirebaseContext'

function useFirebase() {
  const context = React.useContext(FirebaseContext)
  if (context === undefined) {
    throw new Error(`useFirebase must be used within FirebaseProvider`)
  }
  return context
}

async function getFirebase() {
  const firebase = (await import('firebase/app')).default
  await Promise.all([import('firebase/auth'), import('firebase/firestore')])

  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: process.env.GATSBY_FIREBASE_API_KEY,
      authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
      projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
      storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
    })
  }

  return firebase
}

function FirebaseProvider(props) {
  const { data: firebase, status, error, setData, isLoading, isIdle, isError, isSuccess } = useAsync()

  React.useEffect(() => {
    getFirebase().then((client) => setData(client))
  }, [setData])

  const value = React.useMemo(() => ({ firebase }), [firebase])

  if (isLoading || isIdle) {
    return <FullPageLogo />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    return <FirebaseContext.Provider value={value} {...props} />
  }

  throw new Error(`Unhandled status: ${status}`)
}

export { FirebaseProvider, useFirebase, getFirebase }
