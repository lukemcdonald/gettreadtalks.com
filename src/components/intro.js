import React from 'react';
import classnames from 'classnames';
import Img from 'gatsby-image';
import Images from './images';
import styles from './intro.module.css';

export default function Intro({ children, image, excerpt, title }) {
	return (
		<div
			className={classnames(
				'flex items-center justify-center overflow-hidden text-gray-400 bg-gray-900 max-h-screen-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900',
				styles
			)}
		>
			{image && (
				<figure className="flex-grow hidden opacity-15 md:block">
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
						className="mt-2 text-2xl font-light text-center"
						dangerouslySetInnerHTML={{ __html: excerpt }}
					/>
				)}
				{children && <div>{children}</div>}
			</div>
		</div>
	);
}
