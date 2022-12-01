import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

import type { FavoriteTalk } from '~/hooks/favorite-talk'
import { Toggle } from '~/components/toggle'
import { useFavoriteTalk } from '~/hooks/favorite-talk'
import { useUsers } from '~/context/users'

interface Props {
  className?: string
  classNameToggle?: {
    on: string
    off: string
  }
  talk: FavoriteTalk
}

function FavoriteToggle({ classNameToggle, talk, ...props }: Props) {
  const [enabled, setEnabled] = useState(false)
  const { user } = useUsers()
  const { isFavorite, updateFavorite } = useFavoriteTalk()

  function handleOnChange() {
    updateFavorite(talk)
  }

  useEffect(() => {
    setEnabled(isFavorite(talk))
  }, [isFavorite, talk])

  if (!user) {
    return null
  }

  return (
    <Toggle>
      <Toggle.Button
        checked={enabled}
        onChange={handleOnChange}
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
