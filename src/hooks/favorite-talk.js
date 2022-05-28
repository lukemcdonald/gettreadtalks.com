import { HeartIcon, XCircleIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import React from 'react'

import { useNotification } from '~/context/notifications'
import { useUsers } from '~/context/users'
import { useAsync } from '~/hooks/async'

function useFavoriteTalk() {
  const { run } = useAsync()
  const { updateUser, user } = useUsers()
  const { notify } = useNotification()
  const [favoriteTalks, setFavoriteTalks] = React.useState([])

  React.useEffect(() => {
    if (!user) {
      return null
    }

    setFavoriteTalks(user.favoriteTalks)
  }, [user])

  const isFavorite = (talk) => favoriteTalks && favoriteTalks.some((id) => id === talk.id)

  async function addFavorite(talk) {
    if (isFavorite(talk)) {
      return null
    }

    await run(
      updateUser(user.id, {
        favoriteTalks: [talk.id, ...(favoriteTalks || [])],
      }),
    )

    notify({
      title: talk.title,
      text: 'Has been added to your favorites.',
      icon: ({ className, ...props }) => (
        <HeartIcon className={classNames(className, 'text-favorite-700')} {...props} />
      ),
    })
  }

  async function removeFavorite(talk) {
    if (!isFavorite(talk)) {
      return null
    }

    await run(
      updateUser(user.id, {
        favoriteTalks: favoriteTalks.filter((id) => id !== talk.id),
      }),
    )

    notify({
      title: talk.title,
      text: 'Has been removed from your favorites.',
      icon: (props) => <XCircleIcon {...props} />,
    })
  }

  function updateFavorite(talk) {
    return isFavorite(talk) ? removeFavorite(talk) : addFavorite(talk)
  }

  return {
    addFavorite,
    removeFavorite,
    updateFavorite,
    isFavorite,
  }
}

export { useFavoriteTalk }
