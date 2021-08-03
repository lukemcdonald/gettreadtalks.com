import React from 'react'
import classNames from 'classnames'

import { SpeakerCard } from './card'

function SpeakersList({ children, className, speakers }) {
	return (
		<div
			className={classNames(
				'grid gap-4 sm:gap-6 lg:grid lg:grid-cols-2',
				className
			)}
		>
			{children}
			{speakers.map(({ id, fields, data }) => (
				<SpeakerCard key={id} speaker={{ id, ...fields, ...data }} />
			))}
		</div>
	)
}

export { SpeakersList }
