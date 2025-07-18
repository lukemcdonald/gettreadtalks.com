import type { PropsWithChildren } from 'react'
import { createContext, useCallback, useContext, useEffect, useMemo } from 'react'
import type { FirebaseApp } from 'firebase/app'
import { initializeApp } from 'firebase/app'

import { FullPageErrorFallback, FullPageLogo } from '~/components/loader'
import { useAsync } from '~/hooks/async'

interface FirebaseContextValue {
  firebase: FirebaseApp
}

const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
}

function FirebaseProvider(props: PropsWithChildren) {
  const {
    data: firebase,
    status,
    error,
    setData,
    isLoading,
    isIdle,
    isError,
    isSuccess,
  } = useAsync<FirebaseApp>()

  const initializeFirebase = useCallback(() => {
    const app = initializeApp(firebaseConfig)
    setData(app)
  }, [setData])

  useEffect(() => {
    initializeFirebase()
  }, [initializeFirebase])

  const value = useMemo(() => ({ firebase: firebase! }), [firebase])

  if (isLoading || isIdle) {
    return <FullPageLogo />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess && firebase) {
    return <FirebaseContext.Provider value={value} {...props} />
  }

  throw new Error(`Unhandled status: ${status}`)
}

const FirebaseContext = createContext<FirebaseContextValue>({} as FirebaseContextValue)
FirebaseContext.displayName = 'FirebaseContext'

function useFirebase() {
  const context = useContext(FirebaseContext)
  if (context === undefined) {
    throw new Error(`useFirebase must be used within FirebaseProvider`)
  }
  return context
}

export { FirebaseProvider, useFirebase }
