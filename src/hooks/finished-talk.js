import React from 'react'
import classNames from 'classnames'
import { CheckCircleIcon as CheckIcon, XCircleIcon } from '@heroicons/react/outline'

import { useAsync } from 'hooks/async'
import { useUsers } from 'context/users'
import { useNotification } from 'context/notifications'

function useFinishedTalk() {
  const { run } = useAsync()
  const { updateUser, user } = useUsers()
  const { notify } = useNotification()
  const [finishedTalks, setFinishedTalks] = React.useState([])

  React.useEffect(() => {
    if (!user) {
      return null
    }

    setFinishedTalks(user.finishedTalks)
  }, [user])

  const isFinished = (talk) => finishedTalks && finishedTalks.some((id) => id === talk.id)

  async function addFinished(talk) {
    if (isFinished(talk)) {
      return null
    }

    await run(
      updateUser(user.id, {
        finishedTalks: [talk.id, ...(finishedTalks || [])],
      }),
    )

    notify({
      title: talk.title,
      text: 'Has been marked as finished.',
      icon: ({ className, ...props }) => (
        <CheckIcon className={classNames(className, 'text-finished-700')} {...props} />
      ),
    })
  }

  async function removeFinished(talk) {
    if (!isFinished(talk)) {
      return null
    }

    await run(
      updateUser(user.id, {
        finishedTalks: finishedTalks.filter((id) => id !== talk.id),
      }),
    )

    notify({
      title: talk.title,
      text: 'Has been marked as unfinished.',
      icon: (props) => <XCircleIcon {...props} />,
    })
  }

  function updateFinished(talk) {
    return isFinished(talk) ? removeFinished(talk) : addFinished(talk)
  }

  return {
    addFinished,
    removeFinished,
    updateFinished,
    isFinished,
  }
}

export { useFinishedTalk }
