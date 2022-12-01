import React, { createContext, useCallback, useContext, useEffect } from 'react'

import { FullPageErrorFallback, FullPageLogo } from '~/components/loader'
import { useAuth } from '~/context/auth'
import { useFirebase } from '~/context/firebase'
import { useAsync } from '~/hooks/async'
import { useMemoObject } from '~/hooks/memo-object'
import type { IFirebase, Nullable } from '~/utils/types/shared'

interface User {
  id: string
  favoriteSpeakers?: string[]
  favoriteTalks?: string[]
  finishedTalks?: string[]
}

interface UsersProviderProps {
  children: React.ReactNode
}

export interface UsersProviderValue {
  deleteUserById: (id: User['id']) => Promise<void>
  readUserByField: (field: string) => Promise<void>
  readUserById: (id: User['id']) => Promise<void>
  setUser: (
    id: User['id'],
    updates: Partial<IFirebase['firestoreData']>,
    args: IFirebase['firestoreOptions'],
  ) => Promise<void>
  updateUser: (id: User['id'], updates: Omit<User, 'id'>) => Promise<void>
  user: Nullable<User>
}

function UsersProvider(props: UsersProviderProps) {
  const { profile } = useAuth()
  const { firebase } = useFirebase()
  const {
    data: user,
    status,
    error,
    setData,
    isLoading,
    isIdle,
    isError,
    isSuccess,
  } = useAsync<User>()

  const db = firebase.firestore()

  useEffect(() => {
    if (profile) {
      db.collection('users')
        .doc(profile.uid)
        .get()
        .then((doc) =>
          setData({
            id: doc.id,
            ...doc.data(),
          }),
        )
    }
  }, [db, setData, profile])

  const deleteUserById = useCallback(
    (id: User['id']) =>
      db
        .collection('users')
        .doc(id)
        .delete()
        .then(() => setData(null)),
    [db, setData],
  )

  const readUserByField = useCallback(
    (field: string) =>
      db
        .collection('users')
        .limit(1)
        .where(field.toString(), '==', field)
        .get()
        .then((snapshot) => {
          const doc = snapshot.docs[0]
          setData({
            id: doc.id,
            ...doc.data(),
          })
        }),
    [db, setData],
  )
  const readUserById = useCallback(
    (id: User['id']) =>
      db
        .collection('users')
        .doc(id)
        .get()
        .then((doc) =>
          setData({
            id: doc.id,
            ...doc.data(),
          }),
        ),
    [db, setData],
  )

  const setUser = useCallback(
    (
      id: User['id'],
      updates: Partial<IFirebase['firestoreData']>,
      args: IFirebase['firestoreOptions'],
    ) =>
      db
        .collection('users')
        .doc(id)
        .set(updates, args || { merge: true })
        .then(() => db.collection('users').doc(id).get())
        .then((doc) =>
          setData({
            id: doc.id,
            ...doc.data(),
          }),
        ),
    [db, setData],
  )

  const updateUser = useCallback(
    (id: User['id'], updates: Partial<IFirebase['firestoreData']>) =>
      db
        .collection('users')
        .doc(id)
        .update(updates)
        .then(() => db.collection('users').doc(id).get())
        .then((doc) =>
          setData({
            id: doc.id,
            ...doc.data(),
          }),
        ),
    [db, setData],
  )

  const value = useMemoObject({
    deleteUserById,
    readUserById,
    readUserByField,
    setUser,
    updateUser,
    user,
  })

  if (isLoading || isIdle) {
    return <FullPageLogo />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    return <UsersContext.Provider value={value} {...props} />
  }

  throw new Error(`Unhandled status: ${status}`)
}

const UsersContext = createContext<UsersProviderValue>({} as UsersProviderValue)
UsersContext.displayName = 'UsersContext'

function useUsers() {
  const context = useContext(UsersContext)
  if (context === undefined) {
    throw new Error(`useUsers must be used within UsersProvider`)
  }
  return context
}

export { UsersProvider, useUsers }
