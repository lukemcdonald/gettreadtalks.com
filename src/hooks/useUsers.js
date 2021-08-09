import React from 'react'
import firebase from 'gatsby-plugin-firebase'

function useUsers() {
	const db = firebase.firestore()

	function createUser(user) {
		const userData = {
			creationTime: new Date(),
		}

		db.collection('users').doc(user.uid).set(userData, { merge: true })
	}

	async function readAllUsers() {
		const snapshot = await db.collection('users').get()
		const users = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))

		console.log(users)
		return users
	}

	async function readUserById(id) {
		const doc = await db.collection('users').doc(id).get()
		const user = {
			id: doc.id,
			...doc.data(),
		}

		console.log(user)
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

		console.log(user)
		return user
	}

	function setUser(user) {
		const userData = {
			updatedTime: new Date(),
			favoriteTalks: [
				'6cac2356-23a9-5f80-8283-02d201e371e5',
				'5c2c77dd-1bca-557e-a14a-c5f2273a5a1d',
				'932efc94-bacd-5ea9-a494-5b80120bb279',
			],
		}

		db.collection('users').doc(user.uid).set(userData, { merge: true })
	}

	// returns void
	async function updateUser(id, updates) {
		await db.collection('users').doc(id).update(updates)
		const doc = await db.collection('users').doc(id).get()

		const user = {
			id: doc.id,
			...doc.data(),
		}

		console.log(user)
		return user
	}

	// returns void
	async function deleteUserById(id) {
		await db.collection('users').doc(id).delete()

		console.log(id)
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
