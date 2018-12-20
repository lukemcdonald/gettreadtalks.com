/* global tw */
import styled from 'styled-components';
import React, { Fragment } from 'react';
import { speakerType, speakerDefaults } from '../../prop-types';

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
	${tw`flex mt-2`};
`;

const Ministry = styled(MetaText)`
	${tw`pr-2 hidden sm:inline`};
`;

const SpeakerCard = ({ data: post }) => (
	<Card id={post.id}>
		<Container>
			<CardAvatar data={post.avatar} title={post.name} />

			<Body>
				{post.name && (
					<Header>
						<Title>{post.name}</Title>
					</Header>
				)}

				<Footer>
					{post.role && <MetaText>{post.role}</MetaText>}

					{post.ministry && (
						<Ministry>
							{post.website ? (
								<MetaLink to={post.website}>
									&nbsp;&middot;&nbsp;{post.ministry}
								</MetaLink>
							) : (
								<Fragment>&nbsp;&middot;&nbsp;{post.ministry}</Fragment>
							)}
						</Ministry>
					)}
				</Footer>
			</Body>

			<FauxLink to={`/by/${post.slug}`}>{`${post.name} Talks`}</FauxLink>
		</Container>
	</Card>
);

SpeakerCard.propTypes = { data: speakerType.isRequired };
SpeakerCard.defaultProps = speakerDefaults;

export default SpeakerCard;
