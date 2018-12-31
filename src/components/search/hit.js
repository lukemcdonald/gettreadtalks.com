/* global tw */
import styled from 'styled-components';
import React, { Fragment } from 'react';
import { Highlight } from 'react-instantsearch-dom';

import { MetaText, MetaLink, MetaSep } from '../styled/meta';
import FauxLink from '../fauxLink';

const Title = styled.div`
	${tw`font-bold`};
`;

const SpeakerLink = styled(MetaLink)`
	${tw`relative z-10`}
`;

export default ({ hit }) => (
	<Fragment>
		<Title>
			<Highlight attribute="data.title" hit={hit} />
		</Title>

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
	</Fragment>
);
