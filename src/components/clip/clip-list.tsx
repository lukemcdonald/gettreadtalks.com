import classNames from 'classnames'
import type { TAny } from '~/utils/types/shared'

import ClipCard from './clip-card'
import type { ClipsCardData } from './clip-card'

interface ClipsListProps {
  className?: string
  clips: TAny
}

interface ClipsListItem {
  data: ClipsCardData
  fields: { slug: string }
  id: string
}

function ClipList({ className, clips }: ClipsListProps) {
  return (
    <div className={classNames('grid gap-4 sm:gap-6', className)}>
      {clips.map((clips: ClipsListItem) => (
        <ClipCard key={clips.id} clip={{ ...clips.fields, ...clips.data }} />
      ))}
    </div>
  )
}

export default ClipList
