import React from 'react'
import classNames from 'classnames'
import { CheckIcon as CheckOutlineIcon } from '@heroicons/react/outline'
import { CheckIcon as CheckSolidIcon } from '@heroicons/react/solid'

import { useFinishedTalk } from 'hooks/finished-talk'
import { useUsers } from 'context/users'
import { Toggle, ToggleOn, ToggleOff, ToggleButton } from 'components/toggle'

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
