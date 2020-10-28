import React from 'react';
import Link from './link';

export default function SubNav({ title, links = [], ...other }) {
	return (
		<nav {...other}>
			{title && <h2 className="visuallyhidden">{title}</h2>}

			<ul>
				{links.map((link) => (
					<li key={link.to}>
						<Link to={link.to}>{link.text}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
