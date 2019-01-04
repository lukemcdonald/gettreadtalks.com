/* global tw */
import styled from 'styled-components';
import React from 'react';
import { topicType, topicDefaults } from '../../prop-types';

import Card from '../card';
import FauxLink from '../fauxLink';
import { MetaText } from '../styled/meta';

const Body = styled('div')`
	${tw`flex justify-between items-center`}
`;

const Title = styled('h2')`
	${tw`font-bold text-black text-xl`}
`;

const TopicCard = ({ data: post }) => (
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

		<FauxLink to={`/${post.slug}`}>{`Talks on ${post.title}`}</FauxLink>
	</Card>
);

TopicCard.propTypes = { data: topicType.isRequired };
TopicCard.defaultProps = topicDefaults;

export default TopicCard;
