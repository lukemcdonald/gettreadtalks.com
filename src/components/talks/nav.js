import React from 'react';
import { Link } from 'gatsby';

export default () => (
	<nav>
		<h2 className="visuallyhidden">Talks Navigation</h2>
		<ul className="list-reset flex">
			<li>
				<Link to="/">Latest Talks</Link>
			</li>
			<li>
				<Link to="/talks/featured">Featured Talks</Link>
			</li>
			<li>
				<Link to="/talks">All Talks</Link>
			</li>
		</ul>
	</nav>
);
