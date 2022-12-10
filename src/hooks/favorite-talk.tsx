import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { HeartIcon, XCircleIcon } from '@heroicons/react/24/outline'

import { useNotification } from '~/context/notifications'
import { useUsers } from '~/context/users'
import { useAsync } from '~/hooks/async'

export interface FavoriteTalk {
  id: string
  title: string
}

function useFavoriteTalk() {
  const { run } = useAsync()
  const { updateUser, user } = useUsers()
  const { notify } = useNotification()
  const [favoriteTalks, setFavoriteTalks] = useState<string[]>([])
  const isFavorite = (talk: FavoriteTalk) => favoriteTalks?.some((id) => id === talk.id)
  const userFavoriteTalks = user?.favoriteTalks

  const addFavorite = async (talk: FavoriteTalk) => {
    if (isFavorite(talk) || !user) {
      return null
    }

    await run(
      updateUser(user.id, {
        favoriteTalks: [talk.id, ...favoriteTalks],
      }),
    )

    notify({
      title: talk.title,
      text: 'Added to favorites',
      icon: ({ className, ...props }) => (
        <HeartIcon className={clsx(className, 'text-favorite-700')} {...props} />
      ),
    })
  }

  const removeFavorite = async (talk: FavoriteTalk) => {
    if (!isFavorite(talk) || !user) {
      return null
    }

    await run(
      updateUser(user.id, {
        favoriteTalks: favoriteTalks.filter((id) => id !== talk.id),
      }),
    )

    notify({
      title: talk.title,
      text: 'Removed from favorites',
      icon: (props) => <XCircleIcon {...props} />,
    })
  }

  const updateFavorite = (talk: FavoriteTalk) => {
    return isFavorite(talk) ? removeFavorite(talk) : addFavorite(talk)
  }

  useEffect(() => {
    if (userFavoriteTalks) {
      setFavoriteTalks(userFavoriteTalks)
    }
  }, [userFavoriteTalks])

  return {
    addFavorite,
    removeFavorite,
    updateFavorite,
    isFavorite,
  }
}

export { useFavoriteTalk }
