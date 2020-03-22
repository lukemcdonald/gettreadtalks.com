/* global tw */
import styled from 'styled-components';
import React from 'react';
import { talkType, talkDefaults } from '../../prop-types';

import Card from '../card';
import CardAvatar from '../cardAvatar';
import FauxLink from '../fauxLink';

import { MetaText, MetaSep, MetaLink } from '../styled/meta';

const Container = styled.div`
	${tw`flex text-left leading-tight`}
	${tw`sm:items-center`}
`;
const Body = styled.div`
	${tw`flex-grow`}
`;
const Title = styled.h2`
	${tw`font-bold mb-1 text-black text-lg`}
	${tw`sm:text-xl`}
`;
const SpeakerLink = styled(MetaLink)`
	${tw`relative z-10`}
`;
const Footer = styled.footer`
	${tw`flex mt-2`};

	.rtBibleRef {
		${tw`inline-block relative z-20 no-underline`}
	}
`;
const Scripture = styled(MetaText)`
	${tw`hidden`};
	${tw`xs:inline`};
`;
const Alttitle = styled.h3`
	${tw`text-brand text-xs tracking-wider uppercase mb-2`};
`;

const TalkCard = ({ data: post, subtitle }) => (
	<Card id={post.id}>
		<Container>
			{post.speakers.map(({ id, data = { avatar: '', title: '' } }) => (
				<CardAvatar key={id} data={data.avatar} title={data.title} />
			))}

			<Body>
				<header>
					{subtitle && (
						<Alttitle>{subtitle}</Alttitle>
					)}

					{post.title && (
						<Title>{post.title}</Title>
					) }
				</header>

				<Footer>
					{post.speakers.map(({ id, data, fields }) => (
						<MetaText key={id}>
							<MetaSep>By</MetaSep>&nbsp;
							<SpeakerLink to={fields.slug}>{data.title}</SpeakerLink>
							&nbsp;
						</MetaText>
					))}

					{post.scripture && (
						<Scripture>
							<MetaSep>from</MetaSep> {post.scripture}
						</Scripture>
					)}
				</Footer>
			</Body>
		</Container>

		<FauxLink to={post.slug}>{`Listen to ${post.title}`}</FauxLink>
	</Card>
);

TalkCard.propTypes = { data: talkType.isRequired };
TalkCard.defaultProps = talkDefaults;

export default TalkCard;
