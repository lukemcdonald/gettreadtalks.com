import React from 'react';
import Img from 'gatsby-image';
import Images from './images';

export default function Intro({ children, image, excerpt, title }) {
	return (
		<div>
			{image && (
				<figure>
					{image.localFiles && (
						<Img
							alt={title}
							fluid={image.localFiles[0].childImageSharp.fluid}
						/>
					)}

					{image.name && (
						<Images>
							{(images) => <Img alt={title} fluid={images[image.name].fluid} />}
						</Images>
					)}
				</figure>
			)}

			<div>
				{title && <h1>{title}</h1>}
				{excerpt && <div dangerouslySetInnerHTML={{ __html: excerpt }} />}
				{children && <div>{children}</div>}
			</div>
		</div>
	);
}
