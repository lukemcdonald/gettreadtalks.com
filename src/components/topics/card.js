/* global tw */
import styled from 'styled-components';

import React from 'react';
import PropTypes from 'prop-types';

import Card from '../card';
import FauxLink from '../fauxLink';
import { MetaText } from '../styled/meta';

const Body = styled('div')`
	${tw`flex justify-between items-center`}
`;

const Title = styled('h2')`
	${tw`font-bold mb-1 text-black text-xl`}
`;

const TopicCard = ({ id, post, slug }) => {
	const { publishedTalksCount, name } = post;

	return (
		<Card id={id}>
			<Body>
				<Title>{name}</Title>
				{publishedTalksCount && (
					<MetaText>
						{publishedTalksCount === 1
							? `${publishedTalksCount} Talk`
							: `${publishedTalksCount} Talks`}
					</MetaText>
				)}
			</Body>

			<FauxLink to={`/topics/${slug}`}>{`${name} Talks`}</FauxLink>
		</Card>
	);
};

TopicCard.propTypes = {
	post: PropTypes.object.isRequired,
	slug: PropTypes.string.isRequired,
};

export default TopicCard;
