import { useEffect, useState } from 'react'

import { Card } from '~/components/card'
import { useUsers } from '~/context/users'

export interface SpeakerCardBase {
  id: string
  slug: string
}

export interface SpeakerCardData {
  avatar: string
  favorite: boolean
  lastName: string
  role: string
  title: string
}

export interface SpeakerCardProps {
  speaker: SpeakerCardBase & SpeakerCardData
}

function SpeakerCard({ speaker }: SpeakerCardProps) {
  const { user } = useUsers()
  const [icons, setIcons] = useState(() => (speaker.favorite ? ['featured'] : []))

  useEffect(() => {
    const hasFavoriteSpeakers = user?.favoriteSpeakers?.includes(speaker.id)

    if (hasFavoriteSpeakers) {
      setIcons((prevIcons) => ['favorite', ...prevIcons])
    }
  }, [speaker, user])

  return (
    <Card
      icons={icons}
      image={speaker.avatar}
      text={speaker.role}
      title={speaker.title}
      to={speaker.slug}
    />
  )
}

export default SpeakerCard
