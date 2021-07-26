import React from 'react'
import classnames from 'classnames'

import Clip from './card'

export default function Clips({ children, className, clips }) {
	return (
		<div className={classnames('grid gap-4 sm:gap-6', className)}>
			{clips.map(({ id, fields, data }) => {
				const clip = { id, ...fields, ...data }
				return <Clip key={id} clip={clip} />
			})}
			{children}
		</div>
	)
}
