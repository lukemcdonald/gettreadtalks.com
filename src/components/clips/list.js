import React from 'react'
import classnames from 'classnames'

import { ClipCard } from './card'

function ClipsList({ children, className, clips }) {
	return (
		<div className={classnames('grid gap-4 sm:gap-6', className)}>
			{clips.map(({ id, fields, data }) => {
				const clip = { id, ...fields, ...data }
				return <ClipCard key={id} clip={clip} />
			})}
			{children}
		</div>
	)
}

export { ClipsList }
