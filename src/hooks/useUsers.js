import firebase from 'gatsby-plugin-firebase'
import { useAsync } from 'hooks/useAsync'

function useUsers() {
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

	async function createUser(id) {
		const userData = {
			creationTime: new Date(),
		}

		await db.collection('users').doc(id).set(userData, { merge: true })

		setData(id)
		// console.log(id)
		return id
	}

	async function readAllUsers() {
		const snapshot = await db.collection('users').get()
		const users = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))

		setData(users)
		// console.log(users)
		return users
	}

	async function readUserById(id) {
		const doc = await db.collection('users').doc(id).get()
		const user = {
			id: doc.id,
			...doc.data(),
		}

		setData(user)
		// console.log(user)
		return user
	}

	async function readUserByName(name) {
		const snapshot = await db
			.collection('users')
			.limit(1)
			.where('name', '==', name)
			.get()

		const doc = snapshot.docs[0]

		const user = {
			id: doc.id,
			...doc.data(),
		}

		setData(user)
		// console.log(user)
		return user
	}

	async function setUser(id, updates, args) {
		await db
			.collection('users')
			.doc(id)
			.set(updates, args || { merge: true })

		setData(id)
		// console.log(id)
		return id
	}

	// returns void
	async function updateUser(id, updates) {
		await db.collection('users').doc(id).update(updates)
		const doc = await db.collection('users').doc(id).get()

		const user = {
			id: doc.id,
			...doc.data(),
		}
		setData(user)
		// console.log(user)
		return user
	}

	// returns void
	async function deleteUserById(id) {
		await db.collection('users').doc(id).delete()

		setData(id)
		// console.log(id)
		return id
	}

	return {
		deleteUserById,
		readUserById,
		readAllUsers,
		createUser,
		setUser,
		updateUser,
	}
}

export { useUsers }
