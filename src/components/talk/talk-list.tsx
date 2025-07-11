import clsx from 'clsx'

import TalkCard from './talk-card'
import type { TAny } from '~/utils/types/shared'

interface TalkListProps {
  className?: string
  subtitle?: string
  talks: TAny
}

interface TalkListItem {
  data: TAny
  fields: { slug: string }
  id: string
}

function TalkList({ className, subtitle, talks }: TalkListProps) {
  return (
    <div className={clsx('grid gap-4 sm:gap-6', className)}>
      {talks.map((talk: TalkListItem) => (
        <TalkCard
          key={talk.id}
          talk={{
            ...talk.fields,
            ...talk.data,
            id: talk.id,
            subtitle,
          }}
        />
      ))}
    </div>
  )
}

export default TalkList
