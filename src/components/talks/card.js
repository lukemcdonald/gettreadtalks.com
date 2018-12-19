/* global tw */
import styled from 'styled-components';

import React from 'react';
import PropTypes from 'prop-types';

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

const TalkCard = ({ id, post, slug }) => {
	const { link, scripture, speakers, title } = post;

	return (
		<Card id={id}>
			<Container>
				{speakers.map(({ id, data }) => (
					<CardAvatar key={id} data={data.avatar} title={data.name} />
				))}

				<Body>
					{title && (
						<header>
							<Title>{title}</Title>
						</header>
					)}

					<footer>
						{speakers.map(({ id, data, fields }) => (
							<MetaText key={id}>
								<MetaSep>By</MetaSep>&nbsp;
								<SpeakerLink to={`/speakers/${fields.slug}`}>
									{data.name}
								</SpeakerLink>
								&nbsp;
							</MetaText>
						))}

						{scripture && (
							<MetaText>
								<MetaSep>from</MetaSep> {scripture}
							</MetaText>
						)}
					</footer>
				</Body>
			</Container>

			<FauxLink
				to={`/by/${speakers[0].fields.slug}/${slug}`}
			>{`Listen to ${title}`}</FauxLink>
		</Card>
	);
};

TalkCard.propTypes = {
	post: PropTypes.object.isRequired,
	slug: PropTypes.string.isRequired,
};

export default TalkCard;
