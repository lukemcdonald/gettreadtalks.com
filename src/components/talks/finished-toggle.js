import { CheckIcon as CheckOutlineIcon } from '@heroicons/react/outline'
import { CheckIcon as CheckSolidIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import React from 'react'

import { Toggle, ToggleButton, ToggleOff, ToggleOn } from '~/components/toggle'
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
      <ToggleButton checked={enabled} onChange={() => updateFinished(talk)} {...props}>
        <span className="sr-only">Save as finished</span>
        <ToggleOn>
          <CheckSolidIcon className={classNames('h-full w-full', classNameToggle?.on)} />
        </ToggleOn>
        <ToggleOff>
          <CheckOutlineIcon className={classNames('h-full w-full', classNameToggle?.off)} />
        </ToggleOff>
      </ToggleButton>
    </Toggle>
  )
}

export { FinishedToggle }
