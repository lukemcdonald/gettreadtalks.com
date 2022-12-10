import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { CheckCircleIcon as CheckIcon, XCircleIcon as CloseIcon } from '@heroicons/react/24/outline'

import { useAsync } from '~/hooks/async'
import { useNotification } from '~/context/notifications'
import { useUsers } from '~/context/users'

export interface FinishedTalk {
  id: string
  title: string
}

function useFinishedTalk() {
  const { run } = useAsync()
  const { updateUser, user } = useUsers()
  const { notify } = useNotification()
  const [finishedTalks, setFinishedTalks] = useState<string[]>([])
  const isFinished = (talk: FinishedTalk) => finishedTalks?.some((id) => id === talk.id)
  const userFinishedTalks = user?.finishedTalks

  async function addFinished(talk: FinishedTalk) {
    if (isFinished(talk) || !user) {
      return null
    }

    await run(
      updateUser(user.id, {
        finishedTalks: [talk.id, ...finishedTalks],
      }),
    )

    notify({
      title: talk.title,
      text: 'Marked as finished',
      icon: ({ className, ...props }) => (
        <CheckIcon className={clsx(className, 'text-finished-700')} {...props} />
      ),
    })
  }

  async function removeFinished(talk: FinishedTalk) {
    if (!isFinished(talk) || !user) {
      return null
    }

    await run(
      updateUser(user.id, {
        finishedTalks: finishedTalks.filter((id) => id !== talk.id),
      }),
    )

    notify({
      title: talk.title,
      text: 'Marked as unfinished',
      icon: (props) => <CloseIcon {...props} />,
    })
  }

  const updateFinished = (talk: FinishedTalk) => {
    return isFinished(talk) ? removeFinished(talk) : removeFinished(talk)
  }

  useEffect(() => {
    if (userFinishedTalks) {
      setFinishedTalks(userFinishedTalks)
    }
  }, [userFinishedTalks])

  return {
    addFinished,
    removeFinished,
    updateFinished,
    isFinished,
  }
}

export { useFinishedTalk }
