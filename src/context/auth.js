import React from 'react'
import firebase from 'gatsby-plugin-firebase'
import { navigate } from 'gatsby'

import { useAsync } from 'hooks/async'
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
	const auth = firebase.auth()
	const db = firebase.firestore()

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
		() => auth.onAuthStateChanged((creds) => setData(creds)),
		[auth, setData]
	)

	const updateUsersCollection = React.useCallback(
		(id, updates, args) =>
			db
				.collection('users')
				.doc(id)
				.set(updates, args || { merge: true }),
		[db]
	)

	const login = React.useCallback(
		(form) =>
			auth
				.signInWithEmailAndPassword(form.email, form.password)
				.then((creds) => setData(creds))
				.then(() => navigate('/account')),
		[auth, setData]
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
					})
				})
				.then(() => navigate('/account')),
		[auth, setData, updateUsersCollection]
	)

	const logout = React.useCallback(
		() =>
			auth
				.signOut()
				.then(() => setData(null))
				.then(() => navigate('/login')),
		[auth, setData]
	)

	const resetPassword = React.useCallback(
		(form) =>
			auth
				.sendPasswordResetEmail(form.email)
				.then(() => setData(null))
				.then(() => navigate('/login')),
		[auth, setData]
	)

	const reauthenticate = React.useCallback(
		({ email, password }) => {
			const credential = firebase.auth.EmailAuthProvider.credential(
				email,
				password
			)

			return auth.currentUser.reauthenticateWithCredential(credential)
		},
		[auth]
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
				navigate('/')
				return null
			})
		},
		[auth, db, reauthenticate, setData]
	)

	const updateSettings = React.useCallback(
		({ credentials, updates }) => {
			const { currentUser } = auth

			console.log({ credentials, updates })

			return reauthenticate({
				email: currentUser.email,
				password: credentials.password,
			}).then(() => {
				// todo: display message when email has successfully been updated.
				if (updates.email) {
					currentUser
						.updateEmail(updates.email)
						.then(() => setData({ ...profile, email: updates.email }))
				}
				// todo: display message when password has successfully been updated.
				if (updates.password) {
					currentUser.updatePassword(updates.password)
				}
			})
		},
		[auth, profile, reauthenticate, setData]
	)

	const isUser = profile

	const value = React.useMemo(
		() => ({
			login,
			logout,
			register,
			unregister,
			resetPassword,
			updateSettings,
			reauthenticate,
			isUser,
			profile,
		}),
		[
			login,
			logout,
			register,
			unregister,
			resetPassword,
			updateSettings,
			reauthenticate,
			isUser,
			profile,
		]
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

export { AuthProvider, useAuth }
