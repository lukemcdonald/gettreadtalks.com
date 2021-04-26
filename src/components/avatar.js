import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

export default function Avatar({ className, imgClassName, image, title }) {
	return (
		<>
			{image?.localFiles?.[0] && (
				<GatsbyImage
					image={image.localFiles[0].childImageSharp.gatsbyImageData}
					className={className}
					imgClassName={imgClassName}
					alt={title}
				/>
			)}
		</>
	);
}
