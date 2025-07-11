import clsx from 'clsx'

import type { SpeakerCardData } from './speaker-card'
import SpeakerCard from './speaker-card'

interface SpeakerListProps {
  className?: string
  speakers: any
}

export interface SpeakerListItem {
  data: SpeakerCardData
  fields: { slug: string }
  id: string
}

function SpeakerList({ className, speakers }: SpeakerListProps) {
  return (
    <div className={clsx('grid gap-4 sm:gap-6 lg:grid lg:grid-cols-2', className)}>
      {speakers.map((speaker: SpeakerListItem) => (
        <SpeakerCard
          key={speaker.id}
          speaker={{
            ...speaker.fields,
            ...speaker.data,
            id: speaker.id,
          }}
        />
      ))}
    </div>
  )
}

export default SpeakerList
