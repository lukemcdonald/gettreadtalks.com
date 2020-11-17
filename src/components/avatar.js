import React from 'react';
import Img from 'gatsby-image';
import classnames from 'classnames';

export default function Avatar({ className, image, title }) {
	return (
		<>
			{image && (
				<Img
					className={className}
					alt={title}
					fluid={image.localFiles[0].childImageSharp.fluid}
				/>
			)}
		</>
	);
}
