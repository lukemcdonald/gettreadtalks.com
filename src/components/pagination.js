import React from 'react';

import Link from './link';
import styles from './pagination.module.css';

const Pagination = ({ pageContext }) => {
	const {
		previousPagePath,
		nextPagePath,
		humanPageNumber,
		numberOfPages,
	} = pageContext;

	return (
		<nav role="navigation" className={`${styles.pagination}`}>
			<ul>
				{previousPagePath && (
					<li>
						<Link to={previousPagePath} rel="prev">
							{nextPagePath ? 'Previous' : 'Previous Page'}
						</Link>
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
					<span className="visuallyhidden">Page</span> {humanPageNumber} /{' '}
					{numberOfPages}
				</div>
			)}
		</nav>
	);
};

export default Pagination;
