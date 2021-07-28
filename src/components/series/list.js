import React from 'react'
import classnames from 'classnames'

import { SeriesCard } from './card'

function SeriesList({ children, className, series }) {
	return (
		<div className={classnames('grid gap-4 sm:gap-6', className)}>
			{series.map(({ id, fields, data }) => (
				<SeriesCard key={id} series={{ id, ...fields, ...data }} />
			))}
			{children}
		</div>
	)
}

export { SeriesList }
