import clsx from 'clsx'

import type { SeriesCardData } from './series-card'
import SeriesCard from './series-card'
import type { TAny } from '~/utils/types/shared'

interface SeriesListProps {
  className?: string
  series: TAny
}

interface SeriesListItem {
  data: SeriesCardData
  fields: { slug: string }
  id: string
}

function SeriesList({ className, series }: SeriesListProps) {
  return (
    <div className={clsx('grid gap-4 sm:gap-6', className)}>
      {series.map((series: SeriesListItem) => (
        <SeriesCard
          key={series.id}
          series={{
            ...series.fields,
            ...series.data,
            id: series.id,
          }}
        />
      ))}
    </div>
  )
}

export default SeriesList
