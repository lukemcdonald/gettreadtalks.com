import React from 'react'
import classnames from 'classnames'

import { SpeakerCard } from './card'

function SpeakersList({ children, className, speakers }) {
	return (
		<div
			className={classnames(
				'grid gap-4 sm:gap-6 lg:grid lg:grid-cols-2',
				className
			)}
		>
			{children}
			{speakers.map(({ id, fields, data }) => {
				const speaker = { id, ...fields, ...data }
				return <SpeakerCard key={id} speaker={speaker} />
			})}
		</div>
	)
}

export { SpeakersList }
