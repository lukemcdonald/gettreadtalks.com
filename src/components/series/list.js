import React from 'react'
import classNames from 'classnames'

import { SeriesCard } from 'components/series/card'

function SeriesList({ children, className, series }) {
  return (
    <div className={classNames('grid gap-4 sm:gap-6', className)}>
      {series.map(({ id, fields, data }) => (
        <SeriesCard key={id} series={{ id, ...fields, ...data }} />
      ))}
      {children}
    </div>
  )
}

export { SeriesList }
