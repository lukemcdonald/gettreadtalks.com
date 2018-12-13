/* global tw */
import styled from 'styled-components';

import React from 'react';
import PropTypes from 'prop-types';

import Card from '../card';
import CardAvatar from '../cardAvatar';
import FauxLink from '../fauxLink';
import { MetaText, MetaSep, MetaLink } from '../styled/meta';

const SpeakerLink = styled(MetaLink)`
	${tw`relative z-10`}
`;

const TalkContainer = styled('div')`
	${tw`flex items-center`}
`;

const TalkBody = styled('figure')`
	${tw`flex-grow`}
`;

const TalkTitle = styled('h2')`
	${tw`font-bold mb-1 text-black text-xl`}
`;

const TalkCard = ({ talk }) => {
	const { link, scripture, speakers, title } = talk;

	return (
		<Card>
			<TalkContainer>
				{speakers.map(({ id, data }) => (
					<CardAvatar key={id} data={data.avatar} title={data.name} />
				))}

				<TalkBody>
					{title && (
						<header>
							<TalkTitle>{title}</TalkTitle>
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
				</TalkBody>
			</TalkContainer>

			<FauxLink href={link} text={`Listen to ${title}`} />
		</Card>
	);
};

TalkCard.propTypes = {
	talk: PropTypes.object.isRequired,
	slug: PropTypes.string.isRequired,
};

export default TalkCard;
