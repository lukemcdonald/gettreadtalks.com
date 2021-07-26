import React from 'react'
import Link from './link'

export default function FauxLink({ children, to }) {
	return (
		<Link to={to} className="absolute inset-0 z-10 block">
			<span className="sr-only">{children}</span>
		</Link>
	)
}
