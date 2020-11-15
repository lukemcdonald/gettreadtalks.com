import React from 'react';
import classnames from 'classnames';

import Link from './link';

export default function Pagination({ pageContext }) {
	const {
		previousPagePath,
		nextPagePath,
		humanPageNumber,
		numberOfPages,
	} = pageContext;

	return (
		<nav
			role="navigation"
			className="flex justify-between my-8 text-lg font-bold"
		>
			<ul className="flex gap-4">
				{previousPagePath && (
					<li>
						<Link to={previousPagePath} rel="prev">
							{nextPagePath ? 'Previous' : 'Previous Page'}
						</Link>
					</li>
				)}

				{humanPageNumber >= 2 && humanPageNumber < numberOfPages && (
					<li className="mx-4">
						<span>&mdash;</span>
					</li>
				)}

				{nextPagePath && (
					<li>
						<Link to={nextPagePath} rel="next">
							{previousPagePath ? 'Next' : 'Next Page'}
						</Link>
					</li>
				)}
			</ul>

			{numberOfPages > 1 && (
				<div>
					<span className="sr-only">Page</span> {humanPageNumber} /{' '}
					{numberOfPages}
				</div>
			)}
		</nav>
	);
}
