import { Card } from '~/components/card'
import { useFavoriteTalk } from '~/hooks/favorite-talk'
import { useFinishedTalk } from '~/hooks/finished-talk'

interface TalkCardSpeakerData {
  data: {
    avatar: any
    title: string
  }
}

export interface TalkCardBase {
  id: string
  slug: string
}

export interface TalkCardData {
  favorite: boolean
  speakers: TalkCardSpeakerData[]
  subtitle?: string
  title: string
}

export interface TalkCardProps {
  talk: TalkCardBase & TalkCardData
}

function TalkCard({ talk }: TalkCardProps) {
  const { isFavorite } = useFavoriteTalk()
  const { isFinished } = useFinishedTalk()
  const speaker = talk?.speakers?.[0].data
  let icons = talk?.favorite ? ['featured'] : []

  if (isFavorite(talk)) {
    icons = ['favorite', ...icons]
  }

  if (isFinished(talk)) {
    icons = ['finished', ...icons]
  }

  return (
    <Card
      icons={icons}
      image={speaker.avatar}
      subtitle={talk.subtitle}
      text={speaker.title}
      title={talk.title}
      to={talk.slug}
    />
  )
}

export default TalkCard
