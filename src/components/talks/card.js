/* global tw */
import styled from 'styled-components';
import React from 'react';
import { talkType, talkDefaults } from '../../prop-types';

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
const Footer = styled.footer`
	${tw`flex mt-2`};
`;

const TalkCard = ({ data: post }) => (
	<Card id={post.id}>
		<Container>
			{post.speakers.map(({ id, data }) => (
				<CardAvatar key={id} data={data.avatar} title={data.title} />
			))}

			<Body>
				<header>
					<Title>{post.title}</Title>
				</header>

				<Footer>
					{post.speakers.map(({ id, data, fields }) => (
						<MetaText key={id}>
							<MetaSep>By</MetaSep>&nbsp;
							<SpeakerLink to={`/${fields.slug}`}>{data.title}</SpeakerLink>
							&nbsp;
						</MetaText>
					))}

					{post.scripture && (
						<MetaText>
							<MetaSep>from</MetaSep> {post.scripture}
						</MetaText>
					)}
				</Footer>
			</Body>
		</Container>

		<FauxLink to={`/${post.slug}`}>{`Listen to ${post.title}`}</FauxLink>
	</Card>
);

TalkCard.propTypes = { data: talkType.isRequired };
TalkCard.defaultProps = talkDefaults;

export default TalkCard;
