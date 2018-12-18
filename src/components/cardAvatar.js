/* global tw */
import styled from 'styled-components';
import React from 'react';
import Img from 'gatsby-image';
import { screens } from '../../tailwind';

const Figure = styled('figure')`
	${tw`bg-grey-lighter h-16 hidden mr-4 rounded-full w-16`}
	${tw`sm:block`}

	/* gatsby-build doesn't currently support negative margins using tw */
	@media (min-width: ${screens.lg}) {
		margin-top: -0.75rem;
		margin-bottom: -0.75rem;
		margin-left: -0.5rem;
	}
`;

const Image = styled(Img)`
	${tw`rounded-full`}
	object-fit: cover;
`;

const CardAvatar = ({ title, data }) => {
	return (
		<Figure>
			{data && (
				<Image alt={title} fluid={data.localFiles[0].childImageSharp.fluid} />
			)}
		</Figure>
	);
};

export default CardAvatar;
