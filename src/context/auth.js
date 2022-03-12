import React from 'react'
import { navigate } from 'gatsby'
import { UserCircleIcon } from '@heroicons/react/outline'

import { useAsync } from 'hooks/async'
import { useMemoObject } from 'hooks/memo-object'
import { useFirebase } from 'context/firebase'
import { useNotification } from 'context/notifications'
import { FullPageLogo, FullPageErrorFallback } from 'components/loader'

const AuthContext = React.createContext({})
AuthContext.displayName = 'AuthContext'

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

function AuthProvider(props) {
  const { notify } = useNotification()
  const { firebase } = useFirebase()

  const auth = firebase.auth()
  const db = firebase.firestore()

  const { data: profile, status, error, setData, isLoading, isIdle, isError, isSuccess } = useAsync()

  React.useEffect(() => auth.onAuthStateChanged((creds) => setData(creds)), [auth, setData])

  const updateUsersCollection = React.useCallback(
    (id, updates, args) =>
      db
        .collection('users')
        .doc(id)
        .set(updates, args || { merge: true }),
    [db],
  )

  const login = React.useCallback(
    (form) =>
      auth.signInWithEmailAndPassword(form.email, form.password).then((creds) => {
        setData(creds)
        navigate('/account/')
        return null
      }),
    [auth, setData],
  )

  const register = React.useCallback(
    (form) =>
      auth
        .createUserWithEmailAndPassword(form.email, form.password)
        .then((creds) => {
          setData(creds)
          updateUsersCollection(creds.user.uid, {
            creationTime: new Date(),
            favoriteTalks: [],
            finishedTalks: [],
          })
        })
        .then(() => navigate('/account/')),
    [auth, setData, updateUsersCollection],
  )

  const logout = React.useCallback(
    () =>
      auth.signOut().then(() => {
        setData(null)
        navigate('/login/')
        return null
      }),
    [auth, setData],
  )

  const resetPassword = React.useCallback(
    (form) =>
      auth.sendPasswordResetEmail(form.email).then(() => {
        setData(null)
        navigate('/login/')
        notify({
          title: 'Email sent',
          text: 'An email to reset your password has been sent.',
          icon: (props) => <UserCircleIcon {...props} />,
        })
        return null
      }),
    [auth, notify, setData],
  )

  const reauthenticate = React.useCallback(
    ({ email, password }) => {
      const credential = firebase.auth.EmailAuthProvider.credential(email, password)

      return auth.currentUser.reauthenticateWithCredential(credential)
    },
    [auth, firebase],
  )

  const unregister = React.useCallback(
    (form) => {
      const { currentUser } = auth
      reauthenticate({
        email: currentUser.email,
        password: form.password,
      }).then(async () => {
        await db.collection('users').doc(currentUser.uid).delete()
        await currentUser.delete().then(() => setData(null))
        notify({
          title: 'Account updated',
          text: 'Your account has successfully been unregisterd.',
          icon: (props) => <UserCircleIcon {...props} />,
        })
        navigate('/')
        return null
      })
    },
    [auth, db, notify, reauthenticate, setData],
  )

  const updateSettings = React.useCallback(
    ({ credentials, updates }) => {
      const { currentUser } = auth

      return reauthenticate({
        email: currentUser.email,
        password: credentials.password,
      }).then(() => {
        if (updates.email) {
          currentUser.updateEmail(updates.email).then(() =>
            notify({
              title: 'Email updated',
              text: 'Your email address has been updated.',
              icon: (props) => <UserCircleIcon {...props} />,
            }),
          )
        }

        if (updates.password) {
          currentUser.updatePassword(updates.password).then(() => {
            setData(profile)
            notify({
              title: 'Password updated',
              text: 'Your password has been updated.',
              icon: (props) => <UserCircleIcon {...props} />,
            })
          })
        }
      })
    },
    [auth, notify, profile, reauthenticate, setData],
  )

  const isUser = profile

  const value = useMemoObject({
    login,
    logout,
    register,
    unregister,
    resetPassword,
    updateSettings,
    reauthenticate,
    isUser,
    profile,
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

export { AuthProvider, useAuth }
