import React from 'react'
import classNames from 'classnames'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/solid'

import { useFavoriteTalk } from 'hooks/favorite-talk'
import { useUsers } from 'context/users'
import { Toggle, ToggleOn, ToggleOff, ToggleButton } from 'components/toggle'

function FavoriteToggle({ classNameToggle = {}, talk, ...props }) {
  const [enabled, setEnabled] = React.useState(false)
  const { user } = useUsers()
  const { isFavorite, updateFavorite } = useFavoriteTalk()

  React.useEffect(() => {
    setEnabled(isFavorite(talk))
  }, [isFavorite, talk])

  if (!user) {
    return null
  }

  return (
    <Toggle>
      <ToggleButton
        checked={enabled}
        onChange={() => updateFavorite(talk)}
        className="relative inline-flex items-center rounded-full"
        {...props}
      >
        <span className="sr-only">Add to favorites</span>
        <ToggleOn>
          <HeartSolidIcon className={classNames('h-full w-full', classNameToggle?.on)} />
        </ToggleOn>
        <ToggleOff>
          <HeartOutlineIcon className={classNames('h-full w-full', classNameToggle?.off)} />
        </ToggleOff>
      </ToggleButton>
    </Toggle>
  )
}

export { FavoriteToggle }
