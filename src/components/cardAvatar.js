/* global tw */
import styled from 'styled-components';
import React from 'react';
import Img from 'gatsby-image';

const Figure = styled('figure')`
	${tw`hidden sm:block w-16 h-16 lg:-mt-3 lg:-mb-3 lg:-ml-2 mr-4 rounded-full bg-grey-lighter`}
`;

const Image = styled(Img)`
	${tw`object-cover rounded-full`}
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
