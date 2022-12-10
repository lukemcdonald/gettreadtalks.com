import React from 'react'
import clsx from 'clsx'

import type { TAny } from '~/utils/types/shared'
import type { SpeakerCardData } from './speaker-card'
import SpeakerCard from './speaker-card'

interface SpeakerListProps {
  actions?: {
    before?: React.ReactNode
    after?: React.ReactNode
  }
  className?: string
  speakers: TAny
}

interface SpeakerListItem {
  data: SpeakerCardData
  fields: { slug: string }
  id: string
}

function SpeakerList({ actions, className, speakers }: SpeakerListProps) {
  return (
    <div className={clsx('grid gap-4 sm:gap-6 lg:grid lg:grid-cols-2', className)}>
      {actions?.before}
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
      {actions?.after}
    </div>
  )
}

export default SpeakerList
