import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

import type { FavoriteTalk } from '~/hooks/favorite-talk'
import { Toggle } from '~/components/toggle'
import { useFavoriteTalk } from '~/hooks/favorite-talk'
import { useUsers } from '~/context/users'

interface Props {
  className?: string
  classNameToggle?: {
    off: string
    on: string
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
      <Toggle.Button checked={enabled} onChange={handleOnChange} {...props}>
        <span className="sr-only">Add to favorites</span>
        <Toggle.On>
          <HeartSolidIcon className={clsx('h-full w-full', classNameToggle?.on)} />
        </Toggle.On>
        <Toggle.Off>
          <HeartOutlineIcon className={clsx('h-full w-full', classNameToggle?.off)} />
        </Toggle.Off>
      </Toggle.Button>
    </Toggle>
  )
}

export default FavoriteToggle
