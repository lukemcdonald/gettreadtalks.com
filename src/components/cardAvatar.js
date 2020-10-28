import React from 'react';
import Img from 'gatsby-image';

export default function CardAvatar({ data, title }) {
	return (
		<div>
			{data && (
				<Img alt={title} fluid={data.localFiles[0].childImageSharp.fluid} />
			)}
		</div>
	);
}
