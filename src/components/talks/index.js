import React from 'react'
import classnames from 'classnames'

import Talk from './card'

function Talks({ children, className, subtitle, talks }) {
	return (
		<div className={classnames('grid gap-4 sm:gap-6', className)}>
			{talks.map(({ id, fields, data }) => {
				const talk = { id, ...fields, ...data, subtitle }
				return <Talk key={id} talk={talk} />
			})}
			{children}
		</div>
	)
}

export default Talks
