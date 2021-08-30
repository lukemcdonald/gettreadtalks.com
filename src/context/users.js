import React from 'react'
import firebase from 'gatsby-plugin-firebase'
import { useAsync } from 'hooks/async'
import { useAuth } from 'context/auth'
import { FullPageLogo, FullPageErrorFallback } from 'components/loader'

const UsersContext = React.createContext({})
UsersContext.displayName = 'UsersContext'

function UsersProvider(props) {
	const db = firebase.firestore()
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

		db.collection('users')
			.doc(profile.uid)
			.get()
			.then((doc) =>
				setData({
					id: doc.id,
					...doc.data(),
				})
			)
	}, [db, setData, profile])

	const readAllUsers = React.useCallback(
		() =>
			db
				.collection('users')
				.get()
				.then((snapshot) => {
					const users = snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
					setData(users)
				}),
		[db, setData]
	)

	const readUserById = React.useCallback(
		(id) =>
			db
				.collection('users')
				.doc(id)
				.get()
				.then((doc) =>
					setData({
						id: doc.id,
						...doc.data(),
					})
				),
		[db, setData]
	)

	const readUserByField = React.useCallback(
		(field) =>
			db
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
		[db, setData]
	)

	const setUser = React.useCallback(
		(id, updates, args) =>
			db
				.collection('users')
				.doc(id)
				.set(updates, args || { merge: true })
				.then(() => db.collection('users').doc(id).get())
				.then((doc) =>
					setData({
						id: doc.id,
						...doc.data(),
					})
				),
		[db, setData]
	)

	const updateUser = React.useCallback(
		(id, updates) =>
			db
				.collection('users')
				.doc(id)
				.update(updates)
				.then(() => db.collection('users').doc(id).get())
				.then((doc) =>
					setData({
						id: doc.id,
						...doc.data(),
					})
				),
		[db, setData]
	)

	const deleteUserById = React.useCallback(
		(id) =>
			db
				.collection('users')
				.doc(id)
				.delete()
				.then(() => setData(null)),
		[db, setData]
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
