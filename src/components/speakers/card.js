/* global tw */
import styled from 'styled-components';

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Card from '../card';
import CardAvatar from '../cardAvatar';
import FauxLink from '../fauxLink';
import { MetaText, MetaLink } from '../styled/meta';

const Container = styled('div')`
	${tw`flex items-center`}
`;

const Body = styled('div')`
	${tw`flex-grow`}
`;

const Header = styled.header`
	${tw``};
`;

const Title = styled('h2')`
	${tw`font-bold mb-1 text-black text-xl`}
`;

const Footer = styled.footer`
	${tw`flex justify-between mt-2`};
`;

const Ministry = styled(MetaText)`
	${tw`pr-2 hidden sm:inline`};
`;

const SpeakerCard = ({ id, post, slug }) => {
	const { avatar, ministry, name, role, website } = post;

	return (
		<Card id={id}>
			<Container>
				<CardAvatar data={avatar} title={name} />

				<Body>
					{name && (
						<Header>
							<Title>{name}</Title>
						</Header>
					)}

					<Footer>
						{ministry && (
							<Ministry>
								{website ? (
									<MetaLink to={website}>{ministry}</MetaLink>
								) : (
									<Fragment>{ministry}</Fragment>
								)}
							</Ministry>
						)}

						{role && <MetaText>{role}</MetaText>}
					</Footer>
				</Body>

				<FauxLink to={`/speakers/${slug}`}>{`${name} Talks`}</FauxLink>
			</Container>
		</Card>
	);
};

SpeakerCard.propTypes = {
	post: PropTypes.object.isRequired,
	slug: PropTypes.string.isRequired,
};

export default SpeakerCard;
