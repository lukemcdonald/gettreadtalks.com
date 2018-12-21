/* global tw */
import styled from 'styled-components';
import React from 'react';
import {
	InstantSearch,
	SearchBox,
	Hits,
	Highlight,
	Configure,
	connectStateResults,
} from 'react-instantsearch-dom';

import { Algolia } from '../components/styled/algolia';
import { MetaText, MetaLink, MetaSep } from '../components/styled/meta';
import FauxLink from '../components/fauxLink';

const SpeakerLink = styled(MetaLink)`
	${tw`relative z-10`}
`;

const Hit = ({ hit }) => (
	<div>
		<div>
			<Highlight attribute="data.title" hit={hit} />
		</div>

		<div>
			{hit.data.speakers.map(({ data, fields }) => (
				<MetaText key={data.name}>
					<MetaSep>By</MetaSep>&nbsp;
					<SpeakerLink to={`/by/${fields.slug}`}>
						<Highlight attribute="data.speakers[0].data.name" hit={hit} />
					</SpeakerLink>
					&nbsp;
				</MetaText>
			))}

			{hit.data.scripture && (
				<MetaText>
					<MetaSep>from</MetaSep>&nbsp;
					<Highlight attribute="data.scripture" hit={hit} />
				</MetaText>
			)}
		</div>
		<FauxLink
			to={`/by/${hit.data.speakers[0].fields.slug}/${hit.fields.slug}`}
		>{`Listen to ${hit.data.title}`}</FauxLink>
	</div>
);

const SearchResults = connectStateResults(({ searchState }) =>
	searchState && searchState.query ? <Hits hitComponent={Hit} /> : null
);

const Search = () => {
	return (
		<Algolia>
			<InstantSearch
				appId="MSM4664OMW"
				apiKey="7fb1f124e1b1c522c047da1392f0cac2"
				indexName="prod_PUBLISHED_TALKS"
			>
				<Configure hitsPerPage={5} />
				<SearchBox translations={{ placeholder: 'Search for Talks' }} />
				<SearchResults />
			</InstantSearch>
		</Algolia>
	);
};

export default Search;
