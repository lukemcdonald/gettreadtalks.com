import React from 'react';
import Link from './link';

export default function FauxLink({ children, to, ...other }) {
	return (
		<Link to={to} {...other} className="block pin absolute">
			<span className="visuallyhidden">{children}</span>
		</Link>
	);
}
