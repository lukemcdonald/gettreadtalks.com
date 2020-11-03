import React from 'react';
import Img from 'gatsby-image';

export default function CardAvatar({ data, title }) {
	return (
		<figure className="w-16 h-16">
			{data && (
				<Img
					className="w-16 h-16 rounded-full"
					alt={title}
					fluid={data.localFiles[0].childImageSharp.fluid}
				/>
			)}
		</figure>
	);
}
