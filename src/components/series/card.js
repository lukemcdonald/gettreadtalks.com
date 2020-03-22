/* global tw */
import styled from 'styled-components';
import React, { Fragment } from 'react';
import { seriesType, seriesDefaults } from '../../prop-types';

import Card from '../card';
import CardAvatar from '../cardAvatar';
import FauxLink from '../fauxLink';
import { MetaText } from '../styled/meta';

const Container = styled.div`
	${tw`flex items-center leading-tight`}
`;

const Body = styled.div`
	${tw`flex justify-between items-center`}
`;

const Title = styled.h2`
	${tw`font-bold mb-1 text-black text-lg`}
	${tw`sm:text-xl sm:mb-0`}
`;

const SeriesCard = ({ data: post }) => (
	<Card id={post.id}>
		<Body>
			<Title>{post.title}</Title>

			{post.publishedTalksCount && (
				<MetaText>
					{post.publishedTalksCount === 1
						? `${post.publishedTalksCount} Talk`
						: `${post.publishedTalksCount} Talks`}
				</MetaText>
			)}
		</Body>

		<FauxLink to={post.slug}>{`Series on ${post.title}`}</FauxLink>
	</Card>
);

// SeriesCard.propTypes = { data: seriesType.isRequired };
// SeriesCard.defaultProps = seriesDefaults;

export default SeriesCard;
