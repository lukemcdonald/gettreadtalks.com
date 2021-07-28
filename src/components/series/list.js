import React from 'react'
import classnames from 'classnames'

import { SeriesCard } from './card'

function SeriesList({ children, className, series }) {
	return (
		<div className={classnames('grid gap-4 sm:gap-6', className)}>
			{series.map(({ id, fields, data }) => {
				const singleSeries = { id, ...fields, ...data }
				return <SeriesCard key={id} series={singleSeries} />
			})}
			{children}
		</div>
	)
}

export { SeriesList }
