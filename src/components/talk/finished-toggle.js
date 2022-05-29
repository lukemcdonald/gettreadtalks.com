import { CheckIcon as CheckOutlineIcon } from '@heroicons/react/outline'
import { CheckIcon as CheckSolidIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import React from 'react'

import { Toggle } from '~/components/toggle'
import { useUsers } from '~/context/users'
import { useFinishedTalk } from '~/hooks/finished-talk'

function FinishedToggle({ classNameToggle = {}, talk, ...props }) {
  const [enabled, setEnabled] = React.useState(false)
  const { user } = useUsers()
  const { isFinished, updateFinished } = useFinishedTalk()

  React.useEffect(() => {
    setEnabled(isFinished(talk))
  }, [isFinished, talk])

  if (!user) {
    return null
  }

  return (
    <Toggle>
      <Toggle.Button checked={enabled} onChange={() => updateFinished(talk)} {...props}>
        <span className="sr-only">Save as finished</span>
        <Toggle.On>
          <CheckSolidIcon className={classNames('h-full w-full', classNameToggle?.on)} />
        </Toggle.On>
        <Toggle.Off>
          <CheckOutlineIcon className={classNames('h-full w-full', classNameToggle?.off)} />
        </Toggle.Off>
      </Toggle.Button>
    </Toggle>
  )
}

export default FinishedToggle
