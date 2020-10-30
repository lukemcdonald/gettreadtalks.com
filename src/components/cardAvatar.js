import React from 'react';
import Img from 'gatsby-image';

export default function CardAvatar({ data, title }) {
	return (
		<figure className="w-16">
			{data && (
				<Img
					className="rounded-full"
					alt={title}
					fluid={data.localFiles[0].childImageSharp.fluid}
				/>
			)}
		</figure>
	);
}
