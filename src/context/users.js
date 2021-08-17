import React from 'react'
import firebase from 'gatsby-plugin-firebase'
import { useAsync } from 'hooks/useAsync'
import { useAuth } from 'context/auth'
import { Spinner, ErrorFallback } from 'components/loader'

const UsersContext = React.createContext({})
UsersContext.displayName = 'UsersContext'

function UsersProvider(props) {
	const firestore = firebase.firestore()
	const { profile } = useAuth()

	const {
		data: user,
		status,
		error,
		setData,
		isLoading,
		isIdle,
		isError,
		isSuccess,
	} = useAsync()

	React.useEffect(() => {
		if (!profile) {
			return null
		}

		firestore
			.collection('users')
			.doc(profile.uid)
			.get()
			.then((doc) =>
				setData({
					id: doc.id,
					...doc.data(),
				})
			)
	}, [firestore, setData, profile])

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
			readUserById,
			readUserByField,
			updateUser,
			setUser,
			deleteUserById,
			user,
		}),
		[readUserById, readUserByField, updateUser, setUser, deleteUserById, user]
	)

	if (isLoading || isIdle) {
		return <Spinner className="w-16 h-16 text-red-600" />
	}

	if (isError) {
		return <ErrorFallback error={error} />
	}

	if (isSuccess) {
		return <UsersContext.Provider value={value} {...props} />
	}

	throw new Error(`Unhandled status: ${status}`)
}

function useUsers() {
	const context = React.useContext(UsersContext)
	if (context === undefined) {
		throw new Error(`useUsers must be used within UsersProvider`)
	}
	return context
}

// Use for testing.
function UsersDataDisplay(user) {
	if (!user) {
		return null
	}
	return (
		<pre className="mt-6">
			<ul className="prose">
				{Object.keys(user).map((key) => (
					<li key={key}>
						<strong>{key}:</strong>
						{key === 'favoriteTalks' && user[key] && (
							<ol>
								{user[key].map(
									(data, index) =>
										data && (
											<li key={`favoriteTalk-${index}`}>{data.toString()}</li>
										)
								)}
							</ol>
						)}

						{key !== 'favoriteTalks' && user[key].toString()}
					</li>
				))}
			</ul>
		</pre>
	)
}

export { UsersProvider, useUsers, UsersDataDisplay }
