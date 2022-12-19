import React, { createContext, useCallback, useContext, useEffect } from 'react'
import type { DocumentData, SetOptions } from 'firebase/firestore'
import { deleteDoc, doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore'

import { FullPageErrorFallback, FullPageLogo } from '~/components/loader'
import { useAuth } from '~/context/auth'
import { useFirebase } from '~/context/firebase'
import { useAsync } from '~/hooks/async'
import { useMemoObject } from '~/hooks/memo-object'
import type { Nullable } from '~/utils/types/shared'

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
  deleteUserById: (id: User['id']) => void
  setUser: (id: User['id'], updates: Partial<DocumentData>, args: SetOptions) => Promise<void>
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

  const db = getFirestore(firebase)

  const loadUserProfile = useCallback(
    async (profile) => {
      const docRef = doc(db, 'users', profile.uid)
      const docSnap = await getDoc(docRef)
      setData({
        id: docSnap.id,
        ...docSnap.data(),
      })
    },
    [db, setData],
  )

  useEffect(() => {
    if (profile) {
      loadUserProfile(profile)
    }
  }, [loadUserProfile, profile])

  const deleteUserById = useCallback(
    async (id: User['id']) => {
      const docRef = doc(db, 'users', id)
      await deleteDoc(docRef)
      setData(null)
    },
    [db, setData],
  )

  const setUser = useCallback(
    async (id: User['id'], updates: Partial<DocumentData>, args: SetOptions = { merge: true }) => {
      const docRef = doc(db, 'users', id)
      await setDoc(docRef, updates, args)
      const updatedRef = doc(db, 'users', id)
      const updatedSnap = await getDoc(updatedRef)
      setData({
        id: updatedSnap.id,
        ...updatedSnap.data(),
      })
    },
    [db, setData],
  )

  const updateUser = useCallback(
    async (id: User['id'], updates: Partial<DocumentData>) => {
      const docRef = doc(db, 'users', id)
      await updateDoc(docRef, updates)
      const updatedRef = doc(db, 'users', id)
      const updatedSnap = await getDoc(updatedRef)
      setData({
        id: updatedSnap.id,
        ...updatedSnap.data(),
      })
    },
    [db, setData],
  )

  const value = useMemoObject({
    deleteUserById,
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
