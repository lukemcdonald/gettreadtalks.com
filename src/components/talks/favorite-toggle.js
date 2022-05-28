import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import React from 'react'

import { Toggle, ToggleButton, ToggleOff, ToggleOn } from '~/components/toggle'
import { useUsers } from '~/context/users'
import { useFavoriteTalk } from '~/hooks/favorite-talk'

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
