import React from 'react';
import Link from './link';

export default function SubNav({ className, links = [], title }) {
	return (
		<nav className={className}>
			{title && (
				<h2 className="mb-3 text-sm font-bold tracking-wide text-gray-500 uppercase lg:mb-2 lg:text-xs">
					{title}
				</h2>
			)}

			<ul>
				{links.map((link) => (
					<li key={link.to} className="mb-3 lg:mb-1">
						<Link
							to={link.to}
							className="relative block px-2 py-1 -mx-2 font-medium text-gray-600 rounded md:inline-block hover:text-gray-900"
							activeClassName="text-red-600 hover:text-red-600 font-bold"
						>
							{link.text}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
