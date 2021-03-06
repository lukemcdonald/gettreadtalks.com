import React, { useEffect, useState } from 'react'

import { Card } from '~/components/card'
import { useUsers } from '~/context/users'

function SpeakerCard({ speaker }) {
  const { user } = useUsers()
  const [icons, setIcons] = useState(() => (speaker?.favorite ? ['featured'] : []))

  useEffect(() => {
    if (user && user?.favoriteSpeakers && user.favoriteSpeakers.includes(speaker.id)) {
      setIcons((icons) => ['favorite', ...icons])
    }
  }, [speaker, user])

  return (
    <Card
      to={speaker.slug}
      image={speaker.avatar}
      title={speaker.title}
      text={speaker.role}
      icons={icons}
    />
  )
}

export default SpeakerCard
