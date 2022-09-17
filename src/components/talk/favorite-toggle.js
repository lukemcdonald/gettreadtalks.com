import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import React from 'react'

import { Toggle } from '~/components/toggle'
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
      <Toggle.Button
        checked={enabled}
        onChange={() => updateFavorite(talk)}
        className="relative inline-flex items-center rounded-full"
        {...props}
      >
        <span className="sr-only">Add to favorites</span>
        <Toggle.On>
          <HeartSolidIcon className={classNames('h-full w-full', classNameToggle?.on)} />
        </Toggle.On>
        <Toggle.Off>
          <HeartOutlineIcon className={classNames('h-full w-full', classNameToggle?.off)} />
        </Toggle.Off>
      </Toggle.Button>
    </Toggle>
  )
}

export default FavoriteToggle
