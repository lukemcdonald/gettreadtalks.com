import type { ComponentProps, ReactNode } from 'react'
import { createContext, useContext, useCallback, useEffect } from 'react'
import { navigate } from 'gatsby'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import type { User } from 'firebase/auth'
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  signOut,
  EmailAuthProvider,
} from 'firebase/auth'
import type { DocumentData, SetOptions } from 'firebase/firestore'
import { getFirestore, doc, setDoc, deleteDoc } from 'firebase/firestore'

import { FullPageErrorFallback, FullPageLogo } from '~/components/loader'
import { getErrorMessage } from '~/utils/error'
import { useAsync } from '~/hooks/async'
import { useFirebase } from '~/context/firebase'
import { useMemoObject } from '~/hooks/memo-object'
import { useNotification } from '~/context/notifications'
import { getAuthErrorMessage } from '~/utils/auth-error'
import { setSentryUser } from '../../sentry.config'

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
  updates: Partial<DocumentData>
}

export type AuthUser = User | null

export interface AuthProviderValue {
  isUser: boolean
  login: (form: AuthCredentials) => Promise<void>
  logout: () => void
  profile: AuthUser
  reauthenticate: (form: AuthCredentials) => Promise<void>
  register: (form: AuthCredentials) => Promise<void>
  resetPassword: (form: AuthCredentials) => Promise<void>
  unregister: (props: { password: string }) => Promise<void>
  updateSettings: (props: AuthSettings) => void
}

interface AuthProviderProps {
  children: ReactNode
}

function AuthProvider(props: AuthProviderProps) {
  const { notify } = useNotification()
  const { firebase } = useFirebase()
  const auth = getAuth(firebase)
  const db = getFirestore(firebase)
  const {
    data: profile,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    setData: setUser,
    status,
  } = useAsync<AuthUser>()

  const updateUserContext = useCallback(
    (user: AuthUser) => {
      setUser(user)
      setSentryUser(user)
    },
    [setUser],
  )

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      updateUserContext(user)
    })
  }, [auth, updateUserContext])

  const updateUsersCollection = useCallback(
    (id: string, updates: Partial<DocumentData>, args: SetOptions = { merge: true }) => {
      try {
        const docRef = doc(db, 'users', id)
        setDoc(docRef, updates, args)
      } catch (err) {
        throw new Error(getAuthErrorMessage(err))
      }
    },
    [db],
  )

  const login = useCallback(
    async (form: AuthCredentials) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password)
        updateUserContext(userCredential.user)
        navigate('/account/')
      } catch (err) {
        throw new Error(getAuthErrorMessage(err))
      }
    },
    [auth, updateUserContext],
  )

  const register = useCallback(
    async (form: AuthCredentials) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password)
        updateUserContext(userCredential.user)
        updateUsersCollection(userCredential.user.uid, {
          creationTime: new Date(),
          favoriteTalks: [],
          finishedTalks: [],
        })
        navigate('/account/')
      } catch (err) {
        throw new Error(getAuthErrorMessage(err))
      }
    },
    [auth, updateUserContext, updateUsersCollection],
  )

  const logout = useCallback(async () => {
    try {
      await signOut(auth)
      updateUserContext(null)
      navigate('/login/')
    } catch (err) {
      throw new Error(getAuthErrorMessage(err))
    }
  }, [auth, updateUserContext])

  const resetPassword = useCallback(
    async (form: Pick<AuthCredentials, 'email'>) => {
      try {
        await sendPasswordResetEmail(auth, form.email)
        updateUserContext(null)
        notify({
          title: 'Check your email',
          text: 'An email to reset your password has been sent.',
          icon: (iconProps: ComponentProps<'svg'>) => <UserCircleIcon {...iconProps} />,
        })
        navigate('/login/')
      } catch (err) {
        throw new Error(getAuthErrorMessage(err))
      }
    },
    [auth, notify, updateUserContext],
  )

  const reauthenticate = useCallback(
    async (form: AuthCredentials) => {
      try {
        const credential = EmailAuthProvider.credential(form.email, form.password)
        const currentUser: AuthUser = auth.currentUser

        if (currentUser === null) {
          throw new Error('No user is currently signed in.')
        }

        await reauthenticateWithCredential(currentUser, credential)
      } catch (err) {
        throw new Error(getAuthErrorMessage(err))
      }
    },
    [auth.currentUser],
  )

  const unregister = useCallback(
    async (form: { password: string }) => {
      const currentUser: AuthUser = auth.currentUser

      try {
        if (currentUser === null) {
          throw new Error('Current user is not set.')
        }

        await reauthenticate({
          email: currentUser.email || '',
          password: form.password,
        })

        const docRef = doc(db, 'users', currentUser.uid)

        await deleteDoc(docRef)
        await currentUser?.delete()

        updateUserContext(null)
        notify({
          title: 'Account updated',
          text: 'Your account has successfully been unregisterd.',
          icon: (iconProps) => <UserCircleIcon {...iconProps} />,
        })
        navigate('/')
      } catch (err) {
        notify({
          title: 'Error',
          text: getErrorMessage(err),
          icon: (iconProps) => <UserCircleIcon {...iconProps} />,
        })
      }
    },
    [auth, db, notify, reauthenticate, updateUserContext],
  )

  const updateSettings = useCallback(
    async ({ creds, updates }: AuthSettings) => {
      const currentUser: AuthUser = auth.currentUser

      try {
        if (currentUser === null) {
          throw new Error('Current user is not set.')
        }

        await reauthenticate({
          email: currentUser?.email || '',
          password: creds.password,
        })

        if (updates.email) {
          await updateEmail(currentUser, updates.email)
          updateUserContext(profile)
          notify({
            title: 'Email updated',
            text: 'Your email address has been updated.',
            icon: (iconProps: ComponentProps<'svg'>) => <UserCircleIcon {...iconProps} />,
          })
        }

        if (updates.password) {
          await updatePassword(currentUser, updates.password)
          updateUserContext(profile)
          notify({
            title: 'Password updated',
            text: 'Your password has been updated.',
            icon: (iconProps: ComponentProps<'svg'>) => <UserCircleIcon {...iconProps} />,
          })
        }
      } catch (err) {
        notify({
          title: 'Error',
          text: getErrorMessage(err),
          icon: (iconProps) => <UserCircleIcon {...iconProps} />,
        })
      }
    },
    [auth, notify, profile, reauthenticate, updateUserContext],
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

const AuthContext = createContext<AuthProviderValue>({} as AuthProviderValue)
AuthContext.displayName = 'AuthContext'

function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

export { AuthProvider, useAuth }
