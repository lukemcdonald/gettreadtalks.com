import clsx from 'clsx'

import ClipCard from './clip-card'
import type { ClipsCardData } from './clip-card'

interface ClipsListProps {
  className?: string
  clips: any
}

interface ClipsListItem {
  data: ClipsCardData
  fields: { slug: string }
  id: string
}

function ClipList({ className, clips }: ClipsListProps) {
  return (
    <div className={clsx('grid gap-4 sm:gap-6', className)}>
      {clips.map((clip: ClipsListItem) => (
        <ClipCard key={clip.id} clip={{ ...clip.fields, ...clip.data }} />
      ))}
    </div>
  )
}

export default ClipList
