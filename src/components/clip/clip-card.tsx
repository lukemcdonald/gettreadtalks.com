import { Card } from '~/components/card'

export interface ClipsCardBase {
  slug: string
}

export interface ClipsCardData {
  speakers: any
  title: string
}

export interface ClipsCardProps {
  clip: ClipsCardBase & ClipsCardData
}

function ClipCard({ clip }: ClipsCardProps) {
  return (
    <Card
      image={clip?.speakers?.[0].data.avatar}
      text={clip?.speakers?.[0].data.title}
      title={clip.title}
      to={clip.slug}
    />
  )
}

export default ClipCard
