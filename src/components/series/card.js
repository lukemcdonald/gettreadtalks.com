/* global tw */
import styled from 'styled-components';
import React, { Fragment } from 'react';
import { seriesType, seriesDefaults } from '../../prop-types';

import Card from '../card';
import CardAvatar from '../cardAvatar';
import FauxLink from '../fauxLink';
import { MetaText, MetaLink } from '../styled/meta';

const Container = styled.div`
	${tw`flex items-center leading-tight`}
`;

const Body = styled.div`
	${tw`flex-grow`}
`;

const Header = styled.header`
	${tw``};
`;

const Title = styled.h2`
	${tw`font-bold mb-1 text-black text-lg`}
	${tw`sm:text-xl`}
`;

const Footer = styled.footer`
	${tw`flex mt-2`};
`;

const SeriesCard = ({ data: post }) => (
	<Card id={post.id}>
		<Container>
			<Body>
				{post.title && (
					<Header>
						<Title>{post.title}</Title>
					</Header>
				)}
			</Body>

			<FauxLink to={post.slug}>{`Series on ${post.title}`}</FauxLink>
		</Container>
	</Card>
);

// SeriesCard.propTypes = { data: seriesType.isRequired };
// SeriesCard.defaultProps = seriesDefaults;

export default SeriesCard;
