import React from 'react'
import { Notification } from 'components/notification'

const NotificationContext = React.createContext()
NotificationContext.displayName = 'NotificationContext'

const actionTypes = {
	add: 'add',
	remove: 'remove',
}

function notificationReducer(state, { type, message }) {
	switch (type) {
		case actionTypes.add:
			return {
				messages: [
					...state.messages,
					{
						id: new Date().getTime(),
						...message,
					},
				],
			}
		case actionTypes.remove:
			return {
				messages: state.messages.filter(
					(_message) => _message.id !== message.id
				),
			}
		default: {
			throw new Error(`Unhandled action type: ${type}`)
		}
	}
}

function NotificationProvider({ children }) {
	const [state, dispatch] = React.useReducer(notificationReducer, {
		messages: [],
	})

	const notify = React.useCallback((message) => {
		const id = new Date().getTime()
		dispatch({ type: 'add', message: { id, ...message } })
		setTimeout(() => {
			dispatch({ type: 'remove', message: { id, ...message } })
		}, 5000)
	}, [])

	const value = { state, dispatch, notify }

	return (
		<NotificationContext.Provider value={value}>
			{children}

			<div
				aria-live="assertive"
				className="fixed inset-0 z-50 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
			>
				<div className="flex flex-col items-center w-full space-y-4 sm:items-end">
					{state.messages.map((message) => (
						<Notification
							key={message.id}
							message={message}
							onClose={() => dispatch({ type: 'remove', message })}
						/>
					))}
				</div>
			</div>
		</NotificationContext.Provider>
	)
}

function useNotification() {
	const context = React.useContext(NotificationContext)
	if (context === undefined) {
		throw new Error(
			'useNotification must be used within a NotificationProvider'
		)
	}
	return context
}

export { NotificationProvider, useNotification }
