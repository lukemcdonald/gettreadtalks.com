import React from 'react';
import Img from 'gatsby-image';
import Images from './images';

export default function Intro({ children, image, excerpt, title }) {
	return (
		<div className="relative flex items-center justify-center overflow-hidden text-gray-300 bg-gray-900">
			{image && (
				<figure className="hidden w-full h-full overflow-hidden opacity-15 max-h-screen-50 md:block">
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

			<div className="z-20 p-6 md:absolute">
				{title && (
					<h1 className="text-5xl font-bold text-center text-white">{title}</h1>
				)}
				{excerpt && (
					<div
						className="mt-1 text-2xl font-light text-center"
						dangerouslySetInnerHTML={{ __html: excerpt }}
					/>
				)}
				{children && <div>{children}</div>}
			</div>
		</div>
	);
}
