import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { CheckIcon as CheckOutlineIcon } from '@heroicons/react/24/outline'
import { CheckIcon as CheckSolidIcon } from '@heroicons/react/24/solid'

import type { FavoriteTalk } from '~/hooks/favorite-talk'
import { Toggle } from '~/components/toggle'
import { useFinishedTalk } from '~/hooks/finished-talk'
import { useUsers } from '~/context/users'

interface Props {
  className?: string
  classNameToggle?: {
    on: string
    off: string
  }
  talk: FavoriteTalk
}

function FinishedToggle({ classNameToggle, talk, ...props }: Props) {
  const [enabled, setEnabled] = useState(false)
  const { user } = useUsers()
  const { isFinished, updateFinished } = useFinishedTalk()

  function handleOnChange() {
    updateFinished(talk)
  }

  useEffect(() => {
    setEnabled(isFinished(talk))
  }, [isFinished, talk])

  if (!user) {
    return null
  }

  return (
    <Toggle>
      <Toggle.Button checked={enabled} onChange={handleOnChange} {...props}>
        <span className="sr-only">Save as finished</span>
        <Toggle.On>
          <CheckSolidIcon className={clsx('h-full w-full', classNameToggle?.on)} />
        </Toggle.On>
        <Toggle.Off>
          <CheckOutlineIcon className={clsx('h-full w-full', classNameToggle?.off)} />
        </Toggle.Off>
      </Toggle.Button>
    </Toggle>
  )
}

export default FinishedToggle
