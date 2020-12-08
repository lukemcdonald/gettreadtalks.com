import React from 'react';
import Img from 'gatsby-image';

export default function Avatar({ className, image, title }) {
	return (
		<>
			{image?.localFiles?.[0] && (
				<Img
					className={className}
					alt={title}
					fluid={image.localFiles[0].childImageSharp.fluid}
				/>
			)}
		</>
	);
}
