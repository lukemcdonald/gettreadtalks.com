import React from 'react'
import firebase from 'gatsby-plugin-firebase'
import { useAsync } from 'hooks/useAsync'

function useUsers() {
	const firestore = firebase.firestore()

	const {
		data: profile,
		status,
		error,
		setData,
		isLoading,
		isIdle,
		isError,
		isSuccess,
	} = useAsync()

	const createUser = React.useCallback(
		(id, userData, args) => {
			const updates = {
				creationTime: new Date(),
				...(userData || {}),
			}
			return firestore
				.collection('users')
				.doc(id)
				.set(updates, args || { merge: true })
				.then(() => firestore.collection('users').doc(id).get())
				.then((doc) =>
					setData({
						id: doc.id,
						...doc.data(),
					})
				)
		},
		[firestore, setData]
	)

	const readAllUsers = React.useCallback(
		() =>
			firestore
				.collection('users')
				.get()
				.then((snapshot) => {
					const users = snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
					setData(users)
				}),
		[firestore, setData]
	)

	const readUserById = React.useCallback(
		(id) =>
			firestore
				.collection('users')
				.doc(id)
				.get()
				.then((doc) =>
					setData({
						id: doc.id,
						...doc.data(),
					})
				),
		[firestore, setData]
	)

	const readUserByField = React.useCallback(
		(field) =>
			firestore
				.collection('users')
				.limit(1)
				.where(field.tostring(), '==', field)
				.get()
				.then((snapshot) => {
					const doc = snapshot.docs[0]
					setData({
						id: doc.id,
						...doc.data(),
					})
				}),
		[firestore, setData]
	)

	const setUser = React.useCallback(
		(id, updates, args) =>
			firestore
				.collection('users')
				.doc(id)
				.set(updates, args || { merge: true })
				.then(() => firestore.collection('users').doc(id).get())
				.then((doc) =>
					setData({
						id: doc.id,
						...doc.data(),
					})
				),
		[firestore, setData]
	)

	const updateUser = React.useCallback(
		(id, updates) =>
			firestore
				.collection('users')
				.doc(id)
				.update(updates)
				.then(() => firestore.collection('users').doc(id).get())
				.then((doc) =>
					setData({
						id: doc.id,
						...doc.data(),
					})
				),
		[firestore, setData]
	)

	const deleteUserById = React.useCallback(
		(id) =>
			firestore
				.collection('users')
				.doc(id)
				.delete()
				.then(() => setData(null)),
		[firestore, setData]
	)

	const value = React.useMemo(
		() => ({
			createUser,
			readAllUsers,
			readUserById,
			readUserByField,
			updateUser,
			setUser,
			deleteUserById,
			profile,
			error,
			status,
			isLoading,
			isIdle,
			isError,
			isSuccess,
		}),
		[
			createUser,
			readAllUsers,
			readUserById,
			readUserByField,
			updateUser,
			setUser,
			deleteUserById,
			profile,
			error,
			status,
			isLoading,
			isIdle,
			isError,
			isSuccess,
		]
	)

	return value
}

export { useUsers }
