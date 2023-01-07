import type { Dispatch, ReactNode } from 'react'
import { createContext, useCallback, useContext, useReducer } from 'react'

import { Notification } from '~/components/notification'
import type { NotificationMessage } from '~/components/notification/notification'

const NOTIFICATION_DISPLAY_TIME = 5000

enum NotificationActionType {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
}

interface NotificationState {
  messages: NotificationMessage[]
}

interface NotificationAction {
  payload: NotificationMessage
  type: NotificationActionType
}

interface NotificationProps {
  children: ReactNode
}

export interface NotificationContextValue {
  dispatch: Dispatch<NotificationAction>
  notify: (message: NotificationMessage) => void
  state: NotificationState
}

function notificationReducer(state: NotificationState, action: NotificationAction) {
  switch (action.type) {
    case NotificationActionType.ADD:
      return {
        messages: [...state.messages, action.payload],
      }
    case NotificationActionType.REMOVE:
      return {
        messages: state.messages.filter((message) => message.id !== action.payload.id),
      }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function NotificationProvider({ children }: NotificationProps) {
  const [state, dispatch] = useReducer(notificationReducer, { messages: [] })

  const notify = useCallback((message: NotificationMessage) => {
    const id = new Date().getTime()

    dispatch({
      payload: { id, ...message },
      type: NotificationActionType.ADD,
    })

    setTimeout(() => {
      dispatch({
        payload: { id, ...message },
        type: NotificationActionType.REMOVE,
      })
    }, NOTIFICATION_DISPLAY_TIME)
  }, [])

  const value = {
    dispatch,
    notify,
    state,
  }

  // const value: NotificationContextValue = useMemoObject({
  //   dispatch,
  //   notify,
  //   state,
  // })

  return (
    <NotificationContext.Provider value={value}>
      {children}

      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {state.messages.map((message) => (
            <Notification
              key={message.id}
              message={message}
              onClose={() =>
                dispatch({
                  payload: message,
                  type: NotificationActionType.REMOVE,
                })
              }
            />
          ))}
        </div>
      </div>
    </NotificationContext.Provider>
  )
}
const NotificationContext = createContext<NotificationContextValue>({} as NotificationContextValue)
NotificationContext.displayName = 'NotificationContext'

function useNotification() {
  const context = useContext(NotificationContext)

  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }

  return context
}

export { NotificationProvider, useNotification }
