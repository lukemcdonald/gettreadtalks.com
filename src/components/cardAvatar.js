/* global tw */
import styled from 'styled-components';
import React from 'react';
import Img from 'gatsby-image';

const Figure = styled('figure')`
	${tw`bg-grey-lighter h-16 hidden mr-4 rounded-full w-16`}
	${tw`sm:block`}
	${tw`lg:-mt-3 lg:-mb-3 lg:-ml-2`}
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
