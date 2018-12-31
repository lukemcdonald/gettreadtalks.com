import React, { Fragment } from 'react';
import { Hits, connectStateResults } from 'react-instantsearch-dom';

import Hit from './hit';

const HitsNotice = ({ query, results }) =>
	results && results.nbHits !== 0 ? null : (
		<div className="ais-Hits">
			<ul className="ais-Hits-list">
				<li className="ais-Hits-item">
					No results found for <em>{query}</em>
				</li>
			</ul>
		</div>
	);

export default connectStateResults(({ searchState, searchResults }) =>
	searchState && searchState.query ? (
		<Fragment>
			<Hits hitComponent={Hit} />
			<HitsNotice query={searchState.query} results={searchResults} />
		</Fragment>
	) : null
);
