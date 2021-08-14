import React from 'react'
import { navigate } from 'gatsby'
import firebase from 'gatsby-plugin-firebase'

import { useAsync } from 'hooks/useAsync'

import { FullPageLogo, FullPageErrorFallback } from 'components/loader'

const AuthContext = React.createContext({})
AuthContext.displayName = 'AuthContext'

function AuthProvider(props) {
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

	React.useEffect(
		() => firebase.auth().onAuthStateChanged((creds) => setData(creds)),
		[setData]
	)

	const updateUsersCollection = React.useCallback(
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

	const login = React.useCallback(
		(form) =>
			firebase
				.auth()
				.signInWithEmailAndPassword(form.email, form.password)
				.then((creds) => setData(creds))
				.then(() => navigate('/account')),
		[setData]
	)

	const register = React.useCallback(
		(form) =>
			firebase
				.auth()
				.createUserWithEmailAndPassword(form.email, form.password)
				.then((creds) => {
					setData(creds)
					updateUsersCollection(creds.user.uid, { creationTime: new Date() })
				})
				.then(() => navigate('/account')),
		[setData, updateUsersCollection]
	)

	const logout = React.useCallback(
		() =>
			firebase
				.auth()
				.signOut()
				.then(() => setData(null))
				.then(() => navigate('/login')),
		[setData]
	)

	const resetPassword = React.useCallback(
		(form) =>
			firebase
				.auth()
				.sendPasswordResetEmail(form.email)
				.then(() => setData(null))
				.then(() => navigate('/login')),
		[setData]
	)

	// @todo: Add button to delete account along with removing user from users collection.

	const isUser = isSuccess

	const value = React.useMemo(
		() => ({ login, logout, register, resetPassword, isUser, profile }),
		[login, logout, register, resetPassword, isUser, profile]
	)

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

function useAuth() {
	const context = React.useContext(AuthContext)
	if (context === undefined) {
		throw new Error(`useAuth must be used within a AuthProvider`)
	}
	return context
}

export { AuthProvider, useAuth }
