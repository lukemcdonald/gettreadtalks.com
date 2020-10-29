import React from 'react';
import Link from './link';

export default function FauxLink({ children, to, ...other }) {
	return (
		<Link to={to} {...other} className="absolute inset-0 block">
			<span className="sr-only">{children}</span>
		</Link>
	);
}
