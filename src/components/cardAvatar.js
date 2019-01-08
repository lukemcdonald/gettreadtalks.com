/* global tw */
import styled from 'styled-components';
import React from 'react';
import Img from 'gatsby-image';
import { screens } from '../../tailwind';

const Figure = styled.figure`
	${tw`bg-grey-lighter h-12 mr-4 overflow-hidden rounded-full w-12`}
	${tw`sm:h-16 sm:w-16`}

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

const CardAvatar = ({ data, title }) => {
	return (
		<Figure>
			{data && (
				<Image alt={title} fluid={data.localFiles[0].childImageSharp.fluid} />
			)}
		</Figure>
	);
};

export default CardAvatar;
