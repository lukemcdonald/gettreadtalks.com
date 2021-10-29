import React from 'react'
import { Card } from 'components/card'
import { useFavoriteTalk } from 'hooks/favorite-talk'
import { useFinishedTalk } from 'hooks/finished-talk'

function TalkCard({ talk }) {
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
      to={talk.slug}
      image={speaker.avatar}
      subtitle={talk.subtitle}
      title={talk.title}
      text={speaker.title}
      icons={icons}
    />
  )
}

export { TalkCard }
