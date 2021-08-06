import React from 'react'
import { navigate } from 'gatsby'
import firebase from 'gatsby-plugin-firebase'

import { useAsync } from 'utils/async'

import { FullPageLogo, FullPageErrorFallback } from 'components/loader'

const AuthContext = React.createContext({})
AuthContext.displayName = 'AuthContext'

function AuthProvider(props) {
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

	React.useEffect(
		() => firebase.auth().onAuthStateChanged((user) => setData(user)),
		[setData]
	)

	const login = React.useCallback(
		(form) =>
			firebase
				.auth()
				.signInWithEmailAndPassword(form.email, form.password)
				.then((user) => setData(user))
				.then(() => navigate('/account')),
		[setData]
	)

	const register = React.useCallback(
		(form) =>
			firebase
				.auth()
				.createUserWithEmailAndPassword(form.email, form.password)
				.then((user) => setData(user))
				.then(() => navigate('/account')),
		[setData]
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

	const value = React.useMemo(
		() => ({ login, logout, register, resetPassword, user }),
		[login, logout, register, resetPassword, user]
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
