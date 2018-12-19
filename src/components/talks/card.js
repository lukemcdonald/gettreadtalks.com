/* global tw */
import styled from 'styled-components';
import React from 'react';
import { talkType } from '../../prop-types';

import Card from '../card';
import CardAvatar from '../cardAvatar';
import FauxLink from '../fauxLink';

import { MetaText, MetaSep, MetaLink } from '../styled/meta';

const Container = styled('div')`
	${tw`flex items-center`}
`;
const Body = styled('div')`
	${tw`flex-grow`}
`;
const Title = styled('h2')`
	${tw`font-bold mb-1 text-black text-xl`}
`;
const SpeakerLink = styled(MetaLink)`
	${tw`relative z-10`}
`;

const TalkCard = ({ data: post }) => (
	<Card id={post.id}>
		<Container>
			{post.speakers.map(({ id, data }) => (
				<CardAvatar key={id} data={data.avatar} title={data.name} />
			))}

			<Body>
				<header>
					<Title>{post.title}</Title>
				</header>

				<footer>
					{post.speakers.map(({ id, data, fields }) => (
						<MetaText key={id}>
							<MetaSep>By</MetaSep>&nbsp;
							<SpeakerLink to={`/by/${fields.slug}`}>{data.name}</SpeakerLink>
							&nbsp;
						</MetaText>
					))}

					{post.scripture && (
						<MetaText>
							<MetaSep>from</MetaSep> {post.scripture}
						</MetaText>
					)}
				</footer>
			</Body>
		</Container>

		<FauxLink
			to={`/by/${post.speakers[0].fields.slug}/${post.slug}`}
		>{`Listen to ${post.title}`}</FauxLink>
	</Card>
);

TalkCard.propTypes = {
	data: talkType.isRequired,
};

export default TalkCard;
