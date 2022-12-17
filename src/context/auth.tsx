import React from 'react'
import { navigate } from 'gatsby'
import { UserCircleIcon } from '@heroicons/react/24/outline'

import type { IFirebase, Nullable, TAny } from '~/utils/types/shared'
import { FullPageErrorFallback, FullPageLogo } from '~/components/loader'
import { getErrorMessage } from '~/utils/error'
import { useAsync } from '~/hooks/async'
import { useFirebase } from '~/context/firebase'
import { useMemoObject } from '~/hooks/memo-object'
import { useNotification } from '~/context/notifications'

export interface AuthProfile {
  email: string
  uid?: string
}

export interface AuthCredentials {
  authPassword?: string
  confirmPassword?: string
  email: string
  password: string
}

export interface AuthSettings {
  creds: {
    email: string
    password: string
  }
  updates: Partial<IFirebase['firestoreData']>
}

export type AuthUser = Nullable<IFirebase['user']>

export interface AuthProviderValue {
  isUser: boolean
  login: (props: AuthCredentials) => Promise<void>
  logout: () => Promise<void>
  profile: AuthUser
  reauthenticate: (props: AuthCredentials) => Promise<IFirebase['userCredential']>
  register: (props: AuthCredentials) => Promise<void>
  resetPassword: (props: AuthCredentials) => Promise<void>
  unregister: (props: { password: string }) => Promise<void>
  updateSettings: (props: AuthSettings) => void
}

interface AuthProviderProps {
  children: React.ReactNode
}

function AuthProvider(props: AuthProviderProps) {
  const { notify } = useNotification()
  const { firebase } = useFirebase()
  const auth = firebase.auth()
  const db = firebase.firestore()
  const {
    data: profile,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    setData,
    status,
  } = useAsync<IFirebase['user']>()

  React.useEffect(() => {
    auth.onAuthStateChanged((creds) => setData(creds))
  }, [auth, setData])

  const updateUsersCollection = React.useCallback(
    (
      id: string,
      updates: Partial<IFirebase['firestoreData']>,
      args?: IFirebase['firestoreOptions'],
    ) =>
      db
        .collection('users')
        .doc(id)
        .set(updates, args || { merge: true }),
    [db],
  )

  const login = React.useCallback(
    (form: AuthCredentials) =>
      auth.signInWithEmailAndPassword(form.email, form.password).then((creds) => {
        setData(creds.user)
        navigate('/account/')
      }),
    [auth, setData],
  )

  const register = React.useCallback(
    (form: AuthCredentials) =>
      auth
        .createUserWithEmailAndPassword(form.email, form.password)
        .then((creds: IFirebase['userCredential']) => {
          setData(creds.user)

          if (creds.user) {
            updateUsersCollection(creds.user.uid, {
              creationTime: new Date(),
              favoriteTalks: [],
              finishedTalks: [],
            })
          }
        })
        .then(() => {
          navigate('/account/')
        }),
    [auth, setData, updateUsersCollection],
  )

  const logout = React.useCallback(
    () =>
      auth.signOut().then(() => {
        setData(null)
        navigate('/login/')
      }),
    [auth, setData],
  )

  const resetPassword = React.useCallback(
    (form: Pick<AuthCredentials, 'email'>) =>
      auth.sendPasswordResetEmail(form.email).then(() => {
        setData(null)
        navigate('/login/')
        notify({
          title: 'Email sent',
          text: 'An email to reset your password has been sent.',
          icon: (props: React.ComponentProps<'svg'>) => <UserCircleIcon {...props} />,
        })
      }),
    [auth, notify, setData],
  )

  const reauthenticate = React.useCallback(
    (form: AuthCredentials) => {
      // @ts-ignore
      const credential = firebase.auth.EmailAuthProvider.credential(form.email, form.password)
      const currentUser: AuthUser = auth.currentUser

      if (currentUser) {
        return currentUser.reauthenticateWithCredential(credential)
      } else {
        return Promise.reject(new Error('No user is currently signed in.'))
      }
    },
    [auth, firebase],
  )

  const unregister = React.useCallback(
    async (form: { password: string }) => {
      const currentUser: AuthUser = auth.currentUser

      try {
        reauthenticate({
          email: currentUser?.email || '',
          password: form.password,
        }).then(async () => {
          await db.collection('users').doc(currentUser?.uid).delete()
          await currentUser?.delete().then(() => setData(null))
          notify({
            title: 'Account updated',
            text: 'Your account has successfully been unregisterd.',
            icon: (props) => <UserCircleIcon {...props} />,
          })
          navigate('/')
        })
      } catch (error: TAny) {
        notify({
          title: 'Error',
          text: getErrorMessage(error),
          icon: (props) => <UserCircleIcon {...props} />,
        })
      }
    },
    [auth, db, notify, reauthenticate, setData],
  )

  const updateSettings = React.useCallback(
    ({ creds, updates }: AuthSettings) => {
      const currentUser: AuthUser = auth.currentUser
      reauthenticate({
        email: currentUser?.email || '',
        password: creds.password,
      })
        .then(async () => {
          if (updates.email) {
            currentUser?.updateEmail(updates.email).then(() =>
              notify({
                title: 'Email updated',
                text: 'Your email address has been updated.',
                icon: (props: React.ComponentProps<'svg'>) => <UserCircleIcon {...props} />,
              }),
            )
          }

          if (updates.password) {
            currentUser?.updatePassword(updates.password).then(() => {
              setData(profile)
              notify({
                title: 'Password updated',
                text: 'Your password has been updated.',
                icon: (props: React.ComponentProps<'svg'>) => <UserCircleIcon {...props} />,
              })
            })
          }
        })
        .catch((error: TAny) => {
          notify({
            title: 'Error',
            text: getErrorMessage(error),
            icon: (props: React.ComponentProps<'svg'>) => <UserCircleIcon {...props} />,
          })
        })
    },
    [auth, notify, profile, reauthenticate, setData],
  )

  const value = useMemoObject<AuthProviderValue>({
    isUser: !!profile,
    login,
    logout,
    profile,
    reauthenticate,
    register,
    resetPassword,
    unregister,
    updateSettings,
  })

  if (isLoading || isIdle) {
    return <FullPageLogo />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />
  }

  throw new Error(`Unhandled status: ${status}`)
}

const AuthContext = React.createContext<AuthProviderValue>({} as AuthProviderValue)
AuthContext.displayName = 'AuthContext'

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

export { AuthProvider, useAuth }
